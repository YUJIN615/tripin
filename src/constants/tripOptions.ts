// 여행 장소 옵션
export const TRIP_PLACES = [
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
    name: "자연",
    value: "nature",
  },
  {
    id: 4,
    name: "체험",
    value: "experience",
  },
  {
    id: 5,
    name: "문화",
    value: "culture",
  },
  {
    id: 6,
    name: "쇼핑",
    value: "shopping",
  },
] as const;

// 여행 테마 옵션
export const TRIP_THEMES = [
  {
    id: 1,
    name: "감성적인",
    value: "sensitive",
  },
  {
    id: 2,
    name: "활동적인",
    value: "active",
  },
  {
    id: 3,
    name: "인기있는",
    value: "popular",
  },
  {
    id: 4,
    name: "휴식적인",
    value: "rest",
  },
  {
    id: 5,
    name: "사진찍기 좋은",
    value: "photo",
  },
  {
    id: 6,
    name: "가족적인",
    value: "family",
  },
  {
    id: 7,
    name: "친구와의",
    value: "friend",
  },
  {
    id: 8,
    name: "연인과의",
    value: "couple",
  },
  {
    id: 9,
    name: "혼자의",
    value: "solo",
  },
];

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
export type TripType = (typeof TRIP_PLACES)[number];
export type TransportType = (typeof TRANSPORT_TYPES)[number];
