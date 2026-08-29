import { SearchList } from "@/components/make/SearchAreaList";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SearchItemType } from "@/types/make";

type SearchHistoryListProps = {
  SearchHistoryItems: SearchItemType[];
};

export const SearchHistoryList = ({ SearchHistoryItems = [] }: SearchHistoryListProps) => {
  if (SearchHistoryItems.length === 0) return null;

  return (
    <div>
      <SectionLabel className="mt-6 mb-2.5">RECENT · 최근 검색</SectionLabel>
      <SearchList type="history" SearchItems={SearchHistoryItems} />
    </div>
  );
};
