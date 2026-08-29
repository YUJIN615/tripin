import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** DB의 User.id — session 콜백에서 채웁니다 */
      id: string;
    } & DefaultSession["user"];
  }
}
