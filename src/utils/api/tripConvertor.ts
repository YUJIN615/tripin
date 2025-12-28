import { Prisma } from "@prisma/client";
import { TripResponseType } from "@/types/trip";

// Prisma에서 include된 관계까지 포함한 타입 생성
  type TripWithRelations = Prisma.TripGetPayload<{
  include: {
    days: {
      include: {
        activities: true;
      };
    };
  };
}>;

/**
 * Prisma Trip 타입을 TripResponseType으로 변환하는 함수
 */
export const convertTripResponse = (trip: TripWithRelations): TripResponseType => {
  // tripTypes와 transports가 JSON 문자열일 수 있으므로 배열로 변환
  const tripTypes = Array.isArray(trip.tripTypes)
    ? trip.tripTypes
    : typeof trip.tripTypes === "string"
      ? JSON.parse(trip.tripTypes)
      : [];

  const transports = Array.isArray(trip.transports)
    ? trip.transports
    : typeof trip.transports === "string"
      ? JSON.parse(trip.transports)
      : [];

  return {
    id: trip.id.toString(),
    region: trip.region,
    startDate: trip.startDate,
    endDate: trip.endDate,
    personCount: trip.personCount,
    tripTypes,
    transports,
    days: trip.days.map((day) => ({
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
