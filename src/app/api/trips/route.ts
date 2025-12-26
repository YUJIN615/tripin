import { NextRequest, NextResponse } from "next/server";
import { getTripTypeNames } from "@/utils/tripUtils";
import OpenAI from "openai";

interface KakaoPlaceItem {
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

export async function POST(request: NextRequest) {
  console.log("🚀 [API Route] POST /api/trips 호출됨");

  try {
    const body = await request.json();
    console.log("📦 [API Route] 요청 바디:", body);

    const { region, date, personCount, tripTypes, transports } = body;

    const places: KakaoPlaceItem[] = [];

    // 네이버 API 호출 함수 (단일 호출)
    const fetchKakaoPlacesOnce = async (
      tripType: string,
      page: number,
      size: number
    ): Promise<KakaoPlaceItem[]> => {
      const query = `${region} ${getTripTypeNames([tripType])}`;
      const encodedQuery = encodeURIComponent(query);
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodedQuery}&page=${page}&size=${size}`;

      console.log(`🔍 [API Route] Kakao API 호출 (${tripType}, page=${page}, size=${size})`);

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? ""}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        console.error(`❌ [API Route] Kakao API 오류: ${response.status}`);
        throw new Error(`Kakao API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        `✅ [API Route] Kakao API 응답: ${data.documents?.length || 0}개 항목 (page=${page}, size=${size})`
      );
      return (data.documents || []) as KakaoPlaceItem[];
    };

    // Kakao API 여러 번 호출해서 45개 가져오기
    const fetchKakaoPlaces = async (tripType: string): Promise<KakaoPlaceItem[]> => {
      const allItems: KakaoPlaceItem[] = [];
      const size = 15;
      const totalItems = 45;
      const requestCount = Math.ceil(totalItems / size);

      console.log(
        `🔄 [API Route] ${tripType}: ${requestCount}번 호출로 최대 ${totalItems}개 가져오기 시작`
      );

      for (let i = 0; i < requestCount; i++) {
        const page = i + 1;
        try {
          const items = await fetchKakaoPlacesOnce(tripType, page, size);
          const uniqueItems = items.filter(
            (item) => !allItems.some((i) => i.place_name === item.place_name)
          );
          allItems.push(...uniqueItems);

          // 더 이상 결과가 없으면 중단
          if (items.length < size) {
            console.log(
              `⚠️ [API Route] ${tripType}: 더 이상 결과가 없음 (${allItems.length}개 수집)`
            );
            break;
          }
        } catch (error) {
          console.error(
            `❌ [API Route] ${tripType} 호출 실패 (page=${page}, size=${size}):`,
            error
          );
          // 한 번 실패해도 계속 진행
        }
      }

      console.log(`✅ [API Route] ${tripType}: 총 ${allItems.length}개 수집 완료`);
      return allItems;
    };

    // 모든 여행 타입에 대해 검색
    console.log(`🔄 [API Route] ${tripTypes.length}개 여행 타입에 대해 검색 시작`);
    for (const tripType of tripTypes) {
      const items = await fetchKakaoPlaces(tripType);
      places.push(...items);
    }

    console.log(`✅ [API Route] 총 ${places.length}개 장소 찾음`);

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    });

    const response = await openai.responses.parse({
      model: "gpt-4o",
      input: [
        {
          role: "system",
          content: `
            당신은 여행 가이드입니다.
            여행 계획을 짜는 사람을 도와줍니다.
            여행 시작일, 여행 종료일, 인원, 여행 타입, 이동 수단을 바탕으로 여행 계획을 짜줍니다.

            # 필수 요구 사항
            - 답변은 한글로 줍니다.
            - 컨셉에 맞는 구체적인 장소를 추천합니다.

            # 장소 정보
            - ${JSON.stringify(places, null, 2)}

            # 장소 추천 규칙
            - 장소는 장소 정보에 담긴 장소 중에서 가장 적합한 장소를 추천합니다.
            - activities 배열에 있는 item의 place_name, road_address_name, x, y, category_name, category_group_code, category_group_name, phone, id는 장소 정보에 있는 장소 중에서 가장 적합한 장소를 추천해야 합니다.
            - 장소 정보에 없는 곳은 추천하지 않습니다.
            - 장소 정보에 있는 데이터와 일치하도록 장소 정보를 추천합니다.
            - 하루에 세 장소 이상 추천합니다.

            `,
        },
        {
          role: "user",
          content: `
          여행 시작일: ${date?.from ?? ""}, 
          여행 종료일: ${date?.to ?? ""}, 
          인원: ${personCount}, 
          여행 타입: ${tripTypes.join(", ")}, 
          이동 수단: ${transports.join(", ")}, 
          지역: ${region}
          `,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "trip_itinerary",
          strict: false,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              start_date: { type: "string", description: "여행 시작일" },
              end_date: { type: "string", description: "여행 종료일" },
              people: { type: "number" },
              type: { type: "string", description: "여행 타입" },
              transport: { type: "string", description: "이동 수단" },
              region: { type: "string", description: "지역" },
              itinerary: {
                type: "array",
                description: "여행 일정",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    date: { type: "string", description: "날짜" },
                    activities: {
                      type: "array",
                      description: "활동",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          time: { type: "string", description: "시간" },
                          activity: { type: "string", description: "활동" },
                          place_name: { type: "string", description: "장소 이름" },
                          road_address_name: { type: "string", description: "도로명 주소" },
                          x: { type: "string", description: "경도" },
                          y: { type: "string", description: "위도" },
                          category_name: { type: "string", description: "카테고리 이름" },
                          category_group_code: { type: "string", description: "카테고리 코드" },
                          category_group_name: { type: "string", description: "카테고리 이름" },
                          phone: { type: "string", description: "전화번호" },
                          id: { type: "string", description: "장소 ID" },
                        },
                        required: ["time", "activity", "place"],
                      },
                    },
                  },
                  required: ["date", "activities"],
                },
              },
            },
            required: [
              "start_date",
              "end_date",
              "people",
              "type",
              "transport",
              "region",
              "itinerary",
            ],
          },
        },
      },
      temperature: 0,
    });

    const event = response.output_parsed;
    console.log(JSON.stringify(event, null, 2));

    return NextResponse.json({
      success: true,
      data: {
        region,
        date,
        personCount,
        tripTypes,
        transports,
        places,
        itinerary: event,
      },
    });
  } catch (error) {
    console.error("❌ [API Route] Trip creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create trip" }, { status: 500 });
  }
}
