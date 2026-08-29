"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DateRange, DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { useMakeStore } from "@/stores/makePlanStore";
import { useMakeTrip } from "@/hooks/useMakeTrip";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { SectionLabel } from "@/components/common/SectionLabel";
import { hasValue } from "@/utils/common";
import { getRegionCode } from "@/utils/regionCode";
import { formatDateRange, getStayLabel } from "@/utils/tripFormat";
import { TRIP_PLACES, TRIP_CONCEPTS, PERSON_COUNT, TRANSPORT_TYPES } from "@/constants";
import "react-day-picker/style.css";

export const MakePage = () => {
  const router = useRouter();
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const dateClickCountRef = useRef(0);

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const region = useMakeStore((state) => state.region);
  const date = useMakeStore((state) => state.date);
  const personCount = useMakeStore((state) => state.personCount);
  const selectedTripPlaces = useMakeStore((state) => state.selectedTripPlaces);
  const selectedTripConcepts = useMakeStore((state) => state.selectedTripConcepts);
  const selectedTransports = useMakeStore((state) => state.selectedTransports);
  const setDate = useMakeStore((state) => state.setDate);
  const setPersonCount = useMakeStore((state) => state.setPersonCount);
  const setSelectedTripPlaces = useMakeStore((state) => state.setSelectedTripPlaces);
  const setSelectedTripConcepts = useMakeStore((state) => state.setSelectedTripConcepts);
  const setSelectedTransports = useMakeStore((state) => state.setSelectedTransports);

  const clearAll = useMakeStore((state) => state.clearAll);
  const setTripResult = useMakeStore((state) => state.setTripResult);

  // Tanstack Query mutation
  const { mutate: makeTrip, isPending } = useMakeTrip();

  const selectDate = (value: DateRange | undefined) => {
    setDate(value);

    // 클릭 횟수 증가
    dateClickCountRef.current += 1;

    // 2번 클릭하면 캘린더 닫기
    if (dateClickCountRef.current === 2) {
      setIsOpenCalendar(false);
      dateClickCountRef.current = 0; // 카운트 초기화
    }
  };

  // 여행 타입 토글 함수
  const toggleTripType = (value: string) => {
    setSelectedTripPlaces(
      selectedTripPlaces.includes(value)
        ? selectedTripPlaces.filter((v) => v !== value)
        : [...selectedTripPlaces, value]
    );
  };

  // 여행 컨셉 토글 함수
  const toggleTripConcept = (value: string) => {
    setSelectedTripConcepts(
      selectedTripConcepts.includes(value)
        ? selectedTripConcepts.filter((v) => v !== value)
        : [...selectedTripConcepts, value]
    );
  };

  // 이동 수단 토글 함수
  const toggleTransport = (value: string) => {
    setSelectedTransports(
      selectedTransports.includes(value)
        ? selectedTransports.filter((v) => v !== value)
        : [...selectedTransports, value]
    );
  };

  const toggleCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  // 인원 증감
  const decreasePersonCount = () => {
    setPersonCount(Math.max(PERSON_COUNT.MIN, personCount - 1));
  };

  const increasePersonCount = () => {
    setPersonCount(Math.min(PERSON_COUNT.MAX, personCount + 1));
  };

  // 일정 만들기 버튼 클릭 핸들러
  const handleMakeTrip = () => {
    makeTrip(
      {
        region,
        date,
        personCount,
        tripTypes: selectedTripPlaces,
        transports: selectedTransports,
      },
      {
        onSuccess: (data) => {
          // Zustand 스토어에도 저장
          setTripResult(data);
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

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !calendarContainerRef.current?.contains(event.target as Node)
      ) {
        setIsOpenCalendar(false);
        dateClickCountRef.current = 0; // 클릭 카운트 초기화
      }
    };

    if (isOpenCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCalendar]);

  if (isPending) {
    return (
      <Layout title="NEW PLAN">
        <div className="flex items-center justify-center h-64">
          <p className="font-mono text-[13px] text-muted">GENERATING · 일정을 만드는 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="NEW PLAN">
      <div className="pb-[92px]">
        <h2 className="text-[22px] font-bold leading-snug mb-5">
          어떤 여행을
          <br />
          준비해볼까요?
        </h2>

        {/* 지역 */}
        <Link
          href="/search"
          className="block bg-white rounded-field px-4 py-4 mb-2.5 shadow-card"
        >
          <SectionLabel className="mb-1.5">REGION · 지역</SectionLabel>
          <div className="flex justify-between items-center">
            <div className={`text-[17px] font-bold ${hasValue(region) ? "" : "text-muted"}`}>
              {hasValue(region) ? region : "지역을 선택해주세요"}
            </div>
            {hasValue(region) && (
              <div className="font-mono text-[15px] font-semibold text-accent">
                {getRegionCode(region)}
              </div>
            )}
          </div>
        </Link>

        {/* 날짜 · 인원 */}
        <div className="flex gap-2.5">
          <div
            ref={calendarContainerRef}
            onClick={toggleCalendar}
            className="flex-1 bg-white rounded-field px-4 py-4 shadow-card cursor-pointer"
          >
            <SectionLabel className="mb-1.5">DATE</SectionLabel>
            {date?.from ? (
              <>
                <div className="font-mono text-[15px] font-semibold">
                  {formatDateRange(date.from, date.to)}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {getStayLabel(date.from, date.to)}
                </div>
              </>
            ) : (
              <div className="font-mono text-[15px] font-semibold text-muted">SELECT</div>
            )}
          </div>

          <div className="w-[132px] shrink-0 bg-white rounded-field px-4 py-4 shadow-card">
            <SectionLabel className="mb-1.5">PAX</SectionLabel>
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="인원 줄이기"
                onClick={decreasePersonCount}
                disabled={personCount === PERSON_COUNT.MIN}
                className="w-6 h-6 rounded-full border-[1.5px] border-line text-muted font-bold flex items-center justify-center disabled:opacity-40"
              >
                −
              </button>
              <div className="text-base font-bold">
                {personCount}
                {personCount === PERSON_COUNT.MAX && "+"}
              </div>
              <button
                type="button"
                aria-label="인원 늘리기"
                onClick={increasePersonCount}
                disabled={personCount === PERSON_COUNT.MAX}
                className="w-6 h-6 rounded-full bg-accent text-white font-bold flex items-center justify-center disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {isOpenCalendar && (
          <div ref={calendarRef} className="mt-2.5">
            <DayPicker
              mode="range"
              selected={date}
              onSelect={(value) => selectDate(value)}
              locale={ko}
            />
          </div>
        )}

        {/* 여행 장소 */}
        <div className="mt-6">
          <SectionLabel className="mb-2.5">PLACES · 여행 장소</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TRIP_PLACES.map((type) => (
              <Chip
                key={type.id}
                label={type.name}
                selected={selectedTripPlaces.includes(type.value)}
                onClick={() => toggleTripType(type.value)}
              />
            ))}
          </div>
        </div>

        {/* 여행 컨셉 */}
        <div className="mt-6">
          <SectionLabel className="mb-2.5">MOOD · 여행 컨셉</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TRIP_CONCEPTS.map((type) => (
              <Chip
                key={type.id}
                label={type.name}
                tone="badge"
                selected={selectedTripConcepts.includes(type.value)}
                onClick={() => toggleTripConcept(type.value)}
              />
            ))}
          </div>
        </div>

        {/* 이동 수단 */}
        <div className="mt-6">
          <SectionLabel className="mb-2.5">TRANSPORT · 이동 수단</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TRANSPORT_TYPES.map((type) => (
              <Chip
                key={type.id}
                label={type.name}
                selected={selectedTransports.includes(type.value)}
                onClick={() => toggleTransport(type.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 액션 */}
      <div className="fixed left-0 right-0 bottom-[68px] px-5 py-3.5 bg-[linear-gradient(to_top,var(--color-canvas)_65%,transparent)]">
        <div className="flex gap-2.5">
          <Button variant="secondary" className="w-24" onClick={clearAll}>
            초기화
          </Button>
          <Button className="flex-1" onClick={handleMakeTrip} disabled={isPending}>
            일정 만들기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MakePage;
