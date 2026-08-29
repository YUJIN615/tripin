import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  showBackButton?: boolean;
  className?: string;
  /** 모노스페이스 대문자 제목 (예: "MY TRIPS") */
  title?: string;
}

export const Layout = ({
  children,
  title,
  showBottomNav = true,
  showBackButton = true,
  className = "",
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-canvas ${className}`}>
      <Header title={title} showBackButton={showBackButton} />
      <div className="px-5 pt-2 pb-28">{children}</div>
      {showBottomNav && <BottomNav />}
    </div>
  );
};
