"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 환경 변수로 MSW 활성화 제어
      const useMSW = process.env.NEXT_PUBLIC_USE_MSW !== "false";

      if (process.env.NODE_ENV === "development" && useMSW) {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass", // MSW가 처리하지 않는 요청은 그냥 통과
        });
        console.log("🔧 MSW가 활성화되었습니다. (목업 데이터 사용)");
      } else if (process.env.NODE_ENV === "development") {
        console.log("🌐 MSW가 비활성화되었습니다. (실제 API 호출)");
      }
      setMswReady(true);
    };

    init();
  }, []);

  // MSW가 준비될 때까지 렌더링 지연
  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
