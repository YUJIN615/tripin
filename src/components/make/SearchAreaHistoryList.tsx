import { SearchList } from "@/components/make/SearchAreaList";
import { SearchItemType } from "@/types/make";

type SearchHistoryListProps = {
  SearchHistoryItems: SearchItemType[];
};

export const SearchHistoryList = ({ SearchHistoryItems = [] }: SearchHistoryListProps) => {
  return (
    <>
      {SearchHistoryItems.length > 0 && (
        <div>
          <h2 className="text-base font-bold py-3 px-1">최근 검색</h2>
          <SearchList type="history" SearchItems={SearchHistoryItems} />
        </div>
      )}
    </>
  );
};
