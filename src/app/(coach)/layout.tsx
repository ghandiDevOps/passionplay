import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>

      {/* ── Header desktop ── */}
      <header className="hidden sm:block sticky top-0 z-40 backdrop-blur-sm border-b" style={{ backgroundColor: "var(--color-bg-nav)", borderColor: "var(--color-border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <LogoWordmark className="h-7 w-auto" style={{ filter: "var(--logo-filter)" }} />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard"    className="font-display-md text-xs transition-colors hover:text-[#FF7A00]" style={{ color: "var(--color-muted)" }}>DASHBOARD</Link>
            <Link href="/sessions"     className="font-display-md text-xs transition-colors hover:text-[#FF7A00]" style={{ color: "var(--color-muted)" }}>SESSIONS</Link>
            <Link href="/earnings"     className="font-display-md text-xs transition-colors hover:text-[#FF7A00]" style={{ color: "var(--color-muted)" }}>REVENUS</Link>
            <Link href="/sessions/new" className="btn-passion text-xs px-4 py-2 min-h-0">+ CRÉER</Link>
            <ThemeToggle />
          </nav>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* ── Mobile header ── */}
      <header className="sm:hidden sticky top-0 z-40 backdrop-blur-sm border-b" style={{ backgroundColor: "var(--color-bg-nav)", borderColor: "var(--color-border)" }}>
        <div className="px-4 h-12 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <LogoWordmark className="h-6 w-auto" style={{ filter: "var(--logo-filter)" }} />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
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
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t z-40" style={{ backgroundColor: "var(--color-bg-nav)", borderColor: "var(--color-border)" }}>
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
    <Link href={href} className="flex flex-col items-center gap-0.5 px-5 py-1 hover:text-[#FF7A00] transition-colors" style={{ color: "var(--color-muted)" }}>
      <span className="text-base">{icon}</span>
      <span className="font-display-md text-[9px] tracking-wider">{label}</span>
    </Link>
  );
}
