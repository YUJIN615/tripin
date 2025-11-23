import { SearchList } from "@/components/make/SearchAreaList";
import { SearchItemType } from "@/types/make";

type SearchHistoryListProps = {
  SearchHistoryItems: SearchItemType[];
}

export const SearchHistoryList = ({ SearchHistoryItems = [] }: SearchHistoryListProps) => {
  return (
    <div>
      <h2 className="text-base font-bold px-[24px] py-[12px]">최근 검색</h2>
      <SearchList type="history" SearchItems={SearchHistoryItems} />
    </div>
  );
};
