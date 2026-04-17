import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { SessionForm } from "@/components/session/session-form";

export const metadata = { title: "Nouvelle session · PassionPlay" };

export default async function NewSessionPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user?.coachProfile) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <p className="font-display text-4xl text-white mb-3">PROFIL INCOMPLET</p>
          <p className="text-[#666] text-sm font-sans mb-6">
            Tu dois d&apos;abord finaliser ton profil coach avant de créer une session.
          </p>
          <Link href="/onboarding" className="btn-passion px-8">
            COMPLÉTER MON PROFIL
          </Link>
        </div>
      </div>
    );
  }

  return <SessionForm />;
}
