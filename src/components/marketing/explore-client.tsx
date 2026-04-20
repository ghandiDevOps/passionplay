"use client";

import { useState } from "react";
import Link from "next/link";
import { SessionCard, type SessionCardData } from "./session-card";

interface ExploreClientProps {
  sessions: SessionCardData[];
  categories: string[]; // liste unique de catégories disponibles
}

export function ExploreClient({ sessions, categories }: ExploreClientProps) {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filters = ["Tous", ...categories];

  const filtered =
    activeFilter === "Tous"
      ? sessions
      : sessions.filter(
          (s) => s.category.toLowerCase() === activeFilter.toLowerCase(),
        );

  return (
    <>
      {/* ── Filtre catégories ── */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 font-display-md text-xs px-4 py-2 border transition-colors duration-120 whitespace-nowrap ${
              activeFilter === filter
                ? "bg-[#FF7A00] border-[#FF7A00] text-white"
                : "border-[#2a2a2a] text-[#555] hover:border-[#FF7A00] hover:text-[#FF7A00]"
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Compteur ── */}
      <p className="text-[#555] text-sm font-sans mb-6">
        <span className="text-white font-semibold">{filtered.length}</span>{" "}
        session{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        {activeFilter !== "Tous" && (
          <span className="text-[#FF7A00]"> · {activeFilter}</span>
        )}
      </p>

      {/* ── État vide ── */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-display text-4xl text-[#2a2a2a] mb-3">AUCUNE SESSION</p>
          <p className="text-[#555] text-sm font-sans mb-6">
            Pas encore de sessions {activeFilter} disponibles.
          </p>
          <button
            onClick={() => setActiveFilter("Tous")}
            className="font-display-md text-xs text-[#FF7A00] hover:text-white transition-colors"
          >
            VOIR TOUTES LES SESSIONS →
          </button>
        </div>
      )}

      {/* ── Grille sessions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.map((s) => (
          <SessionCard key={s.slug} s={s} />
        ))}
      </div>

      {/* ── Bannière coach ── */}
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em] block mb-2">
            TU ES COACH ?
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">
            Transmets ce que tu aimes.
          </h3>
          <p className="text-[#555] text-sm font-sans">
            Crée ta session en 5 minutes. 70% des revenus. Zéro frais d&apos;entrée.
          </p>
        </div>
        <Link
          href="/sign-up"
          className="btn-passion flex items-center justify-center gap-2 whitespace-nowrap shrink-0 sm:px-8"
        >
          CRÉER MA SESSION →
        </Link>
      </div>
    </>
  );
}
