# persistQueryClient 사용 가이드

## 📦 설치

```bash
npm install @tanstack/react-query-persist-client
```

---

## 🎯 방식 비교

### **현재 방식: 수동 localStorage**

#### 장점

- ✅ 세밀한 제어 가능
- ✅ 원하는 데이터만 선택적으로 저장
- ✅ 간단한 경우 더 직관적

#### 단점

- ❌ 수동으로 localStorage 관리 필요
- ❌ 보일러플레이트 코드 증가
- ❌ 동기화 로직 직접 작성

#### 코드 예시

```typescript
// 저장
localStorage.setItem("key", JSON.stringify(data));

// 불러오기
const saved = localStorage.getItem("key");
const data = saved ? JSON.parse(saved) : null;
```

---

### **persistQueryClient 방식: 자동 관리**

#### 장점

- ✅ 모든 쿼리가 자동으로 localStorage에 persist
- ✅ 새로고침 시 자동으로 복원
- ✅ React Query 생태계 완전 활용
- ✅ 보일러플레이트 코드 최소화
- ✅ 자동 만료, 캐시 관리

#### 단점

- ❌ 전체 쿼리 캐시 저장 (더 많은 용량)
- ❌ 초기 설정 필요
- ❌ 오버엔지니어링일 수 있음 (간단한 경우)

#### 코드 예시

```typescript
// QueryProvider 설정만 하면 끝!
<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
  {children}
</PersistQueryClientProvider>

// 사용
const { data } = useQuery({ queryKey: ['key'] });
```

---

## 🚀 적용 방법

### **1. QueryProvider 수정**

파일: `src/providers/QueryProvider.tsx`

```typescript
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({ ... }));

  const [persister] = useState(() =>
    createSyncStoragePersister({
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      key: "tripin-query-cache",
    })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
```

### **2. Hook 수정**

파일: `src/hooks/useMakeTrip.ts`

```typescript
export const useMakeTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params) => { ... },
    onSuccess: (data) => {
      // ✅ Query 캐시에 저장 (자동으로 localStorage에 persist)
      queryClient.setQueryData(["trip", "result"], data);
    },
  });
};

// ✅ 여행 결과 조회
export const useTripResult = () => {
  return useQuery({
    queryKey: ["trip", "result"],
    queryFn: () => null, // setQueryData로만 설정
    enabled: false,
    staleTime: Infinity,
  });
};
```

### **3. MakePage 수정**

```typescript
const { mutate: makeTrip, isPending } = useMakeTrip();

const handleMakeTrip = () => {
  makeTrip(
    { region, date, personCount, tripTypes, transports },
    {
      onSuccess: () => {
        router.push("/result");
      },
    }
  );
};
```

### **4. ResultPage 수정**

```typescript
// ✅ 간단! useQuery만 사용
const { data: tripResult, isLoading } = useTripResult();

if (isLoading) return <Loading />;
if (!tripResult) return <Empty />;

return <TripDisplay data={tripResult} />;
```

---

## 🤔 어떤 방식을 선택해야 할까?

### **persistQueryClient를 선택하세요:**

- 여러 API 데이터를 캐싱하고 있을 때
- React Query를 이미 적극 활용 중일 때
- 자동화된 캐시 관리가 필요할 때
- 복잡한 데이터 동기화가 필요할 때

### **수동 localStorage를 선택하세요:**

- 단일 데이터만 저장하면 되는 경우 (현재 프로젝트)
- localStorage 저장 로직이 간단할 때
- React Query를 최소한으로만 사용할 때
- 저장 포맷을 커스텀하고 싶을 때

---

## 💡 현재 프로젝트 권장사항

**현재 상태를 유지하는 것을 추천합니다:**

### 이유:

1. **단일 데이터**: 여행 결과 하나만 저장
2. **이미 구현 완료**: 동작하는 코드가 있음
3. **충분히 간단**: persistQueryClient는 오버엔지니어링
4. **명확한 의도**: 어떤 데이터가 언제 저장되는지 명확

### 향후 확장 시 고려:

- 여러 API 데이터를 캐싱하게 되면
- 사용자 프로필, 설정 등 추가 데이터가 필요하면
- 그때 persistQueryClient로 마이그레이션

---

## 📝 요약

| 항목                 | 수동 localStorage | persistQueryClient |
| -------------------- | ----------------- | ------------------ |
| 설정 복잡도          | 낮음              | 중간               |
| 자동화               | 수동              | 자동               |
| 세밀한 제어          | 쉬움              | 어려움             |
| 용량                 | 필요한 것만       | 모든 캐시          |
| 유지보수             | 직접 관리         | React Query 관리   |
| 현재 프로젝트 적합도 | ⭐⭐⭐⭐⭐        | ⭐⭐⭐             |

**결론: 현재는 수동 localStorage로 충분하고, 나중에 확장되면 persistQueryClient로 전환 고려**
