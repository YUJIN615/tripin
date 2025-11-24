import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";

export const HomeHeader = () => {
  return (
    <header className="flex justify-between items-center px-[16px] py-[12px]">
      <h1>
        <Link href="/" className="text-xl font-bold">
          TRIPIN
        </Link>
      </h1>
      <Bars3Icon className="w-6 h-6" />
    </header>
  );
};
