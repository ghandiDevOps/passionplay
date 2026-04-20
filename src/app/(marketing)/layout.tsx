import Link from "next/link";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

async function getUserRole(userId: string | null) {
  if (!userId) return null;
  try {
    const user = await db.user.findUnique({
      where:  { clerkId: userId },
      select: { role: true },
    });
    return user?.role ?? null;
  } catch {
    return null;
  }
}

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const role = await getUserRole(userId ?? null);

  const isCoach       = role === "coach";
  const isParticipant = role === "participant";
  const isSignedIn    = !!userId;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <LogoWordmark className="h-8 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="font-display-md text-sm text-[#888] hover:text-white transition-colors">
              SESSIONS
            </Link>

            {!isSignedIn && (
              <>
                <Link href="/sign-in" className="font-display-md text-sm text-[#888] hover:text-white transition-colors">
                  CONNEXION
                </Link>
                <Link href="/sign-up" className="btn-passion text-sm px-5 py-2.5 min-h-0">
                  DEVENIR COACH
                </Link>
              </>
            )}

            {isCoach && (
              <Link href="/dashboard" className="btn-passion text-sm px-5 py-2.5 min-h-0">
                MON ESPACE COACH
              </Link>
            )}

            {isParticipant && (
              <Link href="/my" className="btn-passion text-sm px-5 py-2.5 min-h-0">
                MES BILLETS
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            {!isSignedIn && (
              <>
                <Link href="/sign-in" className="font-display-md text-xs text-[#888]">CONNEXION</Link>
                <Link href="/sign-up" className="btn-passion text-xs px-3 py-2 min-h-0">COACH</Link>
              </>
            )}
            {isCoach && (
              <Link href="/dashboard" className="btn-passion text-xs px-3 py-2 min-h-0">MON ESPACE</Link>
            )}
            {isParticipant && (
              <Link href="/my" className="btn-passion text-xs px-3 py-2 min-h-0">MES BILLETS</Link>
            )}
          </div>

        </div>
      </nav>
      {children}
    </>
  );
}
