import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createPaymentIntent } from "@/lib/stripe";
import { generateQrToken } from "@/lib/utils/generate-qr-token";

const schema = z.object({
  name:  z.string().min(2),
  email: z.string().email(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 },
      );
    }

    const { name, email } = parsed.data;

    // ── 1. Vérification atomique des places disponibles ──────────────────────
    // Utilise une transaction pour éviter la surréservation
    const result = await db.$transaction(async (tx) => {
      const session = await tx.session.findUnique({
        where: { id: params.id },
        include: { coach: true },
      });

      if (!session) {
        throw new Error("SESSION_NOT_FOUND");
      }

      if (session.status !== "published" && session.status !== "full") {
        throw new Error("SESSION_NOT_AVAILABLE");
      }

      if (session.spotsTaken >= session.maxSpots) {
        throw new Error("SESSION_FULL");
      }

      if (!session.coach.stripeAccountId) {
        throw new Error("COACH_STRIPE_NOT_CONFIGURED");
      }

      // ── 2. Créer le Booking en status "pending" ──────────────────────────
      const booking = await tx.booking.create({
        data: {
          sessionId:        session.id,
          participantEmail: email,
          participantName:  name,
          qrToken:          generateQrToken(),
          status:           "pending",
        },
      });

      return { session, booking };
    });

    // ── 3. Créer le PaymentIntent Stripe ────────────────────────────────────
    const paymentIntent = await createPaymentIntent({
      amountCents:          result.session.priceCents,
      coachStripeAccountId: result.session.coach.stripeAccountId!,
      metadata: {
        booking_id:  result.booking.id,
        session_id:  result.session.id,
        participant: email,
      },
    });

    // ── 4. Sauvegarder le PaymentIntent ID sur le Booking ───────────────────
    await db.booking.update({
      where: { id: result.booking.id },
      data:  { stripePaymentIntentId: paymentIntent.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId:    result.booking.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";

    const errorMap: Record<string, [string, number]> = {
      SESSION_NOT_FOUND:              ["Session introuvable", 404],
      SESSION_NOT_AVAILABLE:          ["Cette session n'est plus disponible", 400],
      SESSION_FULL:                   ["Session complète", 409],
      COACH_STRIPE_NOT_CONFIGURED:    ["Paiement non disponible pour cette session", 400],
    };

    const [error, status] = errorMap[message] ?? ["Erreur interne", 500];
    return NextResponse.json({ error }, { status });
  }
}
