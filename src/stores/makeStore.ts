import { create } from "zustand";
import { DateRange } from "react-day-picker";
import { SearchItemType } from "@/types/make";
import { PERSON_COUNT } from "@/constants/tripOptions";
import { apiClient, API_ENDPOINTS } from "@/lib/api";

const SEARCH_HISTORY_KEY = "tripin_search_history";
const MAX_HISTORY_SIZE = 10;
const DEFAULT_PERSON_COUNT = PERSON_COUNT.DEFAULT;

interface MakeStore {
  region: string;
  date: DateRange | undefined;
  personCount: number;
  selectedTripPlaces: string[];
  selectedTripThemes: string[];
  selectedTransports: string[];
  searchValue: string;
  searchItems: SearchItemType[];
  searchHistory: SearchItemType[];
  setRegion: (value: string) => void;
  setDate: (value: DateRange | undefined) => void;
  setPersonCount: (value: number) => void;
  setSelectedTripPlaces: (value: string[]) => void;
  setSelectedTripThemes: (value: string[]) => void;
  setSelectedTransports: (value: string[]) => void;
  setSearchValue: (value: string) => void;
  getSuggestValue: (value: string) => Promise<SearchItemType[]>;
  addSearchHistory: (item: SearchItemType) => void;
  removeSearchHistory: (id: number) => void;
  loadSearchHistory: () => void;
  clearAll: () => void;
  makeTrip: () => void;
}

export const useMakeStore = create<MakeStore>((set, get) => ({
  region: "",
  date: undefined,
  personCount: DEFAULT_PERSON_COUNT,
  selectedTripPlaces: [],
  selectedTripThemes: [],
  selectedTransports: [],
  searchValue: "",
  searchItems: [],
  searchHistory: [],

  setRegion: (value: string) => {
    set({ region: value });
  },

  setDate: (value: DateRange | undefined) => {
    set({ date: value });
  },

  setPersonCount: (value: number) => {
    set({ personCount: value });
  },

  setSelectedTripPlaces: (value: string[]) => {
    set({ selectedTripPlaces: value });
  },

  setSelectedTripThemes: (value: string[]) => {
    set({ selectedTripThemes: value });
  },

  setSelectedTransports: (value: string[]) => {
    set({ selectedTransports: value });
  },

  // 입력한 지역 검색 결과 반환
  getSuggestValue: async (value: string): Promise<SearchItemType[]> => {
    const response = await apiClient.get(API_ENDPOINTS.regions, {
      params: { keyword: value },
    });
    return response.data as SearchItemType[];
  },

  // 입력한 지역 검색 결과 세팅
  setSearchValue: (value: string) => {
    set({ searchValue: value });
    if (value.trim()) {
      useMakeStore
        .getState()
        .getSuggestValue(value)
        .then((data) => {
          set({ searchItems: data });
        });
    } else {
      set({ searchItems: [] });
    }
  },

  // 최근 검색에 추가
  addSearchHistory: (item: SearchItemType) => {
    const { searchHistory } = get();

    // 중복 제거 (이름으로 비교)
    const filtered = searchHistory.filter((h) => h.name !== item.name);

    // 맨 앞에 추가하고 최대 개수 제한
    const newHistory = [item, ...filtered].slice(0, MAX_HISTORY_SIZE);

    // 상태 업데이트
    set({ searchHistory: newHistory });

    // localStorage에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }
  },

  // 최근 검색에서 제거
  removeSearchHistory: (id: number) => {
    const { searchHistory } = get();
    const newHistory = searchHistory.filter((item) => item.id !== id);

    set({ searchHistory: newHistory });

    if (typeof window !== "undefined") {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }
  },

  // localStorage에서 불러오기
  loadSearchHistory: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          set({ searchHistory: parsed });
        } catch (error) {
          console.error("Failed to load search history:", error);
        }
      }
    }
  },

  // 모든 상태 초기화
  clearAll: () => {
    set({
      region: "",
      date: undefined,
      personCount: DEFAULT_PERSON_COUNT,
      selectedTripPlaces: [],
      selectedTransports: [],
      searchValue: "",
      searchItems: [],
    });
  },

  // 일정 만들기
  makeTrip: async () => {
    const { region, date, personCount, selectedTripPlaces, selectedTransports } = get();
    const response = await apiClient.post(API_ENDPOINTS.trips, {
      region,
      date,
      personCount,
      tripTypes: selectedTripPlaces,
      transports: selectedTransports,
    });
    return response.data;
  },
}));
