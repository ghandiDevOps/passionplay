"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Passion Spark Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-1 h-12 bg-[#FF7A00] mx-auto mb-8" />
      <p className="font-display text-5xl text-[#FF7A00] mb-4">ERREUR</p>
      <h1 className="font-display text-3xl text-white mb-2">
        QUELQUE CHOSE A PLANTÉ
      </h1>
      <p className="text-[#555] mb-8 text-sm max-w-sm">
        Une erreur inattendue s&apos;est produite. Tu peux réessayer ou revenir à l&apos;accueil.
      </p>
      {error.digest && (
        <p className="text-[#333] text-xs font-mono mb-6">
          ref: {error.digest}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={reset} className="btn-passion px-8">
          RÉESSAYER
        </button>
        <Link href="/" className="btn-passion-outline px-8">
          ACCUEIL
        </Link>
      </div>
    </main>
  );
}
