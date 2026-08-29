import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { SearchItemType, SearchListType } from "@/types/make";
import { useMakeStore } from "@/stores/makePlanStore";
import { ListGroup, ListRow } from "@/components/common/ListGroup";
import { getRegionCode } from "@/utils/regionCode";

type SearchItemProps = {
  item: SearchItemType;
  type: SearchListType;
};

export const SearchItem = ({ item, type }: SearchItemProps) => {
  const router = useRouter();
  const addSearchHistory = useMakeStore((state) => state.addSearchHistory);
  const removeSearchHistory = useMakeStore((state) => state.removeSearchHistory);
  const setRegion = useMakeStore((state) => state.setRegion);

  const handleClick = () => {
    addSearchHistory(item);
    setRegion(item.name);
    router.push("/make");
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeSearchHistory(item.id);
  };

  return (
    <ListRow
      className="flex justify-between items-center cursor-pointer hover:bg-canvas transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-[38px] font-mono text-[13px] font-semibold text-accent">
          {getRegionCode(item.name)}
        </div>
        <div className="text-sm font-bold">{item.name}</div>
      </div>
      {type === "history" ? (
        <button
          type="button"
          aria-label={`${item.name} 최근 검색에서 삭제`}
          className="p-1 text-muted"
          onClick={handleRemove}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      ) : (
        <ChevronRightIcon className="w-4 h-4 text-muted" />
      )}
    </ListRow>
  );
};

type SearchListProps = {
  type: SearchListType;
  SearchItems: SearchItemType[];
};

export const SearchList = ({ type, SearchItems = [] }: SearchListProps) => {
  return (
    <ListGroup>
      {SearchItems.map((item) => (
        <SearchItem key={item.id} item={item} type={type} />
      ))}
    </ListGroup>
  );
};
