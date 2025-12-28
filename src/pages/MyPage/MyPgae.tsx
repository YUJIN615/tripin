import { Layout } from "@/components/layout/Layout";
import Link from "next/link";

export const MyPage = () => {
  const myList = [
    {
      title: "계정 설정",
      href: "/my/profile",
    },
    {
      title: "알림 설정",
      href: "/my/settings",
    },
    {
      title: "로그아웃",
      href: "/my/settings",
    },
  ];
  return (
    <Layout title="마이">
      <ul className="flex flex-col gap-2">
        {myList.map((item) => (
          <li key={item.title} className="text-sm text-gray-700 border-b border-gray-200 py-4">
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default MyPage;
