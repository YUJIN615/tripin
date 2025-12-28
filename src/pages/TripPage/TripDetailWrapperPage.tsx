"use client";
import { useParams, useSearchParams } from "next/navigation";
import { TripDetailPage } from "./TripDetailPage";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { PlanResponseType } from "@/types/plan";
import { TripResponseType } from "@/types/trip";

type DetailType = "TRIP" | "PLAN";
type DetailData = TripResponseType | PlanResponseType;

export const TripDetailWrapperPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id as string;
  const type = searchParams?.get("type") as DetailType;

  const isValidRequest = id && (type === "TRIP" || type === "PLAN");

  const queryConfig = useMemo(() => {
    if (!isValidRequest) return null;

    return {
      queryKey: ["detail", type, id] as const,
      queryFn: async () => {
        const res =
          type === "TRIP"
            ? await apiClient.get(API_ENDPOINTS.tripDetail(id))
            : await apiClient.get(API_ENDPOINTS.planDetail(id));
        console.log("API Response:", res);
        console.log("res.data:", res.data);
        console.log("res.data.data:", res.data.data);
        // ✅ 지금 코드 기준으로는 res.data.data를 쓰고 있었으니 동일하게 맞춤
        return res.data.data as DetailData;
      },
    };
  }, [id, type, isValidRequest]);

  console.log("type", type);
  console.log("id", id);

  const { data, isPending, isError } = useQuery<DetailData>({
    // ✅ enabled가 false일 때는 쿼리가 실행되지 않으므로 fallback 필요 없음
    queryKey: queryConfig?.queryKey ?? ["detail", "UNKNOWN", ""],
    queryFn:
      queryConfig?.queryFn ??
      (async () => {
        throw new Error("Invalid query configuration");
      }),
    enabled: !!queryConfig, // ✅ queryConfig가 null이면 쿼리 실행 안 함
  });

  // ✅ type/id가 아직 준비 안 된 상태(또는 잘못된 type)일 때
  if (!isValidRequest) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (isPending) {
    return <div>일정 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>일정 정보를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>일정 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <TripDetailPage data={data} />
    </div>
  );
};
