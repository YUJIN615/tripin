"use client";
import { useParams } from "next/navigation";
import { TripDetailPage } from "./TripDetailPage";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { TripResponseType } from "@/types/trip";

type DetailData = TripResponseType;

export const TripDetailWrapperPage = () => {
  const params = useParams();

  const id = params?.id as string;

  const queryConfig = useMemo(() => {
    return {
      queryKey: ["detail", id] as const,
      queryFn: async () => {
        const res = await apiClient.get(API_ENDPOINTS.tripDetail(id));
        return res.data.data as DetailData;
      },
    };
  }, [id]);

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
