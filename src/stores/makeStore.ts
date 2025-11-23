import axios from "axios";
import { create } from "zustand";
import { SearchItemType } from "@/types/make";

const SEARCH_HISTORY_KEY = "tripin_search_history";
const MAX_HISTORY_SIZE = 10;

interface MakeStore {
  searchValue: string;
  searchItems: SearchItemType[];
  searchHistory: SearchItemType[];
  setSearchValue: (value: string) => void;
  getSuggestValue: (value: string) => Promise<SearchItemType[]>;
  addSearchHistory: (item: SearchItemType) => void;
  removeSearchHistory: (id: number) => void;
  loadSearchHistory: () => void;
}

export const useMakeStore = create<MakeStore>((set, get) => ({
  searchValue: "",
  searchItems: [],
  searchHistory: [],

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

  getSuggestValue: async (value: string): Promise<SearchItemType[]> => {
    const response = await axios.get("/api/regions", {
      params: { keyword: value },
    });
    return response.data as SearchItemType[];
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
}));
