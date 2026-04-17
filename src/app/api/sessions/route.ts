import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/sessions/create-session";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user) return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 403 });
  if (!user.coachProfile) return NextResponse.json({ error: "COACH_PROFILE_NOT_FOUND" }, { status: 403 });

  try {
    const session = await createSession(body as Parameters<typeof createSession>[0], user.coachProfile.id);
    return NextResponse.json({ session }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "UNKNOWN_ERROR";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
