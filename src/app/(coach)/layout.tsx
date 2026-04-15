import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Coach */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-black text-passion-500">
            PassionPlay
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-600">
              <Link href="/dashboard"  className="hover:text-gray-900">Dashboard</Link>
              <Link href="/sessions"   className="hover:text-gray-900">Sessions</Link>
              <Link href="/earnings"   className="hover:text-gray-900">Revenus</Link>
            </nav>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 pb-safe">
        <div className="flex items-center justify-around py-2">
          <NavItem href="/dashboard"      icon="🏠" label="Dashboard" />
          <NavItem href="/sessions/new"   icon="➕" label="Créer"     />
          <NavItem href="/sessions"       icon="📋" label="Sessions"  />
          <NavItem href="/earnings"       icon="💰" label="Revenus"   />
        </div>
      </nav>

      {/* Contenu */}
      <main className="max-w-lg mx-auto pb-24 sm:pb-8">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-4 py-1 text-gray-500 hover:text-passion-500"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
