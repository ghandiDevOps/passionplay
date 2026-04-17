import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = { title: "Nouvelle session · PassionPlay" };

export default async function NewSessionPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="px-4 pt-8 pb-24">
      <Link href="/sessions" className="text-sm text-gray-500 mb-6 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Créer une session</h1>
      <p className="text-gray-500 text-sm mb-8">
        Disponible très bientôt — Phase 2 du projet.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
        <p className="text-3xl mb-3">🔥</p>
        <p className="font-bold text-amber-900 mb-1">Fonctionnalité en cours de développement</p>
        <p className="text-sm text-amber-700">
          Le formulaire de création de session sera disponible dans la Phase 2.
          En attendant, <a href="mailto:hello@passionplay.fr" className="underline">contacte-nous</a> pour créer ta première session manuellement.
        </p>
      </div>
    </div>
  );
}
