import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { convertTripResponse } from "@/utils/api/tripConvertor";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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
    const tripResponse = convertTripResponse(trip);
    return NextResponse.json({ success: true, data: tripResponse });
  } catch (error) {
    console.error("❌ [API Route] Trip detail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get trip detail" },
      { status: 500 }
    );
  }
}
