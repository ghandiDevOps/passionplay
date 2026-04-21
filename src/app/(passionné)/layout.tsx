import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function PassionneLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-sm border-b" style={{ backgroundColor: "var(--color-bg-nav)", borderColor: "var(--color-border)" }}>
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <LogoWordmark className="h-7 w-auto" style={{ filter: "var(--logo-filter)" }} />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore" className="font-display-md text-xs transition-colors hover:text-white hidden sm:block" style={{ color: "var(--color-muted)" }}>
              SESSIONS
            </Link>
            <Link href="/my/bookings" className="font-display-md text-xs transition-colors hover:text-[#FF7A00]" style={{ color: "var(--color-muted)" }}>
              MES BILLETS
            </Link>
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="max-w-lg mx-auto px-4 py-8 pb-24">
        {children}
      </main>

    </div>
  );
}
