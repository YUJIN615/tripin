// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { REGIONS } from "./data/regions";

export const handlers = [
  http.get("/api/regions", ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword") ?? ""; // 예: '서'

    // keyword가 있으면 필터링, 없으면 전체 반환
    const filtered = keyword ? REGIONS.filter((region) => region.name.includes(keyword)) : REGIONS;

    return HttpResponse.json(filtered);
  }),
  http.post("/api/trips", async ({ request }) => {
    const body = (await request.json()) as {
      region: string;
      date: { from?: Date; to?: Date } | undefined;
      personCount: number;
      tripTypes: string[];
      transports: string[];
    };

    // 개발 환경용 목업 데이터 반환
    const mockPlaces = [
      {
        title: "맛집 1",
        category: "음식점",
        address: `${body.region} 강남구`,
        roadAddress: `${body.region} 강남대로 123`,
        mapx: "127123456",
        mapy: "37123456",
      },
      {
        title: "카페 1",
        category: "카페",
        address: `${body.region} 서초구`,
        roadAddress: `${body.region} 테헤란로 456`,
        mapx: "127234567",
        mapy: "37234567",
      },
      {
        title: "관광지 1",
        category: "관광명소",
        address: `${body.region} 종로구`,
        roadAddress: `${body.region} 종로 789`,
        mapx: "127345678",
        mapy: "37345678",
      },
    ];

    return HttpResponse.json({
      success: true,
      data: {
        region: body.region,
        date: body.date,
        personCount: body.personCount,
        tripTypes: body.tripTypes,
        transports: body.transports,
        places: mockPlaces,
      },
    });
  }),
];
