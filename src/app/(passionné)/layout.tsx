import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default async function PassionneLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#1a1a1a]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/PassionPlay_logoavectext_svg.svg"
              alt="PassionPlay"
              width={120}
              height={41}
              className="h-7 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/explore" className="font-display-md text-xs text-[#888] hover:text-white transition-colors hidden sm:block">
              SESSIONS
            </Link>
            <Link href="/my/bookings" className="font-display-md text-xs text-[#888] hover:text-[#FF7A00] transition-colors">
              MES BILLETS
            </Link>
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
