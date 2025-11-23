import Link from "next/link";
import { Home, Calendar, User, Plus, Heart } from "lucide-react";

export const BottomNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 px-[32px] pt-[12px] pb-[12px] bg-white border-t border-gray-200">
      <nav className="flex justify-between items-center">
        <Link href="/make" className="flex flex-col items-center">
          <Plus className="w-5 h-5 mb-[6px] text-gray-600" />
          <div className="text-[10px] text-center">새 일정</div>
        </Link>
        <Link href="/result" className="flex flex-col items-center">
          <Calendar className="w-5 h-5 mb-[6px] text-gray-600" />
          <div className="text-[10px] text-center">내 일정</div>
        </Link>
        <Link href="/" className="flex flex-col items-center">
          <Home className="w-5 h-5 mb-[6px] text-center text-gray-600" />
          <div className="text-[10px] text-center">홈</div>
        </Link>
        <Link href="/like" className="flex flex-col items-center">
          <Heart className="w-5 h-5 mb-[6px] text-gray-600" />
          <div className="text-[10px] text-center">찜</div>
        </Link>
        <Link href="/my" className="flex flex-col items-center">
          <User className="w-5 h-5 mb-[6px] text-gray-600" />
          <div className="text-[10px] text-center">마이</div>
        </Link>
      </nav>
    </footer>
  );
};
