import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-6">😶‍🌫️</p>
      <h1 className="text-2xl font-black text-gray-900 mb-2">
        Page introuvable
      </h1>
      <p className="text-gray-500 mb-8">
        Cette page n&apos;existe pas ou a été supprimée.
      </p>
      <Link href="/" className="btn-primary inline-block px-8">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
