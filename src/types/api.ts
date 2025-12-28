/**
 * 공통 API 응답 타입
 * 모든 API 응답은 success와 data 필드를 가집니다.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

