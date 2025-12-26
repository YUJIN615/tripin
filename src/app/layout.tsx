import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "./MSWProvider";
import { QueryProvider } from "@/providers/QueryProvider";

// 한글 폰트
const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "TripIn",
  description: "나만의 여행 일정 자동 생성 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <QueryProvider>
          <MSWProvider>{children}</MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
