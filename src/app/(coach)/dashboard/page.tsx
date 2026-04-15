import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import { SessionTypeBadge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user?.coachProfile) redirect("/onboarding");

  const now = new Date();

  // Sessions à venir
  const upcomingSessions = await db.session.findMany({
    where: {
      coachId:   user.coachProfile.id,
      dateStart: { gte: now },
      status:    { in: ["published", "full"] },
    },
    orderBy: { dateStart: "asc" },
    take: 5,
  });

  // Revenus en attente (sessions terminées, payout pending)
  const pendingPayouts = await db.payout.aggregate({
    where: {
      coachId: user.coachProfile.id,
      status:  "pending",
    },
    _sum: { netAmountCents: true },
  });

  const pendingAmount = pendingPayouts._sum.netAmountCents ?? 0;

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Bienvenue */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Bonjour {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {upcomingSessions.length === 0
              ? "Aucune session prochaine"
              : `${upcomingSessions.length} session${upcomingSessions.length > 1 ? "s" : ""} à venir`}
          </p>
        </div>
        <Link
          href="/sessions/new"
          className="bg-passion-500 text-white font-semibold py-2.5 px-4 rounded-2xl text-sm"
        >
          + Créer
        </Link>
      </div>

      {/* Revenus en attente */}
      {pendingAmount > 0 && (
        <div className="bg-passion-50 border border-passion-100 rounded-2xl p-4">
          <p className="text-sm text-passion-700 font-medium">Revenus en attente</p>
          <p className="text-3xl font-black text-passion-600 mt-1">
            {formatPrice(pendingAmount)}
          </p>
          <p className="text-xs text-passion-500 mt-1">
            Versement sous 2–7 jours ouvrés
          </p>
        </div>
      )}

      {/* Sessions à venir */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Sessions à venir</h2>

        {upcomingSessions.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-4xl">🎯</p>
            <p className="text-gray-500">
              Crée ta première session et partage le lien !
            </p>
            <Link href="/sessions/new" className="btn-primary inline-block px-8 py-3">
              Créer une session
            </Link>
          </div>
        ) : (
          upcomingSessions.map((session) => (
            <Link
              key={session.id}
              href={`/sessions/${session.id}`}
              className="block bg-white border border-gray-100 rounded-2xl p-4 space-y-3
                         hover:border-passion-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <SessionTypeBadge type={session.sessionType} />
                  <h3 className="font-bold text-gray-900">{session.title}</h3>
                </div>
                <span className="text-lg font-black text-passion-500 shrink-0">
                  {formatPrice(session.priceCents)}
                </span>
              </div>

              <p className="text-sm text-gray-500 capitalize">
                {formatSessionDateTime(session.dateStart, session.durationMin)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-semibold text-gray-900">
                    {session.spotsTaken}
                  </span>
                  <span className="text-gray-400">/ {session.maxSpots} places</span>
                </div>
                <div
                  className="h-2 bg-gray-100 rounded-full overflow-hidden"
                  style={{ width: "120px" }}
                >
                  <div
                    className="h-full bg-passion-500 rounded-full transition-all"
                    style={{
                      width: `${(session.spotsTaken / session.maxSpots) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
