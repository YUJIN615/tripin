import { useMutation } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api";
import { TripCreateResponseType } from "@/types/trip";
import { DateRange } from "react-day-picker";

const TRIP_RESULT_KEY = "tripin_trip_result";

interface MakeTripParams {
  region: string;
  date: DateRange | undefined;
  personCount: number;
  tripTypes: string[];
  transports: string[];
}

// localStorage에 결과 저장
const saveTripResultToLocalStorage = (result: TripCreateResponseType) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TRIP_RESULT_KEY, JSON.stringify(result));
    } catch (error) {
      console.error("Failed to save trip result to localStorage:", error);
    }
  }
};

// localStorage에서 결과 불러오기
export const loadTripResultFromLocalStorage = (): TripCreateResponseType | null => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(TRIP_RESULT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load trip result from localStorage:", error);
      return null;
    }
  }
  return null;
};

// localStorage에서 결과 삭제
export const clearTripResultFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(TRIP_RESULT_KEY);
    } catch (error) {
      console.error("Failed to clear trip result from localStorage:", error);
    }
  }
};

export const useMakeTrip = () => {
  return useMutation<TripCreateResponseType, Error, MakeTripParams>({
    mutationFn: async (params) => {
      const response = await apiClient.post(API_ENDPOINTS.trips, {
        region: params.region,
        date: params.date,
        personCount: params.personCount,
        tripTypes: params.tripTypes,
        transports: params.transports,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // 성공 시 localStorage에 저장
      saveTripResultToLocalStorage(data);
      console.log("✅ 일정 만들기 성공 및 localStorage 저장 완료");
    },
    onError: (error) => {
      console.error("❌ 일정 만들기 실패:", error);
    },
  });
};
