import Link from "next/link";
import { formatToday } from "@/utils/tripFormat";

export const HomeHeader = () => {
  return (
    <header className="flex justify-between items-center px-5 pt-5 pb-2.5">
      <h1>
        <Link href="/" className="font-mono text-[17px] font-semibold tracking-label">
          TRIPIN
        </Link>
      </h1>
      {/* 서버와 클라이언트의 시간대가 다를 수 있어 하이드레이션 경고를 억제합니다 */}
      <div className="font-mono text-[11px] text-muted" suppressHydrationWarning>
        {formatToday()}
      </div>
    </header>
  );
};
