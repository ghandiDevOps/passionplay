import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { BookingQrCard } from "@/components/booking/booking-qr-card";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import { formatPrice } from "@/lib/utils/format-price";
import Link from "next/link";

export const metadata = { title: "Mes billets · PassionPlay" };

export default async function MyBookingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Récupérer l'email depuis Clerk pour matcher les bookings guest aussi
  const clerkUser = await currentUser();
  const email     = clerkUser?.emailAddresses?.[0]?.emailAddress;

  if (!email) redirect("/sign-in");

  const now = new Date();

  const bookings = await db.booking.findMany({
    where: {
      participantEmail: email,
      status:           { not: "pending" }, // on masque les paiements non finalisés
    },
    include: {
      session: {
        include: { coach: { include: { user: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Sépare à venir / passées
  const upcoming = bookings.filter(
    (b) => b.session.dateStart > now && b.status !== "cancelled",
  );
  const past = bookings.filter(
    (b) => b.session.dateStart <= now || b.status === "cancelled",
  );

  if (bookings.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">MES BILLETS</span>
          </div>
          <h1 className="font-display text-4xl text-white">TES SESSIONS</h1>
        </div>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-12 text-center">
          <p className="font-display text-5xl text-[#2a2a2a] mb-4">0</p>
          <p className="text-[#555] text-sm mb-6">Tu n&apos;as pas encore réservé de session.</p>
          <Link href="/explore" className="btn-passion px-8">EXPLORER →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-[#FF7A00]" />
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">MES BILLETS</span>
        </div>
        <h1 className="font-display text-4xl text-white">TES SESSIONS</h1>
      </div>

      {/* ── Sessions à venir ── */}
      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display-md text-xs text-[#555] tracking-widest">À VENIR</h2>
          {upcoming.map((b) => (
            <BookingCard key={b.id} booking={b} now={now} />
          ))}
        </section>
      )}

      {/* ── Sessions passées / annulées ── */}
      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display-md text-xs text-[#555] tracking-widest">HISTORIQUE</h2>
          {past.map((b) => (
            <BookingCard key={b.id} booking={b} now={now} />
          ))}
        </section>
      )}
    </div>
  );
}

// ── Carte billet ──────────────────────────────────────────────────────────────

type BookingWithSession = Awaited<ReturnType<typeof db.booking.findMany>>[0] & {
  session: {
    title: string;
    dateStart: Date;
    durationMin: number;
    locationAddress: string;
    priceCents: number;
    coach: { user: { name: string } };
  };
};

function BookingCard({ booking, now }: { booking: BookingWithSession; now: Date }) {
  const { session } = booking;
  const isPast      = session.dateStart <= now;
  const isAttended  = booking.status === "attended";
  const isCancelled = booking.status === "cancelled";

  // Le QR est utilisable uniquement si la session est à venir et le booking confirmé
  const isUsable = !isPast && booking.status === "confirmed";

  const statusLabel = isCancelled ? "ANNULÉ"
                    : isAttended  ? "PRÉSENT ✓"
                    : isPast      ? "TERMINÉ"
                    : "CONFIRMÉ";

  const statusColor = isCancelled ? "text-[#FF3D00]"
                    : isAttended  ? "text-[#10b981]"
                    : isPast      ? "text-[#555]"
                    : "text-[#FF7A00]";

  return (
    <div className={`bg-[#1e1e1e] border p-4 space-y-3 ${isCancelled ? "border-[#2a2a2a] opacity-50" : "border-[#2a2a2a]"}`}>

      {/* En-tête */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-white leading-tight">{session.title}</h3>
          <p className="text-[#888] text-xs font-sans mt-0.5 capitalize">
            {formatSessionDateTime(session.dateStart, session.durationMin)}
          </p>
        </div>
        <span className={`font-display-md text-xs tracking-widest shrink-0 ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Détails */}
      <div className="space-y-1 text-xs text-[#555]">
        <p>📍 {session.locationAddress}</p>
        <p>👤 {session.coach.user.name}</p>
        <p>💶 {booking.amountPaidCents ? formatPrice(booking.amountPaidCents) : formatPrice(session.priceCents)}</p>
      </div>

      {/* QR — visible si session à venir et confirmed */}
      <BookingQrCard
        qrToken={booking.qrToken}
        sessionTitle={session.title}
        isUsable={isUsable}
      />
    </div>
  );
}
