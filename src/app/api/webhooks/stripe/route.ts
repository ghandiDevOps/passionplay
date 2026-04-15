import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { db } from "@/lib/db";
import { generateQrToken } from "@/lib/utils/generate-qr-token";
import { addMinutes, subHours, subDays } from "date-fns";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error("[Stripe Webhook] Invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {

      // ── Paiement confirmé ───────────────────────────────────────────────
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(pi);
        break;
      }

      // ── Remboursement ───────────────────────────────────────────────────
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleChargeRefunded(charge);
        break;
      }

      // ── Stripe Connect : compte activé ──────────────────────────────────
      case "account.updated": {
        const account = event.data.object as Stripe.Account;
        await handleAccountUpdated(account);
        break;
      }

      default:
        // Ignorer les événements non gérés
        break;
    }
  } catch (err) {
    console.error(`[Stripe Webhook] Handler error (${event.type}):`, err);
    // Retourner 500 pour que Stripe retente le webhook
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ── Handlers ────────────────────────────────────────────────────────────────

async function handlePaymentSucceeded(pi: Stripe.PaymentIntent) {
  const bookingId = pi.metadata?.booking_id;
  if (!bookingId) return;

  // Idempotence : si déjà confirmé, on ignore
  const existing = await db.booking.findUnique({ where: { id: bookingId } });
  if (!existing || existing.status === "confirmed") return;

  // Transaction atomique
  await db.$transaction(async (tx) => {
    // 1. Confirmer le booking
    const booking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        status:          "confirmed",
        stripeChargeId:  pi.latest_charge as string,
        amountPaidCents: pi.amount_received,
        paidAt:          new Date(),
        qrToken:         generateQrToken(), // Régénérer après paiement confirmé
      },
    });

    // 2. Incrémenter spots_taken (atomique)
    const session = await tx.session.update({
      where: { id: booking.sessionId },
      data:  { spotsTaken: { increment: 1 } },
    });

    // 3. Si session pleine → passer en "full"
    if (session.spotsTaken >= session.maxSpots) {
      await tx.session.update({
        where: { id: session.id },
        data:  { status: "full" },
      });
    }

    // 4. Planifier les rappels
    const dateStart = session.dateStart;
    const reminderD1 = subDays(new Date(dateStart.setHours(18, 0, 0, 0)), 1);
    const reminderH2 = subHours(dateStart, 2);
    const postSession = addMinutes(addMinutes(dateStart, session.durationMin), 120);

    await tx.notification.createMany({
      data: [
        {
          recipientEmail: booking.participantEmail,
          type:           "booking_reminder_d1",
          channel:        "email",
          subject:        `Demain, tu vis ta session ! 🎯`,
          body:           JSON.stringify({ bookingId: booking.id }),
          scheduledAt:    reminderD1,
        },
        {
          recipientEmail: booking.participantEmail,
          type:           "booking_reminder_h2",
          channel:        "email",
          subject:        `Dans 2h, ça commence ! Voici ton QR code 🔥`,
          body:           JSON.stringify({ bookingId: booking.id }),
          scheduledAt:    reminderH2,
        },
        {
          recipientEmail: booking.participantEmail,
          type:           "session_post_review",
          channel:        "email",
          subject:        `Alors, c'était comment ? ⭐`,
          body:           JSON.stringify({ bookingId: booking.id }),
          scheduledAt:    postSession,
        },
      ],
      skipDuplicates: true,
    });
  });

  console.log(`[Stripe] Booking ${bookingId} confirmed`);
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  if (!charge.payment_intent) return;

  const booking = await db.booking.findFirst({
    where: { stripePaymentIntentId: charge.payment_intent as string },
  });

  if (!booking) return;

  await db.booking.update({
    where: { id: booking.id },
    data: {
      status:     "cancelled",
      refundedAt: new Date(),
    },
  });
}

async function handleAccountUpdated(account: Stripe.Account) {
  if (!account.charges_enabled) return;

  await db.coachProfile.updateMany({
    where: { stripeAccountId: account.id },
    data:  { stripeOnboardingStatus: "active" },
  });

  console.log(`[Stripe Connect] Account ${account.id} activated`);
}
