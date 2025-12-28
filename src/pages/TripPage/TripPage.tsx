"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { Layout } from "@/components/layout/Layout";
import { Tab } from "@/components/common/Tab";
import { TripList } from "@/components/trip/TripList";
import { TripResponseType } from "@/types/trip";

export const TripPage = () => {
  const [selectedTab, setSelectedTab] = useState<"MY_TRIP" | "TRIP">("MY_TRIP");
  const TabList = [
    { title: "내 여행", value: "MY_TRIP" },
    { title: "최근 조회한 일정", value: "TRIP" },
  ];

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
      <Tab
        selectedTab={selectedTab}
        setSelectedTab={(tab) => setSelectedTab(tab as "MY_TRIP" | "TRIP")}
        TabList={TabList}
      />
      {selectedTab === "MY_TRIP" && <TripList trips={myTripList} isLoading={isLoadingMyTrips} />}
      {selectedTab === "TRIP" && <TripList trips={tripList} isLoading={isLoadingTrips} />}
    </Layout>
  );
};

export default TripPage;
