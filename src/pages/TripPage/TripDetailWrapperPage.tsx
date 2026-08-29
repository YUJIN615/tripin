"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TripDetailPage } from "./TripDetailPage";
import { Layout } from "@/components/layout/Layout";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { TripResponseType } from "@/types/trip";

type DetailData = TripResponseType;

/** 일정 상세의 로딩 · 오류 상태 */
const DetailMessage = ({ children }: { children: React.ReactNode }) => (
  <Layout title="ITINERARY">
    <div className="py-16 text-center font-mono text-[13px] text-muted">{children}</div>
  </Layout>
);

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
    queryKey: queryConfig.queryKey,
    queryFn: queryConfig.queryFn,
  });

  if (isPending) {
    return <DetailMessage>LOADING · 일정 정보를 불러오는 중입니다...</DetailMessage>;
  }

  if (isError) {
    return <DetailMessage>ERROR · 일정 정보를 불러오지 못했습니다</DetailMessage>;
  }

  if (!data) {
    return <DetailMessage>NOT FOUND · 일정 정보를 찾을 수 없습니다</DetailMessage>;
  }

  return <TripDetailPage data={data} />;
};

export default TripDetailWrapperPage;
