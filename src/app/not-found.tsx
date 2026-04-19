import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-1 h-12 bg-[#FF7A00] mx-auto mb-8" />
      <p className="font-display text-6xl text-[#FF7A00] mb-4">404</p>
      <h1 className="font-display text-3xl text-white mb-2">
        PAGE INTROUVABLE
      </h1>
      <p className="text-[#555] mb-8 text-sm">
        Cette page n&apos;existe pas ou a été supprimée.
      </p>
      <Link href="/" className="btn-passion px-8">
        RETOUR À L&apos;ACCUEIL
      </Link>
    </main>
  );
}
