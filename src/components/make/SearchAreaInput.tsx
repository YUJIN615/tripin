import { SearchIcon } from "lucide-react";

export const SearchInput = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => {
  return (
    <div className="w-full bg-white px-[16px] py-[8px]">
      <div className="flex items-center gap-[12px] w-full border border-gray-200 rounded-full p-[12px]">
        <div className="flex items-center gap-[12px] w-full">
          <SearchIcon className="w-5 h-5" />
          <input
            type="text"
            placeholder="어디로 갈까요?"
            className="w-full border-none outline-none text-base text-gray-600 placeholder:text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
