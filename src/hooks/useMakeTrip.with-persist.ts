import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api";
import { PlanCreateResponseType } from "@/types/plan";
import { DateRange } from "react-day-picker";

interface MakeTripParams {
  region: string;
  date: DateRange | undefined;
  personCount: number;
  tripTypes: string[];
  transports: string[];
}

// Query Key 정의
export const tripQueryKeys = {
  all: ["trip"] as const,
  result: () => [...tripQueryKeys.all, "result"] as const,
};

// ✅ 방법 1: useMutation + useQuery 조합 (추천)
export const useMakePlan = () => {
  const queryClient = useQueryClient();

  return useMutation<PlanCreateResponseType, Error, MakeTripParams>({
    mutationFn: async (params) => {
      const response = await apiClient.post(API_ENDPOINTS.trips, {
        region: params.region,
        date: params.date,
        personCount: params.personCount,
        tripTypes: params.tripTypes,
        transports: params.transports,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // ✅ Query 캐시에 저장 (자동으로 localStorage에 persist됨)
      queryClient.setQueryData(tripQueryKeys.result(), data);
      console.log("✅ 일정 만들기 성공 및 캐시 저장 완료");
    },
    onError: (error) => {
      console.error("❌ 일정 만들기 실패:", error);
    },
  });
};

// ✅ 여행 결과 조회 Hook (persistQueryClient가 자동으로 localStorage에서 불러옴)
export const useTripResult = () => {
  return useQuery<PlanCreateResponseType | null>({
    queryKey: tripQueryKeys.result(),
    queryFn: () => {
      // queryFn은 실제로 실행되지 않음 (setQueryData로만 설정)
      // 하지만 필수이므로 null 반환
      return null;
    },
    enabled: false, // 자동 fetch 방지 (mutation에서만 데이터 설정)
    staleTime: Infinity, // 항상 fresh하게 유지
    gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
  });
};

// ✅ 여행 결과 삭제 (캐시 + localStorage)
export const useClearTripResult = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.removeQueries({ queryKey: tripQueryKeys.result() });
    console.log("✅ 여행 결과 삭제 완료");
  };
};
