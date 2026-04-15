import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
        <span className="text-2xl font-black text-passion-500 tracking-tight">
          PassionPlay
        </span>
        <Link
          href="/sign-in"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Connexion
        </Link>
      </header>

      {/* Hero */}
      <section className="page-container pt-12 pb-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            Vis ta passion.
            <br />
            <span className="text-passion-500">Pas que la rêver.</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Des moments intenses, en petit groupe, guidés par des passionnés
            qui maîtrisent leur sujet. Entre 13€ et 20€. Une heure.
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <Link href="/explore" className="btn-primary text-center">
              Trouver un moment →
            </Link>
            <Link href="/sign-up" className="btn-secondary text-center">
              Je suis coach, je veux créer une session
            </Link>
          </div>
        </div>
      </section>

      {/* Types de sessions */}
      <section className="page-container pt-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Deux façons de vivre ta passion
          </h2>

          <div className="bg-discovery-light rounded-2xl p-5 space-y-2">
            <span className="badge-discovery">🟢 Découverte</span>
            <p className="text-gray-800 font-medium">
              Tu n&apos;as jamais essayé. Tu veux ressentir pour la première fois.
            </p>
            <p className="text-gray-600 text-sm">
              Aucun prérequis. Juste l&apos;envie.
            </p>
          </div>

          <div className="bg-progression-light rounded-2xl p-5 space-y-2">
            <span className="badge-progression">🔵 Progression</span>
            <p className="text-gray-800 font-medium">
              Tu pratiques déjà. Tu veux débloquer un point précis.
            </p>
            <p className="text-gray-600 text-sm">
              Expert focalisé sur ta difficulté spécifique.
            </p>
          </div>
        </div>
      </section>

      {/* Exemples de sessions */}
      <section className="page-container pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Des exemples de moments
        </h2>
        <div className="space-y-3">
          {EXAMPLE_SESSIONS.map((s) => (
            <div
              key={s.title}
              className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">{s.title}</p>
                <p className="text-sm text-gray-500">{s.meta}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-passion-500">{s.price}</p>
                <p className="text-xs text-gray-400">{s.spots}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="page-container pt-16 pb-8 text-center text-sm text-gray-400">
        <p>PassionPlay © 2026</p>
      </footer>
    </main>
  );
}

const EXAMPLE_SESSIONS = [
  { title: "Défense au sol en MMA",      meta: "Paris 11e · Sam 10h",    price: "15 €", spots: "4 places" },
  { title: "Tir à 3 points en basket",   meta: "Lyon 3e · Dim 14h",      price: "18 €", spots: "7 places" },
  { title: "Contrôle orienté en foot",   meta: "Paris 20e · Jeu 19h",    price: "13 €", spots: "2 places" },
  { title: "Prise de parole en public",  meta: "Paris 9e · Sam 09h",     price: "20 €", spots: "10 places" },
];
