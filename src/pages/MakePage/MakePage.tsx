"use client";
import { useState } from "react";
import Link from "next/link";
import { DateRange, DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { Layout } from "@/components/common/Layout";
import { TRIP_TYPES, PERSON_COUNT, TRANSPORT_TYPES } from "@/constants";
import "react-day-picker/style.css";

export const MakePage = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [range, setRange] = useState<DateRange>();
  const [personCount, setPersonCount] = useState<number>(PERSON_COUNT.DEFAULT);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);

  // 여행 타입 토글 함수
  const toggleTripType = (value: string) => {
    setSelectedTripTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 이동 수단 토글 함수
  const toggleTransport = (value: string) => {
    setSelectedTransports((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Layout title="새 일정">
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">장소</h3>
        <Link
          href="/search"
          className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 p-3 bg-white"
        >
          <div className="text-sm text-gray-400">장소를 입력해주세요.</div>
        </Link>
      </div>
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">날짜</h3>
        <div
          className="flex items-center gap-2 h-12 cursor-pointer border border-gray-300 rounded-xl px-3 text-sm text-gray-700 placeholder:text-gray-400"
          onClick={() => setIsOpenCalendar((prev) => !prev)}
        >
          {range ? (
            <div className="flex items-center gap-2">
              <div className="text-gray-700">{range?.from?.toLocaleDateString()}</div>
              <div>~</div>
              <div className="text-gray-700">{range?.to?.toLocaleDateString()}</div>
            </div>
          ) : (
            <div className="text-gray-400">날짜를 선택해주세요.</div>
          )}
        </div>
        {isOpenCalendar && (
          <DayPicker animate mode="range" selected={range} onSelect={setRange} locale={ko} />
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
      <div className="flex items-center justify-between gap-2 pt-4 pb-8">
        <button className="w-2/6 h-12 bg-gray-200 text-gray-600 rounded-xl text-sm">초기화</button>
        <button className="w-4/6 h-12 bg-blue-500 text-white rounded-xl text-sm">검색</button>
      </div>
    </Layout>
  );
};

export default MakePage;
