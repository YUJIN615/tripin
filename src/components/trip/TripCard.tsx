import { TripResponseType } from "@/types/trip";
import { getTransportTypeNames } from "@/utils/tripUtils";
import { ORIGIN_REGION_CODE, getRegionCode } from "@/utils/regionCode";
import { getDDayLabel, getPlanNo, getStayLabel, isPastTrip } from "@/utils/tripFormat";

/**
 * 내 여행 목록의 일정 카드 — 보딩패스를 목록용으로 압축한 형태
 */
export const TripCard = ({ item }: { item: TripResponseType }) => {
  const { id, region, startDate, endDate, personCount, transports } = item;
  const dDayLabel = getDDayLabel(startDate, endDate);
  const isPast = isPastTrip(endDate);

  return (
    <div className="bg-white rounded-card p-4 shadow-card">
      <div className="flex justify-between items-center">
        <div className="font-mono text-[11px] tracking-[0.12em] text-muted">
          {getPlanNo(id, region)}
        </div>
        {isPast ? (
          <div className="font-mono text-[10px] text-muted">{dDayLabel}</div>
        ) : (
          <div className="font-mono text-[10px] font-semibold bg-badge px-2 py-0.5 rounded">
            {dDayLabel}
          </div>
        )}
      </div>

      <div className="flex items-end gap-2.5 mt-2.5">
        <div className="font-mono text-[22px] font-semibold">{ORIGIN_REGION_CODE}</div>
        <div className="flex-1 h-px bg-line mb-[9px]" />
        <div className="font-mono text-[22px] font-semibold">{getRegionCode(region)}</div>
      </div>

      <div className="flex justify-between border-t-[1.5px] border-dashed border-line mt-3 pt-3">
        <div className="text-[13px] font-bold">
          {region} · {getStayLabel(startDate, endDate)}
        </div>
        <div className="text-xs text-muted">
          {personCount}명 · {getTransportTypeNames(transports)}
        </div>
      </div>
    </div>
  );
};
