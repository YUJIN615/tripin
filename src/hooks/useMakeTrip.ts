import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { TripDayRequestType, TripCreateResponseType } from "@/types/trip";
import { DateRange } from "react-day-picker";

interface MakeTripParams {
  region: string;
  date: DateRange | undefined;
  personCount: number;
  tripTypes: string[];
  transports: string[];
  days: TripDayRequestType[];
}

export const useMakeTrip = () => {
  return useMutation<TripCreateResponseType, Error, MakeTripParams>({
    mutationFn: async (params) => {
      const response = await apiClient.post(API_ENDPOINTS.trips, {
        region: params.region,
        date: params.date,
        personCount: params.personCount,
        tripTypes: params.tripTypes,
        transports: params.transports,
        days: params.days,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("✅ 일정 만들기 성공 및 localStorage 저장 완료");
    },
    onError: (error) => {
      console.error("❌ 일정 만들기 실패:", error);
    },
  });
};
