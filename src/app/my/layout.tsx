import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="font-display text-lg text-white hover:text-[#FF7A00] transition-colors">
            PASSIONPLAY
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 py-8 pb-24">
        {children}
      </main>
    </div>
  );
}
