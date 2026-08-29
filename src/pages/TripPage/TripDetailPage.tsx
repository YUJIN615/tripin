"use client";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BoardingPass } from "@/components/common/BoardingPass";
import { DayCard } from "@/components/trip/DayCard";
import { TripResponseType } from "@/types/trip";
import { ORIGIN_REGION_CODE, getRegionCode } from "@/utils/regionCode";
import { formatDateRange, getDDayLabel, getPlanNo } from "@/utils/tripFormat";
import { getTripTypeNames } from "@/utils/tripUtils";

export const TripDetailPage = ({ data }: { data?: TripResponseType }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  // src/pages는 Next의 Pages Router 경로라 이 파일도 라우트로 잡힙니다.
  // 일정 데이터 없이 직접 렌더링되는 경우를 대비한 방어 코드입니다.
  if (!data) {
    return (
      <Layout title="ITINERARY">
        <div className="py-16 text-center font-mono text-[13px] text-muted">
          NOT FOUND · 일정 정보를 찾을 수 없습니다
        </div>
      </Layout>
    );
  }

  const { id, region, startDate, endDate, personCount, tripTypes, days } = data;
  const currentDay = days[selectedDay];

  return (
    <Layout title="ITINERARY">
      <BoardingPass
        from={ORIGIN_REGION_CODE}
        to={getRegionCode(region)}
        badge={getDDayLabel(startDate, endDate)}
        meta={[
          { label: "DATE", value: formatDateRange(startDate, endDate) },
          { label: "PAX", value: `${personCount}명` },
          { label: "MOOD", value: getTripTypeNames(tripTypes) },
        ]}
        planNo={getPlanNo(id, region)}
      />

      {/* 일자 선택 */}
      <div className="flex gap-2 mt-5 overflow-x-auto">
        {days.map((day, index) => (
          <button
            key={day.date}
            type="button"
            onClick={() => setSelectedDay(index)}
            className={`shrink-0 px-4 py-2.5 rounded-chip font-mono text-[11px] font-semibold transition-colors ${
              selectedDay === index
                ? "bg-ink text-white"
                : "bg-white border border-line text-muted"
            }`}
          >
            DAY {index + 1}
          </button>
        ))}
      </div>

      {currentDay && (
        <div className="mt-4.5">
          <DayCard day={currentDay} />
        </div>
      )}
    </Layout>
  );
};

export default TripDetailPage;
