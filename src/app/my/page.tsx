import MyPage from "@/pages/MyPage/MyPgae";
import { auth, signOut } from "@/auth";

export default async function My() {
  const session = await auth();

  const signOutAction = async () => {
    "use server";
    // DB 세션 전략이므로 Session row가 삭제되어 즉시 무효화됩니다
    await signOut({ redirectTo: "/" });
  };

  return <MyPage session={session} signOutAction={signOutAction} />;
}
