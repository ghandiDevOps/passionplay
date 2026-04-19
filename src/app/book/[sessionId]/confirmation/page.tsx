import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { QRCodeSVG } from "qrcode.react";
import { ConfirmationPoller } from "@/components/booking/confirmation-poller";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import { formatPrice } from "@/lib/utils/format-price";
import Link from "next/link";

interface Props {
  searchParams: { booking_id?: string; redirect_status?: string };
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const bookingId = searchParams.booking_id;
  if (!bookingId) notFound();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      session: {
        include: {
          coach: { include: { user: true } },
        },
      },
    },
  });

  if (!booking) notFound();

  const isPending   = booking.status === "pending";
  const isConfirmed = booking.status === "confirmed" || booking.status === "attended";
  const stripeOk    = searchParams.redirect_status === "succeeded";

  // Booking cancelled ou invalid sans redirect Stripe valide
  if (!isConfirmed && !(isPending && stripeOk)) {
    notFound();
  }

  const { session } = booking;

  const icalUrl = generateIcalUrl({
    title:    session.title,
    start:    session.dateStart,
    end:      new Date(session.dateStart.getTime() + session.durationMin * 60000),
    location: session.locationAddress,
  });

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <div className="page-container pt-10 space-y-8">

        {/* Succès */}
        <div className="text-center space-y-3">
          <div className="text-6xl">🎉</div>
          <h1 className="font-display text-3xl text-white">
            C&apos;est réservé, {booking.participantName} !
          </h1>
          <p className="text-[#888]">
            Ton QR code a été envoyé à{" "}
            <span className="text-white">{booking.participantEmail}</span>
          </p>
        </div>

        {/* QR Code — poller si encore pending, statique si confirmé */}
        {isConfirmed ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <QRCodeSVG
                value={booking.qrToken}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            <p className="text-sm text-[#888] text-center">
              Montre ce QR code à l&apos;entrée
            </p>
          </div>
        ) : (
          <ConfirmationPoller
            bookingId={bookingId}
            participantName={booking.participantName}
          />
        )}

        {/* Récapitulatif */}
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5 space-y-4">
          <h2 className="font-display-md text-white">{session.title}</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-lg">📅</span>
              <span className="text-[#ccc] capitalize">
                {formatSessionDateTime(session.dateStart, session.durationMin)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <span className="text-[#ccc]">{session.locationAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">👤</span>
              <span className="text-[#ccc]">
                Coach : {session.coach.user.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💶</span>
              <span className="text-white font-semibold">
                Payé : {booking.amountPaidCents ? formatPrice(booking.amountPaidCents) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={icalUrl}
            download="passionplay-session.ics"
            className="btn-passion-outline text-center block"
          >
            📅 Ajouter au calendrier
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(session.locationAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-passion-outline text-center block"
          >
            🗺️ Voir sur la carte
          </a>
        </div>

        <p className="text-xs text-center text-[#555]">
          Tu recevras un rappel la veille et 2h avant la session.
        </p>

        <div className="text-center pb-8">
          <Link href="/my/bookings" className="font-display-md text-xs text-[#FF7A00] tracking-widest hover:underline">
            VOIR TOUS MES BILLETS →
          </Link>
        </div>
      </div>
    </main>
  );
}

function generateIcalUrl({
  title,
  start,
  end,
  location,
}: {
  title: string;
  start: Date;
  end: Date;
  location: string;
}) {
  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PassionPlay//FR",
    "BEGIN:VEVENT",
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ical)}`;
}
