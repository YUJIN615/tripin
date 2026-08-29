import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

/**
 * Auth.js 설정 — 구글 OIDC 로그인
 *
 * 세션은 DB(Session 테이블)에서 관리합니다(strategy: "database").
 * 쿠키에는 의미 없는 세션 토큰만 담기고 실제 상태는 서버에 있어서,
 * Session row를 지우면 만료 전이라도 그 즉시 로그아웃됩니다.
 *
 * 필요한 환경변수 (.env.example 참고)
 * - AUTH_SECRET        쿠키 서명/암호화 키
 * - AUTH_GOOGLE_ID     Google OAuth 클라이언트 ID
 * - AUTH_GOOGLE_SECRET Google OAuth 클라이언트 시크릿
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 30, // 30일
    updateAge: 60 * 60 * 24, // 하루에 한 번만 만료 시각을 갱신 (불필요한 쓰기 방지)
  },

  providers: [
    Google({
      authorization: {
        params: {
          // 계정 선택 화면을 항상 띄워 의도치 않은 계정으로 로그인되는 것을 막습니다
          prompt: "select_account",
        },
      },
      // allowDangerousEmailAccountLinking은 기본값(false)을 유지합니다.
      // true로 켜면 이메일이 같다는 이유만으로 기존 계정에 연결되어,
      // 다른 제공자를 추가했을 때 계정 탈취 경로가 생깁니다.
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    /** 구글에서 이메일 인증이 끝난 계정만 허용합니다 */
    signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified === true;
      }
      return true;
    },

    /** 클라이언트가 쓸 수 있도록 사용자 id를 세션에 실어 보냅니다 */
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
