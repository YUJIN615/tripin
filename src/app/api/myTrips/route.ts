import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { convertTripResponse } from "@/utils/api/tripConvertor";

export async function POST(request: NextRequest) {
  console.log("🚀 [API Route] POST /api/myTrips 호출됨");

  try {
    const body = await request.json();
    console.log("📦 [API Route] 요청 바디:", body);
    const { tripId } = body;

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
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

    await prisma.myTrip.create({
      data: {
        tripId: tripId,
      },
    });

    return NextResponse.json({ success: true, data: convertTripResponse(trip) });
  } catch (error) {
    console.error("❌ [API Route] 요청 실패:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create my trip" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log("🚀 [API Route] GET /api/myTrips 호출됨");
  try {

    const myTrips = await prisma.myTrip.findMany();
    const result = await prisma.trip.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        id: {
          in: myTrips.map((myTrip) => myTrip.tripId),
        },
      },
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
    console.error("❌ [API Route] my trip list error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get my trip list" },
      { status: 500 }
    );
  }
}
