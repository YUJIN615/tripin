import axios from "axios";

// 환경에 따라 API 베이스 URL 결정
const getApiBaseUrl = () => {
  // 개발 환경: Next.js API Route 사용 (CORS 우회)
  if (process.env.NODE_ENV === "development") {
    return ""; // 상대 경로 (/api/trips)
  }

  // 프로덕션 환경: 실제 백엔드 서버 사용
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
};

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// API 엔드포인트 설정
export const API_ENDPOINTS = {
  trips: "/api/trips",
  regions: "/api/regions",
  // 추가 엔드포인트들...
};
