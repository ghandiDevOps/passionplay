import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = { title: "Mes sessions · PassionPlay" };

export default async function SessionsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="px-4 pt-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-900">Mes sessions</h1>
        <Link
          href="/sessions/new"
          className="text-sm font-bold text-white px-4 py-2 rounded-xl"
          style={{ background: "linear-gradient(90deg, #FFB700, #FF3D00)" }}
        >
          + Créer
        </Link>
      </div>

      {/* Placeholder — Phase 2 */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
        <p className="text-4xl mb-4">📋</p>
        <p className="font-bold text-gray-900 mb-2">Aucune session pour l&apos;instant</p>
        <p className="text-sm text-gray-500 mb-6">
          Crée ta première session en 5 minutes et commence à recevoir des réservations.
        </p>
        <Link
          href="/sessions/new"
          className="inline-block text-sm font-bold text-white px-6 py-3 rounded-xl"
          style={{ background: "linear-gradient(90deg, #FFB700, #FF3D00)" }}
        >
          Créer une session →
        </Link>
      </div>
    </div>
  );
}
