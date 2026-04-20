import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import { formatPrice } from "@/lib/utils/format-price";
import Link from "next/link";
import { BookingQrCard } from "@/components/booking/booking-qr-card";
import { ReviewForm } from "@/components/passionné/review-form";

export const metadata = { title: "Mon espace · PassionPlay" };

export default async function EspacePassionné() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const email     = clerkUser?.emailAddresses?.[0]?.emailAddress;
  const firstName = clerkUser?.firstName ?? "Toi";

  if (!email) redirect("/sign-in");

  const now = new Date();

  // Trouver l'utilisateur en base pour le lien userId
  const dbUser = await db.user.findUnique({
    where:  { clerkId: userId },
    select: { id: true },
  });

  // Récupérer tous les bookings — par email OU par userId (guest checkout inclus)
  const bookings = await db.booking.findMany({
    where: {
      OR: [
        { participantEmail: email },
        ...(dbUser ? [{ userId: dbUser.id }] : []),
      ],
      status: { not: "pending" },
    },
    include: {
      session: {
        include: {
          coach: {
            include: { user: true },
          },
        },
      },
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const upcoming = bookings.filter(
    (b) => b.session.dateStart > now && b.status === "confirmed",
  );
  const past = bookings.filter(
    (b) => b.session.dateStart <= now || b.status === "attended" || b.status === "cancelled",
  );

  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + (b.amountPaidCents ?? 0), 0);

  const nextSession = upcoming[0] ?? null;

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 bg-[#FF7A00]" />
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">ESPACE PASSIONNÉ</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white leading-none">
          SALUT {firstName.toUpperCase()}.
        </h1>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-3 text-center">
          <p className="font-display text-2xl text-[#FF7A00]">{upcoming.length}</p>
          <p className="font-display-md text-[9px] text-[#555] mt-0.5 tracking-widest">À VENIR</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-3 text-center">
          <p className="font-display text-2xl text-white">{past.filter(b => b.status !== "cancelled").length}</p>
          <p className="font-display-md text-[9px] text-[#555] mt-0.5 tracking-widest">VÉCUES</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-3 text-center">
          <p className="font-display text-2xl text-white">{totalSpent > 0 ? formatPrice(totalSpent) : "0€"}</p>
          <p className="font-display-md text-[9px] text-[#555] mt-0.5 tracking-widest">INVESTIS</p>
        </div>
      </div>

      {/* ── Prochaine session ── */}
      {nextSession ? (
        <section className="space-y-3">
          <h2 className="font-display-md text-xs text-[#555] tracking-widest">PROCHAINE SESSION</h2>
          <div className="bg-[#1e1e1e] border border-[#FF7A00]/40 p-5 space-y-4">

            {/* Titre + statut */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl text-white leading-tight">
                {nextSession.session.title.toUpperCase()}
              </h3>
              <span className="font-display-md text-xs text-[#FF7A00] shrink-0 mt-1">CONFIRMÉ ✓</span>
            </div>

            {/* Infos */}
            <div className="space-y-1 text-xs text-[#888] font-sans">
              <p>🗓 {formatSessionDateTime(nextSession.session.dateStart, nextSession.session.durationMin)}</p>
              <p>📍 {nextSession.session.locationAddress}</p>
              <p>💶 {nextSession.amountPaidCents ? formatPrice(nextSession.amountPaidCents) : formatPrice(nextSession.session.priceCents)}</p>
            </div>

            {/* Coach */}
            <CoachContact coach={nextSession.session.coach} />

            {/* QR */}
            <div className="pt-2">
              <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-2">TON BILLET</p>
              <BookingQrCard
                qrToken={nextSession.qrToken}
                sessionTitle={nextSession.session.title}
                isUsable={true}
              />
            </div>

          </div>
        </section>
      ) : (
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-8 text-center">
          <p className="font-display text-5xl text-[#2a2a2a] mb-3">0</p>
          <p className="text-[#555] text-sm font-sans mb-5">
            Aucune session à venir. Explore ce qui t&apos;intéresse.
          </p>
          <Link href="/explore" className="btn-passion px-8">EXPLORER →</Link>
        </div>
      )}

      {/* ── Autres sessions à venir ── */}
      {upcoming.length > 1 && (
        <section className="space-y-3">
          <h2 className="font-display-md text-xs text-[#555] tracking-widest">ÉGALEMENT À VENIR</h2>
          {upcoming.slice(1).map((b) => (
            <UpcomingCard key={b.id} booking={b} />
          ))}
        </section>
      )}

      {/* ── Sessions passées ── */}
      {past.filter(b => b.status !== "cancelled").length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display-md text-xs text-[#555] tracking-widest">MES SESSIONS VÉCUES</h2>
          {past.filter(b => b.status !== "cancelled").map((b) => (
            <PastCard key={b.id} booking={b} />
          ))}
        </section>
      )}

      {/* ── CTA Explorer ── */}
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-6 text-center space-y-3">
        <p className="font-display text-2xl text-white">CONTINUE L&apos;AVENTURE.</p>
        <p className="text-[#555] text-sm font-sans">De nouvelles sessions t&apos;attendent.</p>
        <Link href="/explore" className="btn-passion px-10 inline-flex">EXPLORER LES SESSIONS →</Link>
      </div>

    </div>
  );
}

// ── Composant coach contact ───────────────────────────────────────────────────

type CoachData = {
  user:         { name: string; avatarUrl: string | null };
  avgRating:    number;
  instagramUrl: string | null;
  tiktokUrl:    string | null;
  bio:          string | null;
};

function CoachContact({ coach }: { coach: CoachData }) {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] p-3 space-y-2">
      <p className="font-display-md text-[10px] text-[#555] tracking-widest">TON COACH</p>
      <div className="flex items-center gap-3">
        {coach.user.avatarUrl ? (
          <img src={coach.user.avatarUrl} alt={coach.user.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <span className="text-[#555] text-xs font-display">{coach.user.name[0]}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-white">{coach.user.name}</p>
          {coach.avgRating > 0 && (
            <p className="text-[#FF7A00] text-xs">★ {coach.avgRating.toFixed(1)}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {coach.instagramUrl && (
            <a
              href={coach.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display-md text-[10px] text-[#888] hover:text-[#FF7A00] transition-colors border border-[#2a2a2a] px-2 py-1"
            >
              INSTA
            </a>
          )}
          {coach.tiktokUrl && (
            <a
              href={coach.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display-md text-[10px] text-[#888] hover:text-[#FF7A00] transition-colors border border-[#2a2a2a] px-2 py-1"
            >
              TIKTOK
            </a>
          )}
        </div>
      </div>
      {coach.bio && (
        <p className="text-[#555] text-xs font-sans leading-relaxed">{coach.bio}</p>
      )}
    </div>
  );
}

// ── Card session à venir ──────────────────────────────────────────────────────

type BookingFull = Awaited<ReturnType<typeof db.booking.findMany>>[0] & {
  session: { title: string; dateStart: Date; durationMin: number; locationAddress: string; priceCents: number; coach: { user: { name: string } } };
  review: { rating: number } | null;
};

function UpcomingCard({ booking: b }: { booking: BookingFull }) {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg text-white leading-tight">{b.session.title}</h3>
        <span className="font-display-md text-xs text-[#FF7A00] shrink-0">CONFIRMÉ</span>
      </div>
      <p className="text-[#888] text-xs font-sans">
        🗓 {formatSessionDateTime(b.session.dateStart, b.session.durationMin)}
      </p>
      <p className="text-[#555] text-xs font-sans">📍 {b.session.locationAddress}</p>
    </div>
  );
}

// ── Card session passée ───────────────────────────────────────────────────────

function PastCard({ booking: b }: { booking: BookingFull }) {
  const isAttended = b.status === "attended";

  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg text-white leading-tight">{b.session.title}</h3>
          <p className="text-[#555] text-xs font-sans mt-0.5">
            {formatSessionDateTime(b.session.dateStart, b.session.durationMin)}
          </p>
        </div>
        <span className={`font-display-md text-xs shrink-0 mt-1 ${isAttended ? "text-[#10b981]" : "text-[#555]"}`}>
          {isAttended ? "PRÉSENT ✓" : "TERMINÉ"}
        </span>
      </div>

      <p className="text-[#555] text-xs font-sans">👤 {b.session.coach.user.name}</p>

      {/* Avis — seulement si session terminée et pas encore noté */}
      {isAttended && !b.review && (
        <div className="border-t border-[#2a2a2a] pt-3">
          <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-2">LAISSE TON AVIS</p>
          <ReviewForm bookingId={b.id} />
        </div>
      )}

      {/* Avis déjà donné */}
      {b.review && (
        <div className="border-t border-[#2a2a2a] pt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < b.review!.rating ? "text-[#FF7A00]" : "text-[#333]"}`}>★</span>
          ))}
          <span className="text-[#555] text-xs font-sans ml-1">Ton avis</span>
        </div>
      )}
    </div>
  );
}
