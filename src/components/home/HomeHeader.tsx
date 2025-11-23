import Link from "next/link";
import { Menu } from "lucide-react";

export const HomeHeader = () => {
  return (
    <header className="flex justify-between items-center px-[16px] py-[12px]">
      <h1>
        <Link href="/" className="text-2xl font-bold">
          Tripin
        </Link>
      </h1>
      <Menu className="w-6 h-6" />
    </header>
  );
};
