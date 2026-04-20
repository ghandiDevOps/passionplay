import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Appelé après connexion — redirige vers le bon espace selon le rôle
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  const user = await db.user.findUnique({
    where:  { clerkId: userId },
    select: { role: true },
  });

  if (user?.role === "coach") {
    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  }

  return NextResponse.redirect(new URL("/my", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}
