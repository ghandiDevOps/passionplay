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
          <MobileNavItem href="/dashboard" label="Dashboard" icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          }/>
          <MobileNavItem href="/sessions" label="Sessions" icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }/>
          <MobileNavItem href="/earnings" label="Revenus" icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          }/>
        </div>
      </nav>

    </div>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-5 py-1 hover:text-[#FF7A00] transition-colors duration-200 cursor-pointer" style={{ color: "var(--color-muted)" }}>
      {icon}
      <span className="font-display-md text-[9px] tracking-wider">{label}</span>
    </Link>
  );
}
