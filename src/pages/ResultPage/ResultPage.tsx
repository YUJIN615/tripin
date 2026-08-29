"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/common/Button";
import { BoardingPass } from "@/components/common/BoardingPass";
import { DayCard } from "@/components/trip/DayCard";
import { useMakeStore } from "@/stores/makePlanStore";
import { loadTripResultFromLocalStorage, useMakeTrip } from "@/hooks/useMakeTrip";
import { useMakeMyTrip } from "@/hooks/useMakeMyTrip";
import { getTripTypeNames } from "@/utils/tripUtils";
import { ORIGIN_REGION_CODE, getRegionCode } from "@/utils/regionCode";
import { formatDateRange, getDDayLabel, getPlanNo } from "@/utils/tripFormat";
import { TripCreateResponseType } from "@/types/trip";

/** 결과 화면의 로딩 · 빈 상태 */
const ResultMessage = ({ children }: { children: React.ReactNode }) => (
  <Layout title="NEW ITINERARY">
    <div className="py-16 text-center font-mono text-[13px] text-muted">{children}</div>
  </Layout>
);

export const ResultPage = () => {
  const router = useRouter();
  const tripResultFromStore = useMakeStore((state) => state.tripResult);
  const setTripResult = useMakeStore((state) => state.setTripResult);

  const [tripResult, setLocalTripResult] = useState<TripCreateResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // API 응답에서 실제 데이터 추출
  const result = tripResult?.data;

  const { mutate: makeTrip, isPending: isPendingMakeTrip } = useMakeTrip();
  const { mutate: makeMyTrip, isPending: isPendingMakeMyTrip } = useMakeMyTrip();

  // 일정 다시 만들기
  const handleRemakeTrip = () => {
    if (!result) return;
    makeTrip(
      {
        region: result.region,
        date: {
          from: new Date(result.startDate),
          to: new Date(result.endDate),
        },
        personCount: result.personCount,
        tripTypes: result.tripTypes,
        transports: result.transports,
      },
      {
        onSuccess: (data) => {
          setTripResult(data);
          setLocalTripResult(data);
        },
        onError: (error) => {
          console.error("❌ 일정 생성 실패:", error);
          alert("일정 생성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 내 여행에 추가
  const saveMyTrip = () => {
    if (!result) return;
    makeMyTrip(
      {
        tripId: parseInt(result.id),
      },
      {
        onSuccess: () => {
          router.push("/trip");
        },
        onError: (error) => {
          console.error("❌ 일정 저장 실패:", error);
          alert("일정 저장에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    // 1. 먼저 Zustand 스토어 확인
    if (tripResultFromStore) {
      setLocalTripResult(tripResultFromStore);
      setIsLoading(false);
      return;
    }

    // 2. 스토어에 없으면 localStorage 확인
    const savedResult = loadTripResultFromLocalStorage();
    if (savedResult) {
      setLocalTripResult(savedResult);
      // 스토어에도 저장
      setTripResult(savedResult);
    }

    setIsLoading(false);
  }, [tripResultFromStore, setTripResult]);

  if (isLoading) {
    return <ResultMessage>LOADING · 여행 일정을 불러오는 중...</ResultMessage>;
  }

  if (!result) {
    return <ResultMessage>NO ITINERARY · 여행 일정이 없습니다</ResultMessage>;
  }

  if (isPendingMakeTrip) {
    return <ResultMessage>GENERATING · 일정을 다시 만드는 중...</ResultMessage>;
  }

  if (isPendingMakeMyTrip) {
    return <ResultMessage>SAVING · 내 여행에 추가하는 중...</ResultMessage>;
  }

  return (
    <Layout title="NEW ITINERARY">
      <BoardingPass
        from={ORIGIN_REGION_CODE}
        to={getRegionCode(result.region)}
        badge={getDDayLabel(result.startDate, result.endDate)}
        meta={[
          { label: "DATE", value: formatDateRange(result.startDate, result.endDate) },
          { label: "PAX", value: `${result.personCount}명` },
          { label: "MOOD", value: getTripTypeNames(result.tripTypes) },
        ]}
        planNo={getPlanNo(result.id, result.region)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {result.days.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>

      <div className="flex gap-2.5 mt-6">
        <Button variant="secondary" className="w-28" onClick={handleRemakeTrip}>
          다시 만들기
        </Button>
        <Button className="flex-1" onClick={saveMyTrip}>
          내 여행에 추가
        </Button>
      </div>
    </Layout>
  );
};

export default ResultPage;
