"use client";
import { useEffect } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/common/Layout";
import { SearchInput } from "@/components/make/SearchAreaInput";
import { SearchList } from "@/components/make/SearchAreaList";
import { SearchHistoryList } from "@/components/make/SearchAreaHistoryList";
import { useMakeStore } from "@/stores/makeStore";

export const MakePage = () => {
  const searchValue = useMakeStore((state) => state.searchValue);
  const setSearchValue = useMakeStore((state) => state.setSearchValue);
  const searchItems = useMakeStore((state) => state.searchItems);
  const searchHistory = useMakeStore((state) => state.searchHistory);
  const loadSearchHistory = useMakeStore((state) => state.loadSearchHistory);
  const hasSearchValue = searchValue.length > 0;

  // 페이지 로드 시 localStorage에서 최근 검색 불러오기
  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  return (
    <Layout title="검색">
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      {hasSearchValue ? (
        <SearchList type="search" SearchItems={searchItems} />
      ) : (
        <>
          <Link
            href="/map"
            className="flex items-center gap-[4px] w-[fit-content] text-[12px] ml-[16px] my-[8px] pl-[8px] pr-[10px] py-[6px] rounded-[12px] text-[#666] bg-white border border-gray-300"
          >
            <MapPin className="w-4 h-4" color="skyblue" />
            지도로 보기
          </Link>
          <SearchHistoryList SearchHistoryItems={searchHistory} />
        </>
      )}
    </Layout>
  );
};

export default MakePage;
