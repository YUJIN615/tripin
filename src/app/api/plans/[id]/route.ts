import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("🚀 [API Route] GET /api/plans/[id] 호출됨", request.nextUrl.pathname);
  const id = request.nextUrl.pathname.split("/").pop();
  console.log("🚀 [API Route] id:", id);
  return NextResponse.json({ success: true, id: id });
}
