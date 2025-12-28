"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { Layout } from "@/components/common/Layout";
import { TripCard } from "@/components/trip/TripCard";
import { TripResponseType } from "@/types/trip";

export const TripPage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"MY_TRIP" | "TRIP">("MY_TRIP");

  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: ["trips"],
    queryFn: () => apiClient.get(API_ENDPOINTS.trips),
  });

  const { data: myTrips, isLoading: isLoadingMyTrips } = useQuery({
    queryKey: ["myTrips"],
    queryFn: () => apiClient.get(API_ENDPOINTS.myTrips),
  });

  const tripList = (trips?.data.data as TripResponseType[]) || [];
  const myTripList = (myTrips?.data.data as TripResponseType[]) || [];

  return (
    <Layout title="내 여행">
      <ul className="flex justify-between items-center">
        <li className="w-1/2">
          <button
            className={`text-sm text-gray-700 border-b border-gray-200 py-4 w-full ${selectedTab === "MY_TRIP" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : ""}`}
            onClick={() => setSelectedTab("MY_TRIP")}
          >
            내 여행
          </button>
        </li>
        <li className="w-1/2">
          <button
            className={`text-sm text-gray-700 border-b border-gray-200 py-4 w-full ${selectedTab === "TRIP" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : ""}`}
            onClick={() => setSelectedTab("TRIP")}
          >
            최근 조회한 일정
          </button>
        </li>
      </ul>
      {selectedTab === "MY_TRIP" && (
        <div>
          {isLoadingMyTrips && <div>내 여행 목록을 불러오는 중...</div>}
          {myTripList && myTripList.length === 0 && <div>내 여행이 없습니다.</div>}
          <ul className="flex flex-col">
            {myTripList.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4"
                onClick={() => router.push(`/trip/${item.id}`)}
              >
                <TripCard item={item} />
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
      {selectedTab === "TRIP" && (
        <div>
          {isLoadingTrips && <div>일정 목록을 불러오는 중...</div>}
          {tripList && tripList.length === 0 && <div>최근 조회한 일정이 없습니다.</div>}
          <ul className="flex flex-col">
            {tripList.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 text-sm border-b border-gray-200 py-4"
                onClick={() => router.push(`/trip/${item.id}`)}
              >
                <TripCard item={item} />
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
