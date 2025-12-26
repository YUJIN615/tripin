import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";

  try {
    const regions = await prisma.region.findMany({
      where: keyword
        ? {
            name: {
              contains: keyword,
            },
          }
        : undefined,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch regions" }, { status: 500 });
  }
}