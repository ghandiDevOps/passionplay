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

// Récupère la session depuis la DB (Server Component)
async function getSession(slug: string) {
  return db.session.findUnique({
    where: { slug },
    include: {
      coach: {
        include: { user: true },
      },
    },
  });
}

// Métadonnées dynamiques pour le SEO et les OG tags (WhatsApp, Insta…)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getSession(params.slug);
  if (!session) return { title: "Session introuvable" };

  const title = `${session.title} — ${formatPrice(session.priceCents)}`;
  const description = session.tagline ?? session.description.slice(0, 160);
  const url = `${APP_URL}/s/${session.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: `${url}/opengraph-image` }],
    },
  };
}

export default async function SessionPage({ params }: Props) {
  const session = await getSession(params.slug);

  if (!session || session.status === "cancelled") {
    notFound();
  }

  const spotsLeft = session.maxSpots - session.spotsTaken;
  const isFull = spotsLeft <= 0;
  const dateLabel = formatSessionDateTime(session.dateStart, session.durationMin);
  const coachName = session.coach.user.name;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-950 text-white px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <SessionTypeBadge type={session.sessionType} />

          <h1 className="text-3xl font-black leading-tight">
            {session.title}
          </h1>

          {session.tagline && (
            <p className="text-gray-300 text-lg leading-relaxed">
              {session.tagline}
            </p>
          )}

          {/* Coach */}
          <div className="flex items-center gap-3 pt-2">
            {session.coach.user.avatarUrl ? (
              <img
                src={session.coach.user.avatarUrl}
                alt={coachName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-passion-500 flex items-center justify-center text-white font-bold">
                {coachName[0]}
              </div>
            )}
            <div>
              <p className="font-semibold">{coachName}</p>
              {session.coach.avgRating > 0 && (
                <p className="text-sm text-gray-400">
                  ⭐ {session.coach.avgRating.toFixed(1)} · {session.coach.totalSessions} sessions
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="page-container pt-6 space-y-4">
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="font-semibold text-gray-900 capitalize">{dateLabel}</p>
              <p className="text-sm text-gray-500">{session.durationMin} minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="font-semibold text-gray-900">{session.locationAddress}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">👥</span>
            <SpotsCounter
              sessionId={session.id}
              initialSpotsTaken={session.spotsTaken}
              maxSpots={session.maxSpots}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">Ce que tu vas vivre</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {session.description}
          </p>
          <p className="text-sm text-gray-500">
            Compétence travaillée : <span className="font-medium text-gray-700">{session.skillFocus}</span>
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky-bottom pb-safe">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-black text-gray-900">
              {formatPrice(session.priceCents)}
            </p>
            <p className="text-xs text-gray-500">par personne</p>
          </div>

          {isFull ? (
            <Link
              href={`/s/${session.slug}/waitlist`}
              className="flex-1 btn-secondary text-center"
            >
              Liste d&apos;attente
            </Link>
          ) : (
            <Link
              href={`/book/${session.id}`}
              className="flex-1 btn-primary text-center"
            >
              Réserver ma place →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
