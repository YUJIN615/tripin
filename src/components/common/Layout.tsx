import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
  title?: string;
}

export const Layout = ({ children, title, showBottomNav = true, className = "" }: LayoutProps) => {
  return (
    <div className={className}>
      <Header title={title} />
      <div className="px-4 pt-4 pb-16">{children}</div>
      {showBottomNav && <BottomNav />}
    </div>
  );
};
