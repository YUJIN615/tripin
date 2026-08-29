import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";

type MetaItem = {
  label: string;
  value: string;
};

type BoardingPassProps = {
  /** 출발 지역 코드 */
  from: string;
  /** 도착 지역 코드 */
  to: string;
  /** DATE · PAX · MODE 처럼 하단에 나열되는 정보 */
  meta: MetaItem[];
  /** 절취선 아래 스텁에 찍히는 일정 번호 */
  planNo: string;
  /** D-12 같은 배지 */
  badge?: string;
  /** 카드 상단 이미지 */
  image?: { src: string; alt: string };
  /** 스텁 오른쪽 문구 (예: "일정 보기 →") */
  action?: string;
};

/**
 * 보딩패스 카드 — 이 디자인의 중심 요소
 *
 * 상단(이미지 · FROM/TO · 정보) / 절취선 / 스텁(일정 번호)의 3단 구성입니다.
 * 절취선 양 끝의 반원은 배경색(canvas)으로 카드를 파낸 것처럼 보이게 합니다.
 */
export const BoardingPass = ({
  from,
  to,
  meta,
  planNo,
  badge,
  image,
  action,
}: BoardingPassProps) => {
  return (
    <div className="bg-white rounded-pass overflow-hidden shadow-lift">
      {image && (
        <div className="relative h-[132px]">
          <Image
            src={image.src}
            alt={image.alt}
            width={390}
            height={132}
            className="w-full h-full object-cover"
          />
          {badge && (
            <div className="absolute top-3 left-3.5 bg-badge font-mono text-[11px] font-semibold px-2.5 py-1 rounded">
              {badge}
            </div>
          )}
        </div>
      )}

      <div className="p-[18px]">
        {/* 출발 → 도착 */}
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-label text-muted">FROM</div>
            <div className="font-mono text-[26px] font-semibold leading-tight">{from}</div>
          </div>
          <div className="flex-1 flex items-center gap-1.5 px-2.5 pb-2">
            <div className="flex-1 h-px bg-hairline" />
            <MapPinIcon className="w-3.5 h-3.5 text-icon" />
            <div className="flex-1 h-px bg-hairline" />
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] tracking-label text-muted">TO</div>
            <div className="font-mono text-[26px] font-semibold leading-tight">{to}</div>
          </div>
        </div>

        {/* DATE · PAX · MODE */}
        <div className="flex justify-between mt-4">
          {meta.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[10px] tracking-[0.12em] text-muted">{item.label}</div>
              <div className="text-sm font-bold mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 절취선 */}
      <div className="relative h-[22px]">
        <div className="absolute -left-[11px] top-0 w-[22px] h-[22px] rounded-full bg-canvas" />
        <div className="absolute -right-[11px] top-0 w-[22px] h-[22px] rounded-full bg-canvas" />
        <div className="absolute left-[18px] right-[18px] top-[10px] border-t-[1.5px] border-dashed border-line" />
      </div>

      {/* 스텁 */}
      <div className="px-[18px] pt-2 pb-[18px] flex justify-between items-center">
        <div>
          <div className="font-mono text-[10px] tracking-[0.12em] text-muted">PLAN NO.</div>
          <div className="font-mono text-[15px] font-semibold mt-0.5">{planNo}</div>
        </div>
        {action ? (
          <div className="font-mono text-xs font-semibold text-accent">{action}</div>
        ) : (
          badge &&
          !image && (
            <div className="font-mono text-[10px] font-semibold bg-badge px-2 py-0.5 rounded">
              {badge}
            </div>
          )
        )}
      </div>
    </div>
  );
};
