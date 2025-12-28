"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { getTripTypeNames, getTransportTypeNames } from "@/utils/tripUtils";
import { Layout } from "@/components/common/Layout";
import { TripResponseType } from "@/types/trip";

export const TripPage = () => {
  const router = useRouter();

  const {
    data: trips,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => apiClient.get(API_ENDPOINTS.trips),
  });

  const result = trips?.data.data as TripResponseType[];
  console.log("result", result);

  if (isLoading) return <div>Loading...</div>;
  if (!result || result.length === 0) return <div>내 여행이 없습니다.</div>;

  return (
    <Layout title="내 여행">
      {isLoading && <div>여행 목록을 불러오는 중...</div>}
      {!result || (result.length === 0 && <div>내 여행이 없습니다.</div>)}
      <ul className="flex flex-col">
        {result.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4">
            <div className="text-base font-bold">{item.region}</div>
            <div>
              날짜: {new Date(item.startDate).toLocaleDateString()} ~{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </div>
            <div>인원: {item.personCount}명</div>
            <div>여행 컨셉: {getTripTypeNames(item.tripTypes)}</div>
            <div>이동 수단: {getTransportTypeNames(item.transports)}</div>
          </li>
        ))}
        <div className="my-8">
          <button
            className="w-full h-12 bg-blue-500 text-white font-bold rounded-xl text-sm"
            onClick={() => router.push("/make")}
          >
            새 일정 만들기
          </button>
        </div>
      </ul>
    </Layout>
  );
};

export default TripPage;
