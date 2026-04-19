"use client";

import Link from "next/link";

export type SessionCardData = {
  slug: string;
  title: string;
  category: string;
  domain: string;
  coachName: string;
  coachRating: number;
  dateLabel: string;   // "Sam. 19 avr · 10h00"
  city: string;        // "Paris 11e"
  priceCents: number;
  maxSpots: number;
  spotsTaken: number;
  sessionType: "discovery" | "progression";
  coverImageUrl: string | null;
};

const CATEGORY_EMOJI: Record<string, string> = {
  mma: "🥊", boxe: "🥊", boxing: "🥊",
  padel: "🎾", tennis: "🎾",
  football: "⚽", foot: "⚽",
  basket: "🏀", basketball: "🏀",
  yoga: "🧘",
  rugby: "🏉",
  natation: "🏊",
  running: "🏃",
  fitness: "💪",
  musique: "🎸", guitare: "🎸", piano: "🎹",
  cuisine: "🍳", cooking: "🍳",
  danse: "💃", dance: "💃",
  art: "🎨",
};

function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category.toLowerCase()] ?? "🏅";
}

export function SessionCard({ s }: { s: SessionCardData }) {
  const spotsLeft = s.maxSpots - s.spotsTaken;
  const pct       = Math.round((s.spotsTaken / s.maxSpots) * 100);
  const urgent    = spotsLeft <= 3 && spotsLeft > 0;
  const isFull    = spotsLeft <= 0;
  const price     = s.priceCents / 100;

  return (
    <Link
      href={`/s/${s.slug}`}
      className="session-card bg-[#1e1e1e] border border-[#2a2a2a] overflow-hidden group block"
    >
      {/* ── Image ── */}
      <div className="relative h-44 bg-[#111] overflow-hidden">
        {s.coverImageUrl ? (
          <img
            src={s.coverImageUrl}
            alt={s.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a0a00 100%)" }}
          >
            <span className="text-6xl opacity-20 select-none">
              {getCategoryEmoji(s.category)}
            </span>
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{ background: "linear-gradient(to top, #1e1e1e, transparent)" }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="badge-sport text-[10px] px-2 py-1">{s.category}</span>
          <span className={s.sessionType === "discovery" ? "badge-discover" : "badge-progress"}>
            {s.sessionType === "discovery" ? "DÉCOUVERTE" : "PROGRESSION"}
          </span>
        </div>

        {/* Urgence */}
        {urgent && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#FF3D00]/90 px-2 py-1 text-[10px] font-bold font-display-md text-white">
            🔥 {spotsLeft} PLACE{spotsLeft > 1 ? "S" : ""}
          </div>
        )}
        {isFull && (
          <div className="absolute top-3 right-3 bg-[#1a1a1a]/90 px-2 py-1 text-[10px] font-display-md text-[#555]">
            COMPLET
          </div>
        )}
      </div>

      {/* ── Contenu ── */}
      <div className="p-4 lg:p-5">
        <h3 className="font-display text-lg text-white leading-tight mb-2 group-hover:text-[#FF7A00] transition-colors duration-120">
          {s.title}
        </h3>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-[#333] shrink-0" />
          <span className="text-[#888] text-xs font-sans">{s.coachName}</span>
          {s.coachRating > 0 && (
            <span className="text-[#FF7A00] text-xs ml-auto">★ {s.coachRating.toFixed(1)}</span>
          )}
        </div>

        <div className="text-[#666] text-xs font-sans mb-3">
          {s.city} · {s.dateLabel}
        </div>

        {/* Barre de remplissage */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-sans mb-1">
            <span className={urgent ? "text-[#FF3D00]" : isFull ? "text-[#555]" : "text-[#555]"}>
              {isFull
                ? "Session complète"
                : `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`}
            </span>
            <span className="text-[#444]">{pct}%</span>
          </div>
          <div className="w-full bg-[#2a2a2a] h-px">
            <div
              className={`h-full ${urgent ? "bg-[#FF3D00]" : isFull ? "bg-[#555]" : "bg-[#FF7A00]"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="font-display text-3xl text-[#FF7A00]">{price}€</span>
            <span className="font-display-md text-xs text-[#444] ml-1">/ pers.</span>
          </div>
          {!isFull && (
            <span className="btn-passion text-xs px-4 py-2 min-h-0">RÉSERVER →</span>
          )}
        </div>
      </div>
    </Link>
  );
}
