"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { Layout } from "@/components/common/Layout";
import { PlanCard } from "@/components/plan/PlanCard";
import { TripResponseType } from "@/types/trip";
import { PlanResponseType } from "@/types/plan";

export const TripPage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"TRIP" | "PLAN">("TRIP");

  const { data: trips, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => apiClient.get(API_ENDPOINTS.trips),
  });

  const { data: plans, isLoading: isLoadingPlans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => apiClient.get(API_ENDPOINTS.plans),
  });

  const tripList = (trips?.data.data as TripResponseType[]) || [];
  const planList = (plans?.data.data as PlanResponseType[]) || [];

  return (
    <Layout title="내 여행">
      <ul className="flex justify-between items-center">
        <li className="w-1/2">
          <button
            className={`text-sm text-gray-700 border-b border-gray-200 py-4 w-full ${selectedTab === "TRIP" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : ""}`}
            onClick={() => setSelectedTab("TRIP")}
          >
            내 여행
          </button>
        </li>
        <li className="w-1/2">
          <button
            className={`text-sm text-gray-700 border-b border-gray-200 py-4 w-full ${selectedTab === "PLAN" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : ""}`}
            onClick={() => setSelectedTab("PLAN")}
          >
            최근 조회한 일정
          </button>
        </li>
      </ul>
      {selectedTab === "TRIP" && (
        <div>
          {isLoading && <div>여행 목록을 불러오는 중...</div>}
          {tripList && tripList.length === 0 && <div>내 여행이 없습니다.</div>}
          <ul className="flex flex-col">
            {tripList.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4"
                onClick={() => router.push(`/trip/${item.id}?type=TRIP`)}
              >
                <PlanCard
                  region={item.region}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  personCount={item.personCount}
                  tripTypes={item.tripTypes}
                  transports={item.transports}
                />
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
        </div>
      )}
      {selectedTab === "PLAN" && (
        <div>
          {isLoadingPlans && <div>일정 목록을 불러오는 중...</div>}
          {planList && planList.length === 0 && <div>최근 조회한 일정이 없습니다.</div>}
          <ul className="flex flex-col">
            {planList.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4"
                onClick={() => router.push(`/plan/${item.id}?type=PLAN`)}
              >
                <PlanCard
                  region={item.region}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  personCount={item.personCount}
                  tripTypes={item.tripTypes}
                  transports={item.transports}
                />
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
        </div>
      )}
    </Layout>
  );
};

export default TripPage;
