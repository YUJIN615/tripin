"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

type HeaderProps = {
  /** 모노스페이스 대문자 제목 (예: "NEW PLAN") */
  title?: string;
  showBackButton?: boolean;
};

export const Header = ({ title, showBackButton = true }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center px-5 pt-5 pb-2">
      {showBackButton && (
        <button type="button" aria-label="뒤로 가기" onClick={handleBack}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}
      <h1
        className={`w-full text-center font-mono text-[13px] font-semibold tracking-label ${
          showBackButton ? "mr-5" : ""
        }`}
      >
        {title}
      </h1>
    </header>
  );
};
