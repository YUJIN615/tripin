
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { TripCreateResponseType } from "@/types/trip";

interface MakeTripParams {
  tripId: number;
}

export const useMakeMyTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<TripCreateResponseType, Error, MakeTripParams>({
    mutationFn: async (params) => {
      const response = await apiClient.post(API_ENDPOINTS.myTrips, {
        tripId: params.tripId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTrips"] });
      console.log("✅ 내 여행에 추가 성공");
    },
    onError: (error) => {
      console.error("❌ 내 여행에 추가 실패:", error);
    },
  });
};
