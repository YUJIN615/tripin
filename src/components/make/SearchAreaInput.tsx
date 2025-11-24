import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchInput = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => {
  return (
    <div className="w-full mb-4 bg-white">
      <div className="flex items-center gap-[12px] w-full border border-gray-300 rounded-xl p-[12px]">
        <div className="flex items-center gap-[12px] w-full">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <input
            type="text"
            placeholder="장소를 검색해주세요."
            className="w-full border-none outline-none text-base text-gray-600 placeholder:text-sm placeholder:text-gray-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
