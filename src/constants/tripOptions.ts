// 여행 타입 옵션
export const TRIP_TYPES = [
  {
    id: 1,
    name: "맛집",
    value: "food",
  },
  {
    id: 2,
    name: "카페",
    value: "cafe",
  },
  {
    id: 3,
    name: "관광",
    value: "sightseeing",
  },
  {
    id: 4,
    name: "액티비티",
    value: "activity",
  },
  {
    id: 5,
    name: "쇼핑",
    value: "shopping",
  },
  {
    id: 6,
    name: "문화",
    value: "culture",
  },
  {
    id: 7,
    name: "휴식",
    value: "rest",
  },
  {
    id: 8,
    name: "효도",
    value: "care",
  },
] as const;

// 인원 설정
export const PERSON_COUNT = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 1,
} as const;

// 이동 수단
export const TRANSPORT_TYPES = [
  {
    id: 1,
    name: "대중교통",
    value: "public",
  },
  {
    id: 2,
    name: "자차",
    value: "car",
  },
  {
    id: 3,
    name: "도보",
    value: "walk",
  },
  {
    id: 4,
    name: "자전거",
    value: "bicycle",
  },
] as const;

// 타입 정의
export type TripType = (typeof TRIP_TYPES)[number];
export type TransportType = (typeof TRANSPORT_TYPES)[number];
