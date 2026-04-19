"use client";

import { useState } from "react";
import Link from "next/link";

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

const SPORTS = ["Tous", "Football", "Basket", "MMA", "Padel", "Boxe", "Tennis", "Yoga"];

export default function ExplorePage() {
  const [activeSport, setActiveSport] = useState("Tous");

  const filtered = activeSport === "Tous"
    ? SESSIONS
    : SESSIONS.filter((s) => s.sport === activeSport);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-white hover:text-[#FF7A00] transition-colors shrink-0">
            PASSIONPLAY
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="font-display-md text-sm text-[#FF7A00]">SESSIONS</Link>
            <Link href="/sign-in" className="font-display-md text-sm text-[#888] hover:text-white transition-colors">CONNEXION</Link>
            <Link href="/sign-up" className="btn-passion text-sm px-5 py-2.5 min-h-0">DEVENIR COACH</Link>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <Link href="/sign-in" className="font-display-md text-xs text-[#888]">CONNEXION</Link>
            <Link href="/sign-up" className="btn-passion text-xs px-3 py-2 min-h-0">COACH</Link>
          </div>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <div className="pt-14 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-[#FF7A00]" />
                <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">SESSIONS DISPONIBLES</span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.92]">
                DES MOMENTS<br className="hidden sm:block" />
                <span className="text-[#FF7A00]"> QUI EXISTENT.</span>
              </h1>
            </div>
            <p className="text-[#555] text-sm font-sans lg:text-right">
              <span className="text-white font-semibold">{filtered.length}</span> session{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
              {activeSport !== "Tous" && <span className="text-[#FF7A00]"> · {activeSport}</span>}
            </p>
          </div>
        </div>
      </div>

      {/* ── STATS TICKER ── */}
      <div className="bg-[#111] border-b border-[#2a2a2a] overflow-hidden py-3">
        <div className="animate-ticker whitespace-nowrap">
          {[...Array(2)].flatMap(() => [
            { n: "127+", l: "SESSIONS" },
            { n: "2K+", l: "PASSIONNÉS" },
            { n: "14", l: "VILLES" },
            { n: "4.9★", l: "NOTE" },
            { n: "70%", l: "REVENUS COACH" },
          ]).map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="font-display text-2xl text-[#FF7A00] leading-none">{item.n}</span>
              <span className="font-display-md text-sm text-[#555] tracking-widest">{item.l}</span>
              <span className="text-[#333] text-xl">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FILTERS + GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24">

        {/* Sport filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-hide">
          {SPORTS.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`shrink-0 font-display-md text-xs px-4 py-2 border transition-colors duration-120 whitespace-nowrap ${
                activeSport === sport
                  ? "bg-[#FF7A00] border-[#FF7A00] text-white"
                  : "border-[#2a2a2a] text-[#555] hover:border-[#FF7A00] hover:text-[#FF7A00]"
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-4xl text-[#2a2a2a] mb-3">AUCUNE SESSION</p>
            <p className="text-[#555] text-sm font-sans">Pas encore de sessions {activeSport} disponibles.</p>
            <button
              onClick={() => setActiveSport("Tous")}
              className="mt-6 font-display-md text-xs text-[#FF7A00] hover:text-white transition-colors"
            >
              VOIR TOUTES LES SESSIONS →
            </button>
          </div>
        )}

        {/* Session cards — 1 col → 2 → 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filtered.map((s) => {
            const pct = Math.round((s.totalSpots - s.remainingSpots) / s.totalSpots * 100);
            const urgent = s.remainingSpots <= 3;
            return (
              <Link key={s.id} href={`/s/${s.id}`} className="session-card bg-[#1e1e1e] border border-[#2a2a2a] overflow-hidden group block">
                {/* Image */}
                <div className="relative h-44 bg-[#2a2a2a] overflow-hidden">
                  {s.img && (
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
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
                <div className="p-4 lg:p-5">
                  <h3 className="font-display text-lg text-white leading-tight mb-2 group-hover:text-[#FF7A00] transition-colors duration-120">
                    {s.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#333] shrink-0" />
                    <span className="text-[#888] text-xs font-sans">{s.coach.name}</span>
                    <span className="text-[#FF7A00] text-xs ml-auto">★ {s.coach.rating}</span>
                  </div>
                  <div className="text-[#666] text-xs font-sans mb-3">{s.city} · {s.date}</div>

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
                    <span className="btn-passion text-xs px-4 py-2 min-h-0">
                      RÉSERVER →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coach CTA banner */}
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em] block mb-2">TU ES COACH ?</span>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">Sois parmi les premiers.</h3>
            <p className="text-[#555] text-sm font-sans">Crée ta session en 5 minutes. 70% des revenus. Zéro frais d&apos;entrée.</p>
          </div>
          <Link href="/sign-up" className="btn-passion flex items-center justify-center gap-2 whitespace-nowrap shrink-0 sm:px-8">
            CRÉER MA SESSION →
          </Link>
        </div>
      </section>

    </div>
  );
}
