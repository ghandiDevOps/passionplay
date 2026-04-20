import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSessionDateTime } from "@/lib/utils/format-date";

export const metadata = { title: "Mes sessions · PassionPlay" };

export default async function SessionsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user?.coachProfile) redirect("/onboarding");

  const now = new Date();

  const [upcoming, past] = await Promise.all([
    db.session.findMany({
      where:   { coachId: user.coachProfile.id, dateStart: { gte: now } },
      orderBy: { dateStart: "asc" },
    }),
    db.session.findMany({
      where:   { coachId: user.coachProfile.id, dateStart: { lt: now } },
      orderBy: { dateStart: "desc" },
      take:    20,
    }),
  ]);

  return (
    <div className="px-4 sm:px-6 py-8">

      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">MES SESSIONS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white">
            {upcoming.length + past.length} AU TOTAL
          </h1>
        </div>
        <Link href="/sessions/new" className="btn-passion px-6">
          + CRÉER
        </Link>
      </div>

      {/* ── À venir ── */}
      <section className="mb-10">
        <h2 className="font-display-md text-xs text-[#555] tracking-[0.2em] mb-4">
          À VENIR — {upcoming.length}
        </h2>

        {upcoming.length === 0 ? (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-10 text-center">
            <p className="text-[#333] font-display text-4xl mb-3">0</p>
            <p className="text-[#555] text-sm font-sans mb-6">Aucune session programmée.</p>
            <Link href="/sessions/new" className="btn-passion px-8 pulse-orange">
              CRÉER MA PREMIÈRE SESSION →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((s) => <SessionRow key={s.id} session={s} />)}
          </div>
        )}
      </section>

      {/* ── Passées ── */}
      {past.length > 0 && (
        <section>
          <h2 className="font-display-md text-xs text-[#555] tracking-[0.2em] mb-4">
            PASSÉES — {past.length}
          </h2>
          <div className="space-y-3 opacity-60">
            {past.map((s) => <SessionRow key={s.id} session={s} past />)}
          </div>
        </section>
      )}

    </div>
  );
}

function SessionRow({ session, past = false }: { session: Parameters<typeof formatSessionDateTime>[0] extends infer T ? any : never; past?: boolean }) {
  const pct    = Math.round(session.spotsTaken / session.maxSpots * 100);
  const left   = session.maxSpots - session.spotsTaken;
  const full   = session.status === "full";

  return (
    <Link
      href={`/sessions/${session.id}`}
      className="block bg-[#1e1e1e] border border-[#2a2a2a] p-4 hover:border-[#FF7A00]/40 transition-colors group"
    >
      <div className="flex items-start gap-3">
        {/* Date bloc */}
        <div className="shrink-0 text-center w-10">
          <p className="font-display text-xl text-[#FF7A00] leading-none">
            {new Date(session.dateStart).getDate()}
          </p>
          <p className="font-display-md text-[9px] text-[#555]">
            {new Date(session.dateStart).toLocaleDateString("fr-FR", { month: "short" }).toUpperCase()}
          </p>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base text-white group-hover:text-[#FF7A00] transition-colors truncate mb-1">
            {session.title}
          </h3>
          <p className="text-[#555] text-xs font-sans">
            {formatSessionDateTime(session.dateStart, session.durationMin)}
          </p>
        </div>

        {/* Prix + places */}
        <div className="shrink-0 text-right">
          <p className="font-display text-xl text-[#FF7A00]">{formatPrice(session.priceCents)}</p>
          <p className={`font-display-md text-[10px] ${full ? "text-[#FF3D00]" : "text-[#555]"}`}>
            {full ? "COMPLET" : past ? `${session.spotsTaken}/${session.maxSpots}` : `${left} PLACE${left > 1 ? "S" : ""}`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 w-full bg-[#2a2a2a] h-px">
        <div className={`h-full ${full ? "bg-[#FF3D00]" : "bg-[#FF7A00]"}`} style={{ width: `${pct}%` }} />
      </div>
    </Link>
  );
}
