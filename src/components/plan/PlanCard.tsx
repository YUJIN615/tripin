import { getTripTypeNames, getTransportTypeNames } from "@/utils/tripUtils";

export interface PlanCardProps {
  region: string;
  startDate: string;
  endDate: string;
  personCount: number;
  tripTypes: string[];
  transports: string[];
}

export const PlanCard = (item: PlanCardProps) => {
  const { region, startDate, endDate, personCount, tripTypes, transports } = item;
  return (
    <div className="px-2">
      <div className="text-base font-bold text-gray-700 mb-1">{region}</div>
      <div className="text-sm text-gray-700 mb-1">
        날짜: {new Date(startDate).toLocaleDateString()} ~ {new Date(endDate).toLocaleDateString()}
      </div>
      <div className="text-sm text-gray-700 mb-1">인원: {personCount}명</div>
      <div className="text-sm text-gray-700 mb-1">여행 컨셉: {getTripTypeNames(tripTypes)}</div>
      <div className="text-sm text-gray-700">이동 수단: {getTransportTypeNames(transports)}</div>
    </div>
  );
};
