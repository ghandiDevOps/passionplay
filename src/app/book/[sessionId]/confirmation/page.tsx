import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { QRCodeSVG } from "qrcode.react";
import { formatSessionDateTime } from "@/lib/utils/format-date";
import { formatPrice } from "@/lib/utils/format-price";
import Link from "next/link";

interface Props {
  searchParams: { booking_id?: string };
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

  if (!booking || booking.status === "pending") notFound();

  const { session } = booking;

  // Générer le lien iCal
  const icalUrl = generateIcalUrl({
    title:   session.title,
    start:   session.dateStart,
    end:     new Date(session.dateStart.getTime() + session.durationMin * 60000),
    location: session.locationAddress,
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="page-container pt-10 space-y-8">

        {/* Succès */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="text-6xl">🎉</div>
          <h1 className="text-2xl font-black text-gray-900">
            C&apos;est réservé, {booking.participantName} !
          </h1>
          <p className="text-gray-500">
            Ton QR code a été envoyé à{" "}
            <span className="font-medium text-gray-700">{booking.participantEmail}</span>
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center space-y-3">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
            <QRCodeSVG
              value={booking.qrToken}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Montre ce QR code à l&apos;entrée de la session
          </p>
        </div>

        {/* Récapitulatif */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-gray-900">{session.title}</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-lg">📅</span>
              <span className="text-gray-700 capitalize">
                {formatSessionDateTime(session.dateStart, session.durationMin)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <span className="text-gray-700">{session.locationAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">👤</span>
              <span className="text-gray-700">
                Coach : {session.coach.user.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💶</span>
              <span className="text-gray-700 font-semibold">
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
            className="btn-secondary text-center block"
          >
            📅 Ajouter au calendrier
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(session.locationAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center block"
          >
            🗺️ Voir sur la carte
          </a>
        </div>

        <p className="text-xs text-center text-gray-400 pb-8">
          Tu recevras un rappel la veille et 2h avant la session.
        </p>
      </div>
    </main>
  );
}

// Génère une URL de téléchargement iCal
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

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ical)}`;
}
