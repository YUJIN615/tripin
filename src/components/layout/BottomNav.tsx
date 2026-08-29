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

const BOTTOM_NAV_MENU = [
  { path: "/make", label: "NEW", solid: PlusIconSolid, outline: PlusIconOutline },
  { path: "/trip", label: "TRIPS", solid: CalendarIconSolid, outline: CalendarIconOutline },
  { path: "/", label: "HOME", solid: HomeIconSolid, outline: HomeIconOutline },
  { path: "/like", label: "LIKED", solid: HeartIconSolid, outline: HeartIconOutline },
  { path: "/my", label: "ME", solid: UserIconSolid, outline: UserIconOutline },
] as const;

/** HOME 탭을 활성으로 표시할 경로 */
const HOME_PATHS = ["/", "/search", "/map"];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 px-7 pt-3 pb-4 bg-white border-t-[1.5px] border-ink z-50">
      <nav className="flex justify-between items-center">
        {BOTTOM_NAV_MENU.map((menu) => {
          // 하위 경로(/trip/[id])에서도 상위 탭이 활성으로 보이게 한다.
          // 검색·지도는 홈에서 진입하므로 시안대로 HOME을 활성으로 표시한다.
          const isActive =
            menu.path === "/"
              ? HOME_PATHS.includes(pathname ?? "")
              : pathname?.startsWith(menu.path) === true;
          const Icon = isActive ? menu.solid : menu.outline;

          return (
            <Link
              href={menu.path}
              key={menu.path}
              className={`flex flex-col items-center gap-[3px] ${
                isActive ? "text-ink" : "text-muted"
              }`}
            >
              <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? undefined : 1.8} />
              <div className={`font-mono text-[10px] ${isActive ? "font-semibold" : ""}`}>
                {menu.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};
