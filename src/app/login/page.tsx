import { redirect } from "next/navigation";
import LoginPage from "@/pages/LoginPage/LoginPage";
import { auth, signIn } from "@/auth";

export default async function Login() {
  // 이미 로그인한 사용자는 마이 화면으로 보냅니다
  const session = await auth();
  if (session?.user) redirect("/my");

  const signInAction = async () => {
    "use server";
    await signIn("google", { redirectTo: "/my" });
  };

  return <LoginPage signInAction={signInAction} />;
}
