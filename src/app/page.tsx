import Link from "next/link";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/hero-bg-dVxv5vPepkvmyNwENCoZaU.webp";

const SESSIONS = [
  {
    id: "mma-frappe-defense",
    title: "Initiation MMA — Frappe & Défense",
    sport: "MMA",
    coach: { name: "Karim D.", rating: 4.9 },
    date: "Sam. 19 Avr · 10h00",
    city: "Paris 11e",
    price: 15,
    totalSpots: 15,
    remainingSpots: 4,
    type: "discover" as const,
    img: null,
  },
  {
    id: "padel-smash",
    title: "Padel — Maîtrise du Smash",
    sport: "Padel",
    coach: { name: "Sarah L.", rating: 4.8 },
    date: "Dim. 20 Avr · 14h00",
    city: "Paris 16e",
    price: 18,
    totalSpots: 12,
    remainingSpots: 7,
    type: "progress" as const,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-padel-Zdfd6iNhRVJu3HmS2Q2GTT.webp",
  },
  {
    id: "football-tir-finition",
    title: "Football — Tir & Finition",
    sport: "Football",
    coach: { name: "Samir B.", rating: 4.7 },
    date: "Jeu. 24 Avr · 19h00",
    city: "Lyon 3e",
    price: 13,
    totalSpots: 20,
    remainingSpots: 11,
    type: "discover" as const,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-football-BSe6zFB89d3eZdZuFucsFP.webp",
  },
  {
    id: "boxe-jab-crochet",
    title: "Boxe — Jab & Crochet Parfait",
    sport: "Boxe",
    coach: { name: "Leila M.", rating: 4.9 },
    date: "Sam. 26 Avr · 09h30",
    city: "Paris 20e",
    price: 17,
    totalSpots: 10,
    remainingSpots: 2,
    type: "progress" as const,
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-boxe-EQiqxzCpNe7HC86FY4bwkp.webp",
  },
  {
    id: "basket-3pts",
    title: "Basket — Tir à 3 Points",
    sport: "Basket",
    coach: { name: "Thomas R.", rating: 4.8 },
    date: "Dim. 27 Avr · 11h00",
    city: "Lyon 7e",
    price: 20,
    totalSpots: 12,
    remainingSpots: 5,
    type: "progress" as const,
    img: null,
  },
  {
    id: "mma-clinch",
    title: "MMA — Clinch & Projections",
    sport: "MMA",
    coach: { name: "Karim D.", rating: 4.9 },
    date: "Lun. 28 Avr · 19h00",
    city: "Paris 11e",
    price: 15,
    totalSpots: 10,
    remainingSpots: 8,
    type: "progress" as const,
    img: null,
  },
];

const TICKER_ITEMS = [
  { n: "127+", l: "SESSIONS" },
  { n: "2K+",  l: "PASSIONNÉS" },
  { n: "14",   l: "VILLES" },
  { n: "4.9★", l: "NOTE MOYENNE" },
  { n: "70%",  l: "REVENUS COACH" },
  { n: "30s",  l: "POUR RÉSERVER" },
];

const SPORTS = ["Tous", "Football", "Basket", "MMA", "Padel", "Boxe", "Tennis", "Yoga"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-white hover:text-[#FF7A00] transition-colors duration-120 shrink-0">
            PASSIONPLAY
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="font-display-md text-sm text-[#888] hover:text-white transition-colors">SESSIONS</Link>
            <Link href="/sign-in" className="font-display-md text-sm text-[#888] hover:text-white transition-colors">CONNEXION</Link>
            <Link href="/sign-up" className="btn-passion text-sm px-5 py-2.5 min-h-0">DEVENIR COACH</Link>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/sign-in" className="font-display-md text-xs text-[#888]">CONNEXION</Link>
            <Link href="/sign-up" className="btn-passion text-xs px-3 py-2 min-h-0">COACH</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-16 pt-14">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="PassionPlay" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent" />
        </div>

        <span className="watermark-number right-0 bottom-20 hidden lg:block">99</span>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-[#FF7A00]" />
              <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">EXPÉRIENCES SPORTIVES · PETIT GROUPE</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-[0.88] mb-5">
              VIS TA PASSION.<br />
              <span className="text-[#FF7A00]">MAINTENANT.</span>
            </h1>
            <p className="text-[#aaa] text-base sm:text-lg max-w-md mb-8 leading-relaxed font-sans">
              Une heure intense. Un expert passionné. 10–20 personnes max. Entre <strong className="text-white">13€ et 20€</strong>. Décide en 20 secondes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/explore" className="btn-passion flex items-center justify-center gap-2 pulse-orange sm:text-base px-8">
                RÉSERVER UNE SESSION
              </Link>
              <Link href="/sign-up" className="btn-passion-outline flex items-center justify-center gap-2 px-8">
                DEVENIR COACH →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS TICKER ── */}
      <div className="bg-[#111] border-y border-[#2a2a2a] overflow-hidden py-3">
        <div className="animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="font-display text-2xl text-[#FF7A00] leading-none">{item.n}</span>
              <span className="font-display-md text-sm text-[#555] tracking-widest">{item.l}</span>
              <span className="text-[#333] text-xl">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE TYPES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 bg-[#FF7A00]" />
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">LES 2 TYPES</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-10">
          Deux expériences.<br className="hidden sm:block" /> Une seule philosophie.
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 lg:p-8 relative overflow-hidden group hover:border-[#10b981]/40 transition-colors duration-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start justify-between mb-4">
              <span className="badge-discover">DÉCOUVERTE</span>
              <span className="font-display text-sm text-[#555]">13–16€</span>
            </div>
            <h3 className="font-display text-3xl text-white mb-3">Première fois.</h3>
            <p className="text-[#888] text-sm sm:text-base leading-relaxed font-sans">
              Tu n&apos;as jamais essayé. Tu veux ressentir pour la première fois. Zéro prérequis. Zéro pression. Juste l&apos;envie.
            </p>
          </div>
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 lg:p-8 relative overflow-hidden group hover:border-[#3b82f6]/40 transition-colors duration-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start justify-between mb-4">
              <span className="badge-progress">PROGRESSION</span>
              <span className="font-display text-sm text-[#555]">16–20€</span>
            </div>
            <h3 className="font-display text-3xl text-white mb-3">Débloquer un point précis.</h3>
            <p className="text-[#888] text-sm sm:text-base leading-relaxed font-sans">
              Tu pratiques déjà. L&apos;expert est focalisé sur ta technique. Tu repars avec des clés concrètes et applicables immédiatement.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <div className="bg-[#111] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">LE PROCESS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-12">Simple. Rapide. Intense.</h2>

          <div className="grid md:grid-cols-3 gap-0 md:gap-px bg-[#2a2a2a]">
            {[
              { n: "01", title: "TU CHOISIS", desc: "Un sport, une session, un coach. Tu vois les places en temps réel. Tu décides en 20 secondes." },
              { n: "02", title: "TU PAIES",   desc: "Apple Pay, Google Pay ou carte. 2 taps. Pas de compte obligatoire. Confirmation immédiate." },
              { n: "03", title: "TU VIS",     desc: "Tu arrives. Tu montres ton QR code. Tu vis ta passion pendant 1h avec des gens comme toi." },
            ].map((step) => (
              <div key={step.n} className="bg-[#111] p-8 lg:p-10 group">
                <span className="font-display text-[5rem] lg:text-[7rem] text-[#FF7A00]/20 leading-none group-hover:text-[#FF7A00]/40 transition-colors duration-200 block">
                  {step.n}
                </span>
                <h3 className="font-display text-2xl text-white mb-3 mt-2">{step.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SESSIONS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 bg-[#FF7A00]" />
              <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">SESSIONS À VENIR</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white">DES MOMENTS.</h2>
          </div>
          <Link href="/explore" className="font-display-md text-sm text-[#555] hover:text-[#FF7A00] transition-colors hidden sm:block">
            VOIR TOUT →
          </Link>
        </div>

        {/* Sport pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {SPORTS.map((sport, i) => (
            <button key={sport} className={`shrink-0 font-display-md text-xs px-4 py-2 border transition-colors duration-120 whitespace-nowrap ${
              i === 0 ? "bg-[#FF7A00] border-[#FF7A00] text-white" : "border-[#2a2a2a] text-[#555] hover:border-[#FF7A00] hover:text-[#FF7A00]"
            }`}>
              {sport}
            </button>
          ))}
        </div>

        {/* Session cards — 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SESSIONS.map((s) => {
            const pct = Math.round((s.totalSpots - s.remainingSpots) / s.totalSpots * 100);
            const urgent = s.remainingSpots <= 3;
            return (
              <Link href="/explore" key={s.id} className="session-card bg-[#1e1e1e] border border-[#2a2a2a] overflow-hidden group cursor-pointer block">
                {/* Image */}
                <div className="relative h-44 bg-[#2a2a2a] overflow-hidden">
                  {s.img && (
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge-sport text-[10px] px-2 py-1">{s.sport}</span>
                    <span className={s.type === "discover" ? "badge-discover" : "badge-progress"}>
                      {s.type === "discover" ? "DÉCOUVERTE" : "PROGRESSION"}
                    </span>
                  </div>
                  {urgent && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#FF3D00]/90 px-2 py-1 text-[10px] font-bold font-display-md text-white">
                      🔥 {s.remainingSpots} PLACES
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display text-lg text-white leading-tight mb-2 group-hover:text-[#FF7A00] transition-colors duration-120">
                    {s.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#333] shrink-0" />
                    <span className="text-[#888] text-xs font-sans">{s.coach.name}</span>
                    <span className="text-[#FF7A00] text-xs ml-auto">★ {s.coach.rating}</span>
                  </div>
                  <div className="text-[#666] text-xs font-sans mb-3">{s.city} · {s.date}</div>

                  {/* Spots bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-sans mb-1">
                      <span className={urgent ? "text-[#FF3D00]" : "text-[#555]"}>
                        {s.remainingSpots} place{s.remainingSpots > 1 ? "s" : ""} restante{s.remainingSpots > 1 ? "s" : ""}
                      </span>
                      <span className="text-[#444]">{pct}%</span>
                    </div>
                    <div className="w-full bg-[#2a2a2a] h-px">
                      <div className={`h-full ${urgent ? "bg-[#FF3D00]" : "bg-[#FF7A00]"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-display text-3xl text-[#FF7A00]">{s.price}€</span>
                      <span className="font-display-md text-xs text-[#444] ml-1">/ pers.</span>
                    </div>
                    <span className="font-display-md text-xs text-[#FF7A00] hover:text-white transition-colors">RÉSERVER →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/explore" className="btn-passion flex items-center justify-center gap-2 sm:px-12">
            TOUTES LES SESSIONS →
          </Link>
        </div>
      </section>

      {/* ── COACH CTA ── */}
      <div className="bg-[#111] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#FF7A00]" />
                <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">POUR LES COACHS</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-white leading-[0.92] mb-5">
                TU TRANSMETS.<br /><span className="text-[#FF7A00]">ON TE PAIE.</span>
              </h2>
              <p className="text-[#666] text-sm sm:text-base leading-relaxed font-sans mb-8">
                Crée une session en 5 minutes. Partage le lien sur tes réseaux. Arrive et scanne les QR codes. C&apos;est tout.
              </p>
              <Link href="/sign-up" className="btn-passion flex items-center gap-2 w-fit pulse-orange">
                DEVENIR COACH →
              </Link>
            </div>

            <div>
              {/* Revenue calc */}
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 mb-4">
                <p className="text-[#555] text-xs font-sans mb-3">Sur une session à 15€ × 15 personnes =</p>
                <p className="font-display text-5xl text-[#FF7A00] mb-4">157,50€</p>
                <p className="font-display-md text-xs text-[#555] mb-4 tracking-widest">POUR TOI</p>
                <div className="w-full h-8 flex overflow-hidden border border-[#2a2a2a]">
                  <div className="bg-[#FF7A00] flex items-center justify-center font-display-md text-xs text-white" style={{ width: "70%" }}>70% COACH</div>
                  <div className="bg-[#FF7A00]/30 flex items-center justify-center font-display-md text-[9px] text-white/60" style={{ width: "22%" }}>22%</div>
                  <div className="bg-[#222] flex items-center justify-center font-display-md text-[9px] text-white/30" style={{ width: "8%" }}>7%</div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#444] font-sans">
                  <span>Tes revenus</span>
                  <span>Plateforme</span>
                  <span>Frais</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[["5 min", "Création"], ["0€", "Frais d'entrée"], ["100%", "Ton rythme"]].map(([n, l]) => (
                  <div key={l} className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 text-center">
                    <p className="font-display text-2xl text-[#FF7A00]">{n}</p>
                    <p className="font-display-md text-[9px] text-[#555] mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] border-t border-[#222] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="passion-sep mb-10" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <span className="font-display text-3xl text-white">PASSIONPLAY</span>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[["Sessions", "/explore"], ["Devenir coach", "/sign-up"], ["Connexion", "/sign-in"], ["Contact", "/legal/contact"]].map(([label, href]) => (
                <Link key={label} href={href} className="text-[#555] hover:text-[#FF7A00] text-sm transition-colors font-sans">{label}</Link>
              ))}
            </div>
            <p className="text-[#333] text-xs font-sans hidden md:block">Paris · Lyon · Marseille · 14 villes</p>
          </div>
          <div className="passion-sep mb-6" />
          <p className="text-[#333] text-xs font-sans">© 2026 PassionPlay. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}
