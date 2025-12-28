import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("id", id);
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(id) },
      include: {
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
    if (!trip) {
      return NextResponse.json({ success: false, error: "Trip not found" }, { status: 404 });
    }
    const tripResponse = {
      id: trip.id,
      region: trip.region,
      startDate: trip.startDate,
      endDate: trip.endDate,
      personCount: trip.personCount,
      tripTypes: trip.tripTypes,
      transports: trip.transports,
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
          phone: activity.phone,
          id: activity.kakaoPlaceId,
        })),
      })),
    };
    return NextResponse.json({ success: true, data: tripResponse });
  } catch (error) {
    console.error("❌ [API Route] Trip detail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get trip detail" },
      { status: 500 }
    );
  }
}
