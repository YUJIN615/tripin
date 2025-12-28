import { TRIP_PLACES, TRANSPORT_TYPES } from "@/constants";

/**
 * 여행 타입 value 배열을 name 문자열로 변환
 * @param values - 여행 타입 value 배열 (예: ["food", "cafe"])
 * @returns 이름 문자열 (예: "맛집, 카페")
 */
export const getTripTypeNames = (values: string[]): string => {
  return values
    .map((value) => TRIP_PLACES.find((type) => type.value === value.trim())?.name)
    .filter(Boolean)
    .join(", ");
};

/**
 * 이동 수단 value 배열을 name 문자열로 변환
 * @param values - 이동 수단 value 배열 (예: ["public", "car"])
 * @returns 이름 문자열 (예: "대중교통, 자차")
 */
export const getTransportTypeNames = (values: string[]): string => {
  return values
    .map((value) => TRANSPORT_TYPES.find((type) => type.value === value.trim())?.name)
    .filter(Boolean)
    .join(", ");
};

/**
 * 단일 여행 타입 value를 name으로 변환
 * @param value - 여행 타입 value (예: "food")
 * @returns 이름 (예: "맛집") 또는 undefined
 */
export const getTripTypeName = (value: string): string | undefined => {
  return TRIP_PLACES.find((type) => type.value === value.trim())?.name;
};

/**
 * 단일 이동 수단 value를 name으로 변환
 * @param value - 이동 수단 value (예: "public")
 * @returns 이름 (예: "대중교통") 또는 undefined
 */
export const getTransportTypeName = (value: string): string | undefined => {
  return TRANSPORT_TYPES.find((type) => type.value === value.trim())?.name;
};
