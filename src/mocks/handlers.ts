// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { REGIONS } from './data/regions';

export const handlers = [
  http.get('/api/regions', ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword') ?? ''; // 예: '서'

    // keyword가 있으면 필터링, 없으면 전체 반환
    const filtered = keyword
      ? REGIONS.filter((region) => region.name.includes(keyword))
      : REGIONS;

    return HttpResponse.json(filtered);
  }),
];