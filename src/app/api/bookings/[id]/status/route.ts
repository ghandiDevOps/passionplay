import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const booking = await db.booking.findUnique({
    where: { id: params.id },
    select: { id: true, status: true, qrToken: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({ status: booking.status, qrToken: booking.qrToken });
}
