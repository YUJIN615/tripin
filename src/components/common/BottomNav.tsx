"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon as HomeIconSolid,
  PlusCircleIcon as PlusIconSolid,
  CalendarIcon as CalendarIconSolid,
  HeartIcon as HeartIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  PlusCircleIcon as PlusIconOutline,
  CalendarIcon as CalendarIconOutline,
  HeartIcon as HeartIconOutline,
  UserIcon as UserIconOutline,
} from "@heroicons/react/24/outline";

export const BottomNav = () => {
  const pathname = usePathname();
  const iconClassName = "w-5 h-5 mb-0.5 text-gray-800";

  const BottomNavMenu = [
    {
      path: "/make",
      icon:
        pathname === "/make" ? (
          <PlusIconSolid className={iconClassName} />
        ) : (
          <PlusIconOutline className={iconClassName} />
        ),
      text: "새 일정",
    },
    {
      path: "/plan",
      icon:
        pathname === "/plan" ? (
          <CalendarIconSolid className={iconClassName} />
        ) : (
          <CalendarIconOutline className={iconClassName} />
        ),
      text: "내 여행",
    },
    {
      path: "/",
      icon:
        pathname === "/" ? (
          <HomeIconSolid className={iconClassName} />
        ) : (
          <HomeIconOutline className={iconClassName} />
        ),
      text: "홈",
    },
    {
      path: "/like",
      icon:
        pathname === "/like" ? (
          <HeartIconSolid className={iconClassName} />
        ) : (
          <HeartIconOutline className={iconClassName} />
        ),
      text: "좋아요",
    },
    {
      path: "/my",
      icon:
        pathname === "/my" ? (
          <UserIconSolid className={iconClassName} />
        ) : (
          <UserIconOutline className={iconClassName} />
        ),
      text: "마이",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 px-[32px] pt-[12px] pb-[12px] bg-white border-t border-gray-200 z-50">
      <nav className="flex justify-between items-center">
        {BottomNavMenu.map((menu) => (
          <Link href={menu.path} className="flex flex-col items-center text-center" key={menu.path}>
            {menu.icon}
            <div className="text-[10px]">{menu.text}</div>
          </Link>
        ))}
      </nav>
    </footer>
  );
};
