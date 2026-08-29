import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchInput = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2.5 bg-white border-[1.5px] border-ink rounded-xl px-4 py-3">
      <MagnifyingGlassIcon className="w-[19px] h-[19px] shrink-0 text-icon" />
      <input
        type="text"
        placeholder="지역을 검색해주세요"
        className="w-full border-none outline-none text-sm text-ink placeholder:text-muted"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
