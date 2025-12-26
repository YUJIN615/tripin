import { NextRequest, NextResponse } from "next/server";
import { getTripTypeNames } from "@/utils/tripUtils";
import OpenAI from "openai";
import prisma from "@/lib/prisma";

interface KakaoPlaceItem {
  id?: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  phone?: string;
}

// Kakao API 응답 타입
interface KakaoApiPlace extends KakaoPlaceItem {
  id: string;
}

export async function POST(request: NextRequest) {
  console.log("🚀 [API Route] POST /api/trips 호출됨");

  try {
    const body = await request.json();
    console.log("📦 [API Route] 요청 바디:", body);

    const { region, date, personCount, tripTypes, transports } = body;

    // 지역 ID 조회
    const regionData = await prisma.region.findFirst({
      where: { name: region },
    });

    if (!regionData) {
      return NextResponse.json({ success: false, error: "Region not found" }, { status: 404 });
    }

    const places: KakaoPlaceItem[] = [];

    // DB에서 캐시된 장소 조회 또는 Kakao API 호출
    const getPlacesForTripType = async (tripType: string): Promise<KakaoPlaceItem[]> => {
      // 1. DB에서 캐시된 장소 조회
      const cachedPlaces = await prisma.place.findMany({
        where: {
          regionId: regionData.id,
          tripType: tripType,
        },
        take: 45,
      });

      if (cachedPlaces.length >= 10) {
        console.log(`💾 [Cache Hit] ${region} ${tripType}: DB에서 ${cachedPlaces.length}개 로드`);
        return cachedPlaces.map((p) => ({
          id: p.kakaoPlaceId,
          place_name: p.placeName,
          category_name: p.categoryName ?? "",
          address_name: p.addressName ?? "",
          road_address_name: p.roadAddressName ?? "",
          x: p.x,
          y: p.y,
          phone: p.phone ?? "",
        }));
      }

      // 2. 캐시 미스 - Kakao API 호출
      console.log(`🌐 [Cache Miss] ${region} ${tripType}: Kakao API 호출`);
      const apiPlaces = await fetchKakaoPlaces(region, tripType);

      // 3. DB에 저장 (중복 제외)
      for (const place of apiPlaces) {
        try {
          await prisma.place.upsert({
            where: { kakaoPlaceId: place.id },
            update: {},
            create: {
              regionId: regionData.id,
              kakaoPlaceId: place.id,
              placeName: place.place_name,
              categoryName: place.category_name,
              addressName: place.address_name,
              roadAddressName: place.road_address_name,
              x: place.x,
              y: place.y,
              phone: place.phone ?? null,
              tripType: tripType,
            },
          });
        } catch {
          // 중복 에러 무시
        }
      }
      console.log(`💾 [Cached] ${region} ${tripType}: ${apiPlaces.length}개 저장됨`);

      return apiPlaces;
    };

    // Kakao API 호출 함수
    const fetchKakaoPlacesOnce = async (
      regionName: string,
      tripType: string,
      page: number,
      size: number
    ): Promise<KakaoApiPlace[]> => {
      const query = `${regionName} ${getTripTypeNames([tripType])}`;
      const encodedQuery = encodeURIComponent(query);
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodedQuery}&page=${page}&size=${size}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? ""}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Kakao API error: ${response.status}`);
      }

      const data = await response.json();
      return (data.documents || []) as KakaoApiPlace[];
    };

    // Kakao API 여러 번 호출해서 45개 가져오기
    const fetchKakaoPlaces = async (
      regionName: string,
      tripType: string
    ): Promise<KakaoApiPlace[]> => {
      const allItems: KakaoApiPlace[] = [];
      const size = 15;
      const totalItems = 45;
      const requestCount = Math.ceil(totalItems / size);

      for (let i = 0; i < requestCount; i++) {
        const page = i + 1;
        try {
          const items = await fetchKakaoPlacesOnce(regionName, tripType, page, size);
          const uniqueItems = items.filter(
            (item) => !allItems.some((i) => i.place_name === item.place_name)
          );
          allItems.push(...uniqueItems);

          if (items.length < size) break;
        } catch (error) {
          console.error(`❌ [API Route] ${tripType} 호출 실패:`, error);
        }
      }

      return allItems;
    };

    // 모든 여행 타입에 대해 장소 조회 (캐시 우선)
    console.log(`🔄 [API Route] ${tripTypes.length}개 여행 타입에 대해 검색 시작`);
    for (const tripType of tripTypes) {
      const items = await getPlacesForTripType(tripType);
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
