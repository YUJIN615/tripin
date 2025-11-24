import { XMarkIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchItemType, SearchListType } from "@/types/make";
import { useMakeStore } from "@/stores/makeStore";

type SearchItemProps = {
  item: SearchItemType;
  type: SearchListType;
};

export const SearchItem = ({ item, type }: SearchItemProps) => {
  const { addSearchHistory, removeSearchHistory } = useMakeStore();

  const handleClick = () => {
    if (type === "search") {
      // 검색 결과 클릭 시 최근 검색에 추가
      addSearchHistory(item);
    }
    // 여기에 추가 동작 (예: 페이지 이동) 구현 가능
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    removeSearchHistory(item.id);
  };

  return (
    <li
      key={item.id}
      className="flex items-center justify-between w-full py-[8px] cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="w-5 h-5" color="#666" />
        <div className="text-[14px] text-gray-600">{item.name}</div>
      </div>
      {type === "history" && (
        <button className="p-[4px] hover:bg-gray-200 rounded" onClick={handleRemove}>
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </li>
  );
};

type SearchListProps = {
  type: SearchListType;
  SearchItems: SearchItemType[];
};

export const SearchList = ({ type, SearchItems = [] }: SearchListProps) => {
  return (
    <ul className="flex flex-col gap-1 w-full bg-white px-1">
      {SearchItems.map((item) => (
        <SearchItem key={item.id} item={item} type={type} />
      ))}
    </ul>
  );
};
