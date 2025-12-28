import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("🚀 [API Route] GET /api/plans/[id] 호출됨");
  console.log("🚀 [API Route] id:", id);
  return NextResponse.json({ success: true, id });
}
