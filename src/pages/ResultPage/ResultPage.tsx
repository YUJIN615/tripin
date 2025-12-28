"use client";
import { useEffect, useState } from "react";
import { Layout } from "@/components/common/Layout";
import { useMakeStore } from "@/stores/makePlanStore";
import { loadTripResultFromLocalStorage, useMakePlan } from "@/hooks/useMakePlan";
import { useMakeTrip } from "@/hooks/useMakeTrip";
import { getTripTypeNames, getTransportTypeNames } from "@/utils/tripUtils";
import { PlanCreateResponseType } from "@/types/plan";
import { useRouter } from "next/navigation";

export const ResultPage = () => {
  const router = useRouter();
  const tripResultFromStore = useMakeStore((state) => state.planResult);
  const setPlanResult = useMakeStore((state) => state.setPlanResult);

  const [planResult, setLocalTripResult] = useState<PlanCreateResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // API 응답에서 실제 데이터 추출
  const result = planResult?.data;
  console.log(result);

  const { mutate: makePlan, isPending: isPendingMakePlan } = useMakePlan();
  const { mutate: makeTrip, isPending: isPendingMakeTrip } = useMakeTrip();

  // 일정 다시 만들기
  const handleRemakePlan = () => {
    if (!result) return;
    makePlan(
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
          console.log("✅ 일정 생성 성공:", data);
          // Zustand 스토어에도 저장 (선택사항)
          setPlanResult(data);
          // Result 페이지로 이동
          router.push("/result");
        },
        onError: (error) => {
          console.error("❌ 일정 생성 실패:", error);
          alert("일정 생성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 내 여행에 추가
  const savePlanResult = () => {
    console.log("저장하기");
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
        days: result.days,
      },
      {
        onSuccess: (data) => {
          console.log("✅ 일정 저장 성공:", data);
          // Result 페이지로 이동
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
    const loadData = () => {
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
        setPlanResult(savedResult);
        setIsLoading(false);
        return;
      }

      // 3. 둘 다 없으면 로딩 종료
      setIsLoading(false);
    };

    loadData();
  }, [tripResultFromStore, setPlanResult]);

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <Layout title="여행 일정">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">여행 일정을 불러오는 중...</p>
        </div>
      </Layout>
    );
  }

  if (!result) {
    return (
      <Layout title="여행 일정">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">여행 일정이 없습니다.</p>
        </div>
      </Layout>
    );
  }

  if (isPendingMakePlan) {
    return (
      <Layout title="여행 일정">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">여행 일정을 불러오는 중...</p>
        </div>
      </Layout>
    );
  }

  if (isPendingMakeTrip) {
    return (
      <Layout title="여행 일정">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">내 여행에 추가하는 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="여행 일정">
      <div className="space-y-6">
        {/* 여행 정보 요약 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="text-base font-bold">{result.region}</div>
            <div className="mb-2">
              일정: {new Date(result.startDate).toLocaleDateString()} ~{" "}
              {new Date(result.endDate).toLocaleDateString()}
            </div>
            <div className="mb-2">인원: {result.personCount}명</div>
            <div className="mb-2">컨셉: {getTripTypeNames(result.tripTypes)}</div>
            <div>이동 수단: {getTransportTypeNames(result.transports)}</div>
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="space-y-4">
          {result.days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-base font-bold mb-3">{day.date}</h3>
              <div className="space-y-3">
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="border-l-2 border-blue-500 pl-3">
                    <p className="mb-1 text-sm font-semibold">
                      {activity.time} - {activity.activity}
                    </p>
                    <p className="mb-1 text-sm text-gray-700">{activity.placeName}</p>
                    <p className="mb-1 text-xs text-gray-500">{activity.roadAddressName}</p>
                    {activity.phone && <p className="text-xs text-gray-500">📞 {activity.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-4 pb-4">
          <button
            className="w-2/6 h-12 bg-gray-200 text-gray-600 rounded-xl text-sm font-bold"
            disabled={isPendingMakePlan}
            onClick={handleRemakePlan}
          >
            다시 만들기
          </button>
          <button
            className="w-4/6 h-12 bg-blue-500 text-white rounded-xl text-sm font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isPendingMakePlan}
            onClick={savePlanResult}
          >
            내 여행에 추가
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
