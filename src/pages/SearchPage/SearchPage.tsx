"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { SearchInput } from "@/components/make/SearchAreaInput";
import { SearchList } from "@/components/make/SearchAreaList";
import { SearchHistoryList } from "@/components/make/SearchAreaHistoryList";
import { useMakeStore } from "@/stores/makePlanStore";
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
    <Layout title="SEARCH">
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      {hasSearchValue ? (
        <div className="mt-3.5">
          <SearchList type="search" SearchItems={searchItems} />
        </div>
      ) : (
        <>
          <Link
            href="/map"
            className="flex items-center gap-[7px] w-fit mt-3.5 bg-white border border-line rounded-full px-3.5 py-2"
          >
            <MapPinIcon className="w-4 h-4 text-icon" />
            <div className="font-mono text-[11px] font-semibold tracking-[0.06em]">MAP VIEW</div>
          </Link>
          <SearchHistoryList SearchHistoryItems={searchHistory} />
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
