import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { convertPlanResponse } from "@/utils/api/planConvertor";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const plan = await prisma.plan.findUnique({
      where: { id: parseInt(id) },
      include: {
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
    if (!plan) {
      return NextResponse.json({ success: false, error: "Plan not found" }, { status: 404 });
    }
    const planResponse = convertPlanResponse(plan);
    return NextResponse.json({ success: true, data: planResponse });
  } catch (error) {
    console.error("❌ [API Route] Plan detail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get plan detail" },
      { status: 500 }
    );
  }
}
