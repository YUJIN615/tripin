import { DateRange } from "react-day-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { TripDayRequestType, TripCreateResponseType } from "@/types/trip";

interface MakeTripParams {
  region: string;
  date: DateRange | undefined;
  personCount: number;
  tripTypes: string[];
  transports: string[];
  days: TripDayRequestType[];
}

export const useMakeTrip = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      console.log("✅ 내 여행에 추가 성공");
    },
    onError: (error) => {
      console.error("❌ 내 여행에 추가 실패:", error);
    },
  });
};
