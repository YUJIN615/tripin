import { Prisma } from "@prisma/client";
import { PlanResponseType } from "@/types/plan";

// Prisma에서 include된 관계까지 포함한 타입 생성
type PlanWithRelations = Prisma.PlanGetPayload<{
  include: {
    days: {
      include: {
        activities: true;
      };
    };
  };
}>;

/**
 * Prisma Plan 타입을 PlanResponseType으로 변환하는 함수
 */
export const convertPlanResponse = (plan: PlanWithRelations): PlanResponseType => {
  // tripTypes와 transports가 JSON 문자열일 수 있으므로 배열로 변환
  const tripTypes = Array.isArray(plan.tripTypes)
    ? plan.tripTypes
    : typeof plan.tripTypes === "string"
      ? JSON.parse(plan.tripTypes)
      : [];

  const transports = Array.isArray(plan.transports)
    ? plan.transports
    : typeof plan.transports === "string"
      ? JSON.parse(plan.transports)
      : [];

  return {
    id: plan.id.toString(),
    region: plan.region,
    startDate: plan.startDate,
    endDate: plan.endDate,
    personCount: plan.personCount,
    tripTypes,
    transports,
    days: plan.days.map((day) => ({
      date: day.date,
      activities: day.activities.map((activity) => ({
        time: activity.time,
        activity: activity.activity,
        placeName: activity.placeName,
        roadAddressName: activity.roadAddressName,
        x: activity.x,
        y: activity.y,
        categoryName: activity.categoryName,
        categoryGroupCode: activity.categoryGroupCode,
        categoryGroupName: activity.categoryGroupName,
        phone: activity.phone || "",
        id: activity.kakaoPlaceId,
      })),
    })),
  };
};
