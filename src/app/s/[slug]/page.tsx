import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { SessionTypeBadge } from "@/components/ui/badge";
import { SpotsCounter } from "@/components/session/spots-counter";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import Link from "next/link";
import { APP_URL } from "@/constants";

interface Props {
  params: { slug: string };
}

async function getSession(slug: string) {
  return db.session.findUnique({
    where:   { slug },
    include: { coach: { include: { user: true } } },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getSession(params.slug);
  if (!session) return { title: "Session introuvable" };

  const title       = `${session.title} — ${formatPrice(session.priceCents)}`;
  const description = session.tagline ?? session.description.slice(0, 160);
  const url         = `${APP_URL}/s/${session.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type:   "website",
      images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function SessionPage({ params }: Props) {
  const session = await getSession(params.slug);

  if (!session || session.status === "cancelled") notFound();

  const spotsLeft = session.maxSpots - session.spotsTaken;
  const isFull    = spotsLeft <= 0;
  const isUrgent  = !isFull && spotsLeft <= 3;
  const coachName = session.coach.user.name;

  return (
    <main className="min-h-screen bg-[#1a1a1a]">

      {/* ── Hero ── */}
      <section className="px-4 pt-10 pb-8 border-b border-[#2a2a2a]">
        <div className="max-w-lg mx-auto space-y-4">

          {/* Nav retour */}
          <Link href="/explore" className="font-display-md text-xs text-[#555] hover:text-[#FF7A00] transition-colors tracking-widest">
            ← EXPLORER
          </Link>

          <SessionTypeBadge type={session.sessionType} />

          <h1 className="font-display text-4xl sm:text-5xl text-white leading-none">
            {session.title.toUpperCase()}
          </h1>

          {session.tagline && (
            <p className="text-[#888] text-base leading-relaxed">
              {session.tagline}
            </p>
          )}

          {/* Coach */}
          <div className="flex items-center gap-3 pt-1">
            {session.coach.user.avatarUrl ? (
              <img
                src={session.coach.user.avatarUrl}
                alt={coachName}
                className="w-9 h-9 rounded-full object-cover border border-[#2a2a2a]"
              />
            ) : (
              <div className="w-9 h-9 bg-[#FF7A00]/20 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00] font-bold text-sm">
                {coachName[0]}
              </div>
            )}
            <div>
              <p className="text-white font-semibold text-sm">{coachName}</p>
              {session.coach.avgRating > 0 && (
                <p className="text-[#555] text-xs">
                  ⭐ {session.coach.avgRating.toFixed(1)} · {session.coach.totalSessions} sessions
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Infos pratiques ── */}
      <section className="page-container pt-6 space-y-4">

        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">📅</span>
            <div>
              <p className="text-white font-semibold text-sm capitalize">
                {formatSessionDateTime(session.dateStart, session.durationMin)}
              </p>
              <p className="text-[#555] text-xs mt-0.5">{session.durationMin} minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">📍</span>
            <p className="text-white font-semibold text-sm">{session.locationAddress}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">👥</span>
            <SpotsCounter
              sessionId={session.id}
              initialSpotsTaken={session.spotsTaken}
              maxSpots={session.maxSpots}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">CE QUE TU VAS VIVRE</span>
          </div>
          <p className="text-[#888] leading-relaxed whitespace-pre-wrap text-sm">
            {session.description}
          </p>
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] px-4 py-3">
            <p className="font-display-md text-xs text-[#555] tracking-widest mb-1">COMPÉTENCE TRAVAILLÉE</p>
            <p className="text-white font-semibold text-sm">{session.skillFocus}</p>
          </div>
        </div>

        {/* Cover image si présente */}
        {session.coverImageUrl && (
          <img
            src={session.coverImageUrl}
            alt={session.title}
            className="w-full aspect-video object-cover"
          />
        )}

        {/* Espace pour le sticky CTA */}
        <div className="h-24" />
      </section>

      {/* ── Sticky CTA ── */}
      <div className="sticky-bottom bg-[#1a1a1a]/95 backdrop-blur-sm border-t border-[#2a2a2a]">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-display text-3xl text-[#FF7A00]">
              {formatPrice(session.priceCents)}
            </p>
            <p className="text-[#555] text-xs">par personne</p>
          </div>

          {isFull ? (
            <Link
              href={`/s/${session.slug}/waitlist`}
              className="flex-1 btn-passion-outline text-center"
            >
              LISTE D&apos;ATTENTE
            </Link>
          ) : (
            <Link
              href={`/book/${session.id}`}
              className={`flex-1 btn-passion text-center ${isUrgent ? "pulse-orange" : ""}`}
            >
              {isUrgent
                ? `RÉSERVER — ${spotsLeft} PLACE${spotsLeft > 1 ? "S" : ""} ⚡`
                : "RÉSERVER MA PLACE →"}
            </Link>
          )}
        </div>
      </div>

    </main>
  );
}
