"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

export const Header = ({ title, showBackButton = true }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex justify-between items-center px-[16px] py-[12px]">
      {showBackButton && (
        <div onClick={handleBack}>
          <ChevronLeftIcon className="w-5 h-5" />
        </div>
      )}
      <h1 className="w-full text-l font-bold text-center">{title}</h1>
    </header>
  );
};
