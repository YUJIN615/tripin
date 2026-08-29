/**
 * 지역 이름 → 세 자리 코드
 *
 * 보딩패스 컨셉에서 지역은 어디서나 같은 세 자리 코드로 반복됩니다.
 * (홈의 FROM/TO, 일정 카드, 검색 목록, 일정 번호까지 동일한 코드 사용)
 */
const REGION_CODES: Record<string, string> = {
  // 광역 단위 (mocks/data/regions.ts 기준)
  서울: "SEL",
  경기: "GGD",
  인천: "ICN",
  부산: "PUS",
  대구: "TAE",
  광주: "KWJ",
  대전: "TJN",
  울산: "USN",
  세종: "SJG",
  강원: "GWD",
  충북: "CHB",
  충남: "CHN",
  전북: "JEB",
  전남: "JEN",
  경북: "GYB",
  경남: "GYN",
  제주: "CJU",

  // 자주 쓰는 도시 단위
  강릉: "GNG",
  속초: "SCH",
  여수: "YSU",
  경주: "GJU",
  제주시: "CJU",
  서귀포: "SGP",
  전주: "JJU",
  안동: "ADG",
  통영: "TYG",
  포항: "KPO",
  춘천: "CHC",
  가평: "GPY",
  남해: "NHE",
  양양: "YNY",
};

/** 출발지 기본값 — 아직 출발지 입력이 없으므로 서울을 기준으로 둡니다. */
export const ORIGIN_REGION_CODE = "SEL";

/** 코드를 만들 수 없을 때 쓰는 값 */
const FALLBACK_CODE = "TRP";

/**
 * 지역 이름을 세 자리 코드로 변환
 * @param name - 지역 이름 (예: "강릉")
 * @returns 세 자리 대문자 코드 (예: "GNG")
 */
export const getRegionCode = (name?: string | null): string => {
  const region = name?.trim();
  if (!region) return FALLBACK_CODE;

  // 1. 정확히 일치
  if (REGION_CODES[region]) return REGION_CODES[region];

  // 2. "강원 강릉"처럼 다른 표기를 포함하는 경우
  const matched = Object.keys(REGION_CODES).find((key) => region.includes(key));
  if (matched) return REGION_CODES[matched];

  // 3. 영문 이름이면 앞 세 글자
  const ascii = region.replace(/[^a-zA-Z]/g, "");
  if (ascii.length >= 3) return ascii.slice(0, 3).toUpperCase();

  return FALLBACK_CODE;
};
