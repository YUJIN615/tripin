import { Layout } from "@/components/layout/Layout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { GoogleMark } from "@/components/common/GoogleMark";
import { ORIGIN_REGION_CODE } from "@/utils/regionCode";

/**
 * 로그인 — 구글 OIDC
 *
 * 이 파일은 화면만 담당하고 실제 로그인은 서버 액션(signInAction)에 위임합니다.
 * 폼 액션으로 처리하므로 클라이언트 자바스크립트 없이 동작하고,
 * Next가 서버 액션에 CSRF 보호를 걸어줍니다.
 */
export const LoginPage = ({ signInAction }: { signInAction: () => Promise<void> }) => {
  return (
    <Layout title="SIGN IN" showBottomNav={false}>
      <div className="pt-6">
        <h2 className="text-[22px] font-bold leading-snug">
          여행을 저장하려면
          <br />
          로그인이 필요해요
        </h2>
        <p className="text-sm text-muted mt-3 leading-relaxed">
          구글 계정으로 로그인하면 만든 일정과 저장한 장소가
          <br />
          계정에 함께 보관됩니다.
        </p>

        {/* 탑승권 스텁 형태의 안내 */}
        <div className="bg-white rounded-pass shadow-pass mt-7 overflow-hidden">
          <div className="p-[18px]">
            <SectionLabel className="mb-1.5">PASSENGER</SectionLabel>
            <div className="font-mono text-[26px] font-semibold leading-tight text-muted">
              GUEST
            </div>
          </div>
          <div className="relative h-[22px]">
            <div className="absolute -left-[11px] top-0 w-[22px] h-[22px] rounded-full bg-canvas" />
            <div className="absolute -right-[11px] top-0 w-[22px] h-[22px] rounded-full bg-canvas" />
            <div className="absolute left-[18px] right-[18px] top-[10px] border-t-[1.5px] border-dashed border-line" />
          </div>
          <div className="px-[18px] pt-2 pb-[18px] flex justify-between items-center">
            <div>
              <SectionLabel className="tracking-[0.12em]">ORIGIN</SectionLabel>
              <div className="font-mono text-[15px] font-semibold mt-0.5">
                {ORIGIN_REGION_CODE}
              </div>
            </div>
            <div className="font-mono text-[10px] text-muted">NOT SIGNED IN</div>
          </div>
        </div>

        <form action={signInAction} className="mt-7">
          <button
            type="submit"
            className="flex items-center justify-center gap-2.5 w-full h-[50px] bg-white border border-line rounded-group text-[15px] font-bold shadow-card transition-colors hover:border-accent"
          >
            <GoogleMark className="w-5 h-5" />
            Google로 계속하기
          </button>
        </form>

        <p className="font-mono text-[10px] tracking-[0.12em] text-muted text-center mt-5">
          SECURED BY GOOGLE OIDC
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
