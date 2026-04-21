import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSessionDateTime } from "@/lib/utils/format-date";

export const metadata = { title: "Dashboard · Passion Spark" };

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user?.coachProfile) redirect("/onboarding");

  const now = new Date();

  const [upcomingSessions, pendingPayouts, totalBookings] = await Promise.all([
    db.session.findMany({
      where:   { coachId: user.coachProfile.id, dateStart: { gte: now }, status: { in: ["published", "full"] } },
      orderBy: { dateStart: "asc" },
      take:    5,
    }),
    db.payout.aggregate({
      where: { coachId: user.coachProfile.id, status: "pending" },
      _sum:  { netAmountCents: true },
    }),
    db.booking.count({
      where: {
        session: { coachId: user.coachProfile.id },
        status:  { in: ["confirmed", "attended"] },
      },
    }),
  ]);

  const pendingAmount = pendingPayouts._sum.netAmountCents ?? 0;
  const firstName    = user.name.split(" ")[0];

  return (
    <div className="px-4 sm:px-6 py-8 space-y-8">

      {/* ── Bienvenue ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-[#FF7A00]" />
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">COACH DASHBOARD</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white">
          BONJOUR {firstName.toUpperCase()}.
        </h1>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4">
          <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-1">SESSIONS À VENIR</p>
          <p className="font-display text-4xl text-white">{upcomingSessions.length}</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4">
          <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-1">PARTICIPANTS TOTAL</p>
          <p className="font-display text-4xl text-white">{totalBookings}</p>
        </div>
        {pendingAmount > 0 ? (
          <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 p-4 col-span-2 sm:col-span-1">
            <p className="font-display-md text-[10px] text-[#FF7A00] tracking-widest mb-1">REVENUS EN ATTENTE</p>
            <p className="font-display text-4xl text-[#FF7A00]">{formatPrice(pendingAmount)}</p>
            <p className="font-sans text-xs text-[#FF7A00]/60 mt-1">Versement sous 2–7j</p>
          </div>
        ) : (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 col-span-2 sm:col-span-1">
            <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-1">TOTAL SESSIONS</p>
            <p className="font-display text-4xl text-white">{user.coachProfile.totalSessions}</p>
          </div>
        )}
      </div>

      {/* ── Sessions à venir ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-white">PROCHAINES SESSIONS</h2>
          <Link href="/sessions" className="font-display-md text-xs text-[#555] hover:text-[#FF7A00] transition-colors">
            TOUT VOIR →
          </Link>
        </div>

        {upcomingSessions.length === 0 ? (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-12 text-center">
            <p className="font-display text-5xl text-[#2a2a2a] mb-4">0</p>
            <p className="text-[#555] font-sans text-sm mb-6">
              Aucune session à venir. Crée ta première session et partage le lien !
            </p>
            <Link href="/sessions/new" className="btn-passion px-8 pulse-orange">
              CRÉER UNE SESSION →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.map((session) => {
              const pct     = Math.round(session.spotsTaken / session.maxSpots * 100);
              const urgent  = session.status === "full";
              const left    = session.maxSpots - session.spotsTaken;
              return (
                <Link
                  key={session.id}
                  href={`/sessions/${session.id}`}
                  className="block bg-[#1e1e1e] border border-[#2a2a2a] p-4 hover:border-[#FF7A00]/40 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <span className={`${session.sessionType === "discovery" ? "badge-discover" : "badge-progress"} mb-2 inline-block`}>
                        {session.sessionType === "discovery" ? "DÉCOUVERTE" : "PROGRESSION"}
                      </span>
                      <h3 className="font-display text-lg text-white group-hover:text-[#FF7A00] transition-colors truncate">
                        {session.title}
                      </h3>
                    </div>
                    <span className="font-display text-2xl text-[#FF7A00] shrink-0">
                      {formatPrice(session.priceCents)}
                    </span>
                  </div>

                  <p className="text-[#555] text-xs font-sans mb-3 capitalize">
                    {formatSessionDateTime(session.dateStart, session.durationMin)}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#2a2a2a] h-px">
                      <div className={`h-full ${urgent ? "bg-[#FF3D00]" : "bg-[#FF7A00]"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={`font-display-md text-xs ${urgent ? "text-[#FF3D00]" : "text-[#555]"}`}>
                      {urgent ? "COMPLET" : `${left} PLACE${left > 1 ? "S" : ""}`}
                    </span>
                    <span className="font-display-md text-xs text-[#333]">
                      {session.spotsTaken}/{session.maxSpots}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Stripe Connect warning ── */}
      {user.coachProfile.stripeOnboardingStatus !== "active" && (
        <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 p-5">
          <p className="font-display-md text-xs text-[#FF7A00] tracking-widest mb-2">COMPTE STRIPE INCOMPLET</p>
          <p className="text-[#888] text-sm font-sans mb-4">
            Finalise ton compte Stripe pour recevoir tes paiements.
          </p>
          <Link href="/onboarding" className="btn-passion text-sm px-6">
            COMPLÉTER →
          </Link>
        </div>
      )}

    </div>
  );
}
