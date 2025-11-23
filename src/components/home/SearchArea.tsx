import Link from "next/link";
import { SearchIcon } from "lucide-react";

export const SearchArea = () => {
  return (
    <div className="w-full bg-white p-[12px]">
      <Link
        href="/make"
        className="flex items-center gap-[12px] border border-gray-200 rounded-full p-[12px]"
      >
        <div className="w-5 h-5">
          <SearchIcon className="w-5 h-5" />
        </div>
        <div className="text-[14px] text-gray-600">어디로 갈까요?</div>
      </Link>
    </div>
  );
};
