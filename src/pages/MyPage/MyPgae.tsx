import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { Layout } from "@/components/layout/Layout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ListGroup, ListRow } from "@/components/common/ListGroup";
import { GoogleMark } from "@/components/common/GoogleMark";

const settingsList = [
  { title: "계정 설정", href: "/my/profile" },
  { title: "알림 설정", href: "/my/settings" },
];

type MyPageProps = {
  session: Session | null;
  /** 로그아웃 서버 액션 */
  signOutAction: () => Promise<void>;
};

export const MyPage = ({ session, signOutAction }: MyPageProps) => {
  const user = session?.user;

  return (
    <Layout title="ME">
      <SectionLabel className="mt-1.5 mb-2.5">ACCOUNT · 계정</SectionLabel>

      {user ? (
        <div className="flex items-center gap-3 bg-white rounded-field p-4 shadow-card">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "프로필"}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-badge shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold truncate">{user.name ?? "이름 없음"}</div>
            <div className="text-xs text-muted truncate mt-0.5">{user.email}</div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] text-accent shrink-0">
            SIGNED IN
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2.5 bg-white border border-line rounded-field p-4 shadow-card"
        >
          <GoogleMark className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <div className="text-[15px] font-bold">Google로 로그인</div>
            <div className="text-xs text-muted mt-0.5">일정을 계정에 보관하려면 로그인하세요</div>
          </div>
          <div className="font-mono text-xs text-muted">→</div>
        </Link>
      )}

      <SectionLabel className="mt-6 mb-2.5">SETTINGS · 설정</SectionLabel>
      <ListGroup>
        {settingsList.map((item) => (
          <ListRow key={item.title} className="p-0">
            <Link href={item.href} className="flex justify-between items-center px-4 py-4">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="font-mono text-xs text-muted">→</div>
            </Link>
          </ListRow>
        ))}

        {user && (
          <ListRow className="p-0">
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex justify-between items-center w-full px-4 py-4"
              >
                <div className="text-sm font-bold text-muted">로그아웃</div>
                <div className="font-mono text-xs text-muted">→</div>
              </button>
            </form>
          </ListRow>
        )}
      </ListGroup>

      {user && (
        <p className="font-mono text-[10px] tracking-[0.12em] text-muted text-center mt-6">
          로그아웃하면 서버의 세션이 즉시 삭제됩니다
        </p>
      )}
    </Layout>
  );
};

export default MyPage;
