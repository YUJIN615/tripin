# MSW (Mock Service Worker) 사용 가이드

## 설정 완료 ✅

MSW가 이미 설정되어 있어 바로 사용할 수 있습니다.

## 구조

```
src/mocks/
├── browser.ts          # MSW Worker 설정
├── handlers.ts         # API Mock 핸들러 정의
└── data/
    └── regions.ts      # Mock 데이터
```

## 사용 방법

### 1. 새로운 API 엔드포인트 추가

**`src/mocks/handlers.ts`**에 핸들러 추가:

```typescript
export const handlers = [
  // 기존 핸들러
  http.get('/api/regions', ({ request }) => {
    // ...
  }),

  // 새로운 핸들러 추가
  http.post('/api/trips', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 1,
      ...body,
      createdAt: new Date().toISOString()
    });
  }),

  http.get('/api/trips/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: '제주도 여행',
      duration: 3
    });
  }),
];
```

### 2. Mock 데이터 추가

**`src/mocks/data/`** 폴더에 데이터 파일 생성:

```typescript
// src/mocks/data/trips.ts
export const TRIPS = [
  { id: 1, title: '제주도 여행', duration: 3 },
  { id: 2, title: '부산 여행', duration: 2 },
];
```

### 3. 컴포넌트에서 API 호출

```typescript
import axios from 'axios';

const fetchRegions = async (keyword: string) => {
  const response = await axios.get('/api/regions', {
    params: { keyword }
  });
  return response.data;
};
```

## MSW 동작 방식

- **개발 환경에서만 자동 활성화** (`process.env.NODE_ENV === "development"`)
- Service Worker를 통해 브라우저에서 네트워크 요청 가로채기
- 실제 서버 없이 API 응답 테스트 가능
- 프로덕션 빌드에서는 자동으로 비활성화

## 예제 컴포넌트

**`src/components/make/RegionSearchExample.tsx`** 참고

## 유용한 HTTP 메서드

```typescript
import { http, HttpResponse } from 'msw';

// GET 요청
http.get('/api/users', () => {
  return HttpResponse.json([...]);
});

// POST 요청
http.post('/api/users', async ({ request }) => {
  const body = await request.json();
  return HttpResponse.json({ success: true });
});

// PUT 요청
http.put('/api/users/:id', ({ params }) => {
  return HttpResponse.json({ id: params.id });
});

// DELETE 요청
http.delete('/api/users/:id', () => {
  return new HttpResponse(null, { status: 204 });
});

// 에러 응답
http.get('/api/error', () => {
  return new HttpResponse(null, { status: 500 });
});
```

## 디버깅

브라우저 콘솔에서 MSW 로그 확인:
- `[MSW] Mocking enabled.` - MSW 활성화됨
- 각 API 호출 시 인터셉트 로그 출력

## 참고 자료

- [MSW 공식 문서](https://mswjs.io/)
- [MSW with Next.js](https://mswjs.io/docs/integrations/node)

