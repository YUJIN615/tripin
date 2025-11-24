import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchArea = () => {
  return (
    <div className="w-full p-3">
      <Link
        href="/search"
        className="flex items-center gap-2 border border-gray-200 rounded-full p-3 bg-white"
      >
        <div className="w-5 h-5">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <div className="text-[14px] text-gray-600">어디로 갈까요?</div>
      </Link>
    </div>
  );
};
