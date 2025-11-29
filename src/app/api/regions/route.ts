import { REGIONS } from "@/mocks/data/regions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";

  const filtered = keyword ? REGIONS.filter((region) => region.name.includes(keyword)) : REGIONS;

  return NextResponse.json(filtered);
}