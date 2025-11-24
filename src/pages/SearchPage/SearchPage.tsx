"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/common/Layout";
import { SearchInput } from "@/components/make/SearchAreaInput";
import { SearchList } from "@/components/make/SearchAreaList";
import { SearchHistoryList } from "@/components/make/SearchAreaHistoryList";
import { useMakeStore } from "@/stores/makeStore";
import { MapPinIcon } from "@heroicons/react/24/solid";

export const SearchPage = () => {
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
            className="flex items-center gap-2 w-[fit-content] text-xs my-2 pl-3 pr-3.5 py-2 rounded-3xl text-[#666] bg-white border border-gray-300"
          >
            <MapPinIcon className="w-4 h-4" color="skyblue" />
            지도로 보기
          </Link>
          <SearchHistoryList SearchHistoryItems={searchHistory} />
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
