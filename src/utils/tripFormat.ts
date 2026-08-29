import { getRegionCode } from "./regionCode";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

const toDate = (value: string | Date): Date => (value instanceof Date ? value : new Date(value));

/** 시/분/초를 버린 자정 기준 날짜 */
const startOfDay = (value: string | Date): Date => {
  const date = toDate(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 월.일 표기
 * @example formatMonthDay("2026-10-03") // "10.03"
 */
export const formatMonthDay = (value: string | Date): string => {
  const date = toDate(value);
  return `${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

/**
 * 보딩패스 DATE 칸 표기 (en dash 사용)
 * @example formatDateRange("2026-10-03", "2026-10-05") // "10.03 – 10.05"
 */
export const formatDateRange = (start?: string | Date, end?: string | Date): string => {
  if (!start) return "";
  if (!end) return formatMonthDay(start);
  return `${formatMonthDay(start)} – ${formatMonthDay(end)}`;
};

/**
 * 일정 상세의 날짜 라벨
 * @example formatFullDate("2026-10-03") // "2026-10-03"
 */
export const formatFullDate = (value: string | Date): string => {
  const date = toDate(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/**
 * 홈 헤더의 오늘 날짜
 * @example formatToday(new Date()) // "2026.08.29 THU"
 */
export const formatToday = (value: string | Date = new Date()): string => {
  const date = toDate(value);
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${WEEKDAYS[date.getDay()]}`;
};

/**
 * 출발일까지 남은 일수 (지난 일정은 음수)
 */
export const getDaysUntil = (start: string | Date, from: string | Date = new Date()): number => {
  return Math.round((startOfDay(start).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);
};

/**
 * 보딩패스 배지 문구
 * @example getDDayLabel("2026-10-03") // "D-12" · 당일이면 "D-DAY" · 지난 일정이면 "완료"
 */
export const getDDayLabel = (start?: string | Date, end?: string | Date): string => {
  if (!start) return "";
  const days = getDaysUntil(start);
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  // 여행 기간 중이면 진행 중으로 본다
  if (end && getDaysUntil(end) >= 0) return "TRAVELING";
  return "완료";
};

/** 지난 일정 여부 */
export const isPastTrip = (end?: string | Date): boolean => {
  if (!end) return false;
  return getDaysUntil(end) < 0;
};

/**
 * 숙박 표기
 * @example getStayLabel("2026-10-03", "2026-10-05") // "2박 3일"
 */
export const getStayLabel = (start?: string | Date, end?: string | Date): string => {
  if (!start || !end) return "";
  const nights = Math.max(
    0,
    Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / MS_PER_DAY)
  );
  return nights === 0 ? "당일치기" : `${nights}박 ${nights + 1}일`;
};

/**
 * 일정 번호 — 보딩패스의 PLAN NO.
 * @example getPlanNo("413", "강릉") // "TRP-0413-GNG"
 */
export const getPlanNo = (id: string | number, region?: string): string => {
  const digits = String(id).replace(/\D/g, "");
  const serial = (digits || String(id)).slice(-4).padStart(4, "0");
  return `TRP-${serial}-${getRegionCode(region)}`;
};
