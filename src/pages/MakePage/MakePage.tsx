"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DateRange, DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { useMakeStore } from "@/stores/makeStore";
import { useMakeTrip } from "@/hooks/useMakeTrip";
import { Layout } from "@/components/common/Layout";
import { hasValue } from "@/utils/common";
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
          console.log("✅ 일정 생성 성공:", data);
          // Zustand 스토어에도 저장 (선택사항)
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

  return (
    <Layout title="새 일정">
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">지역</h3>
        <Link
          href="/search"
          className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 p-3 bg-white"
        >
          <div className={`text-sm ${hasValue(region) ? "text-gray-700" : "text-gray-400"}`}>
            {hasValue(region) ? region : "지역을 입력해주세요."}
          </div>
        </Link>
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">날짜</h3>
        <div
          ref={calendarContainerRef}
          className="flex items-center gap-2 h-12 cursor-pointer border border-gray-300 rounded-xl px-3 text-sm text-gray-700 placeholder:text-gray-400"
          onClick={toggleCalendar}
        >
          {date ? (
            <div className="flex items-center gap-2">
              <div className="text-gray-700">{date?.from?.toLocaleDateString()}</div>
              <div>~</div>
              <div className="text-gray-700">{date?.to?.toLocaleDateString()}</div>
            </div>
          ) : (
            <div className="text-gray-400">날짜를 선택해주세요.</div>
          )}
        </div>
        {isOpenCalendar && (
          <div ref={calendarRef} className="mt-2">
            <DayPicker
              mode="range"
              selected={date}
              onSelect={(value) => selectDate(value)}
              locale={ko}
            />
          </div>
        )}
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">인원</h3>
        <div className="mb-2 text-base font-bold text-gray-700">
          {personCount}명 {personCount === PERSON_COUNT.MAX && "이상"}
        </div>
        <input
          type="range"
          min={PERSON_COUNT.MIN}
          max={PERSON_COUNT.MAX}
          value={personCount}
          onChange={(e) => setPersonCount(parseInt(e.target.value))}
          className="w-full h-2 range-custom"
        />
        <div className="flex items-center justify-between mt-1 text-[12px] text-gray-600">
          <div>{PERSON_COUNT.MIN}</div>
          <div>{PERSON_COUNT.MAX}명 이상</div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">여행 장소</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {TRIP_PLACES.map((type) => (
            <div key={type.id}>
              <input
                type="checkbox"
                id={type.value}
                name="type"
                className="peer hidden"
                checked={selectedTripPlaces.includes(type.value)}
                onChange={() => toggleTripType(type.value)}
              />
              <label
                htmlFor={type.value}
                className="inline-block px-3 py-1.5 text-sm rounded-3xl border border-gray-300 text-gray-600 cursor-pointer transition-all hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">여행 컨셉</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {TRIP_CONCEPTS.map((type) => (
            <div key={type.id}>
              <input
                type="checkbox"
                id={type.value}
                name="concept"
                className="peer hidden"
                checked={selectedTripConcepts.includes(type.value)}
                onChange={() => toggleTripConcept(type.value)}
              />
              <label
                htmlFor={type.value}
                className="inline-block px-3 py-1.5 text-sm rounded-3xl border border-gray-300 text-gray-600 cursor-pointer transition-all hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">이동 수단</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {TRANSPORT_TYPES.map((type) => (
            <div key={type.id}>
              <input
                type="checkbox"
                id={type.value}
                name="transport"
                className="peer hidden"
                checked={selectedTransports.includes(type.value)}
                onChange={() => toggleTransport(type.value)}
              />
              <label
                htmlFor={type.value}
                className="inline-block px-3 py-1.5 text-sm rounded-3xl border border-gray-300 text-gray-600 cursor-pointer transition-all hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pt-4 pb-4">
        <button
          className="w-2/6 h-12 bg-gray-200 text-gray-600 rounded-xl text-sm font-bold"
          onClick={clearAll}
        >
          초기화
        </button>
        <button
          className="w-4/6 h-12 bg-blue-500 text-white rounded-xl text-sm font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleMakeTrip}
          disabled={isPending}
        >
          {isPending ? "생성 중..." : "일정 만들기"}
        </button>
      </div>
    </Layout>
  );
};

export default MakePage;
