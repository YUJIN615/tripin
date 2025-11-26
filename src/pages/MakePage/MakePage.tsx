"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { useMakeStore } from "@/stores/makeStore";
import { Layout } from "@/components/common/Layout";
import { hasValue } from "@/utils/common";
import { TRIP_TYPES, PERSON_COUNT, TRANSPORT_TYPES } from "@/constants";
import "react-day-picker/style.css";

export const MakePage = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const region = useMakeStore((state) => state.region);
  const date = useMakeStore((state) => state.date);
  const personCount = useMakeStore((state) => state.personCount);
  const selectedTripTypes = useMakeStore((state) => state.selectedTripTypes);
  const selectedTransports = useMakeStore((state) => state.selectedTransports);

  const setDate = useMakeStore((state) => state.setDate);
  const setPersonCount = useMakeStore((state) => state.setPersonCount);
  const setSelectedTripTypes = useMakeStore((state) => state.setSelectedTripTypes);
  const setSelectedTransports = useMakeStore((state) => state.setSelectedTransports);

  const clearAll = useMakeStore((state) => state.clearAll);
  const makeTrip = useMakeStore((state) => state.makeTrip);

  // 여행 타입 토글 함수
  const toggleTripType = (value: string) => {
    setSelectedTripTypes(
      selectedTripTypes.includes(value)
        ? selectedTripTypes.filter((v) => v !== value)
        : [...selectedTripTypes, value]
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

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpenCalendar(false);
      }
    };

    if (isOpenCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCalendar]);

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, [clearAll]);

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
      <div ref={calendarRef} className="mb-8">
        <h3 className="text-base font-bold mb-3">날짜</h3>
        <div
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
          <div ref={calendarRef} className="mt-4">
            <DayPicker
              mode="range"
              selected={date}
              onSelect={(value) => setDate(value)}
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
        <h3 className="text-base font-bold mb-3">여행 컨셉</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {TRIP_TYPES.map((type) => (
            <div key={type.id}>
              <input
                type="checkbox"
                id={type.value}
                name="type"
                className="peer hidden"
                checked={selectedTripTypes.includes(type.value)}
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
          className="w-4/6 h-12 bg-blue-500 text-white rounded-xl text-sm font-bold"
          onClick={makeTrip}
        >
          일정 만들기
        </button>
      </div>
    </Layout>
  );
};

export default MakePage;
