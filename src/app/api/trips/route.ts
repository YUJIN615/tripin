import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TripDayRequestType, TripActivityRequestType } from "@/types/trip";
import { convertTripResponse } from "@/utils/api/tripConvertor";

export async function POST(request: NextRequest) {
  console.log("🚀 [API Route] POST /api/trips 호출됨");

  try {
    const body = await request.json();
    console.log("📦 [API Route] 요청 바디:", body);
    const { region, date, personCount, tripTypes, transports, days } = body;

    const regionData = await prisma.region.findFirst({
      where: { name: region },
    });

    if (!regionData) {
      return NextResponse.json({ success: false, error: "Region not found" }, { status: 404 });
    }

    const trip = await prisma.trip.create({
      data: {
        region: region,
        startDate: date.from,
        endDate: date.to,
        personCount: personCount,
        tripTypes: tripTypes,
        transports: transports,
        days: {
          create: days.map((day: TripDayRequestType) => ({
            date: day.date,
            activities: {
              create: day.activities.map((activity: TripActivityRequestType) => ({
                time: activity.time,
                activity: activity.activity,
                placeName: activity.placeName,
                roadAddressName: activity.roadAddressName,
                x: activity.x,
                y: activity.y,
                categoryName: activity.categoryName,
                categoryGroupCode: activity.categoryGroupCode,
                categoryGroupName: activity.categoryGroupName,
                phone: activity.phone || null,
                kakaoPlaceId: activity.id || "",
              })),
            },
          })),
        },
      },
    });

    if (!trip) {
      return NextResponse.json({ success: false, error: "Trip not created" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: trip });
  } catch (error) {
    console.error("❌ [API Route] 요청 실패:", error);
    return NextResponse.json({ success: false, error: "Failed to create trip" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  console.log("🚀 [API Route] GET /api/trips 호출됨");
  try {
    const result = await prisma.trip.findMany({
      include: {
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
    const trips = result.map((trip) => convertTripResponse(trip));
    return NextResponse.json({ success: true, data: trips });
  } catch (error) {
    console.error("❌ [API Route] trip list error:", error);
    return NextResponse.json({ success: false, error: "Failed to get plan list" }, { status: 500 });
  }
}
