import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#111]">

      {/* ── Header desktop ── */}
      <header className="hidden sm:block sticky top-0 z-40 bg-[#111]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/PassionPlay_logoavectext_svg.svg"
              alt="PassionPlay"
              width={130}
              height={45}
              className="h-7 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard"    className="font-display-md text-xs text-[#555] hover:text-white transition-colors">DASHBOARD</Link>
            <Link href="/sessions"     className="font-display-md text-xs text-[#555] hover:text-white transition-colors">SESSIONS</Link>
            <Link href="/earnings"     className="font-display-md text-xs text-[#555] hover:text-white transition-colors">REVENUS</Link>
            <Link href="/sessions/new" className="btn-passion text-xs px-4 py-2 min-h-0">+ CRÉER</Link>
          </nav>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* ── Mobile header ── */}
      <header className="sm:hidden sticky top-0 z-40 bg-[#111]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="px-4 h-12 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/PassionPlay_logoavectext_svg.svg"
              alt="PassionPlay"
              width={110}
              height={38}
              className="h-6 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sessions/new" className="btn-passion text-xs px-3 py-1.5 min-h-0">+ CRÉER</Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="max-w-5xl mx-auto pb-24 sm:pb-8">
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#111]/95 backdrop-blur-sm border-t border-[#2a2a2a] z-40">
        <div className="flex items-center justify-around py-2">
          <MobileNavItem href="/dashboard"  icon="▦" label="Dashboard" />
          <MobileNavItem href="/sessions"   icon="◈" label="Sessions"  />
          <MobileNavItem href="/earnings"   icon="◎" label="Revenus"   />
        </div>
      </nav>

    </div>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-5 py-1 text-[#555] hover:text-[#FF7A00] transition-colors">
      <span className="text-base">{icon}</span>
      <span className="font-display-md text-[9px] tracking-wider">{label}</span>
    </Link>
  );
}
