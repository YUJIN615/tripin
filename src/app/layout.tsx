import type { Metadata } from "next";
import { Noto_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "./MSWProvider";
import { QueryProvider } from "@/providers/QueryProvider";

// 한글 폰트 — 제목/본문
const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-kr",
});

// 모노스페이스 — 지역 코드, 라벨, 시간
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-ibm-plex-mono",
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
      <body className={`${notoSansKr.variable} ${ibmPlexMono.variable} font-sans`}>
        <QueryProvider>
          <MSWProvider>{children}</MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
