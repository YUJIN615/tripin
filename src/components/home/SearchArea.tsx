import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchArea = () => {
  return (
    <div className="px-5">
      <Link
        href="/search"
        className="flex items-center gap-2.5 bg-white border-[1.5px] border-ink rounded-xl px-4 py-3"
      >
        <MagnifyingGlassIcon className="w-[19px] h-[19px] shrink-0 text-icon" />
        <div className="font-mono text-[13px] text-muted">WHERE TO?</div>
      </Link>
    </div>
  );
};
