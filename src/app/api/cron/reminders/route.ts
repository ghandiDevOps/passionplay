import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Sécurité : ce cron ne peut être appelé que par Vercel Cron
// Vercel envoie un header Authorization avec le CRON_SECRET
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const now = new Date();

  // Récupérer toutes les notifications non envoyées dont l'heure est passée
  const pending = await db.notification.findMany({
    where: {
      sent:        false,
      scheduledAt: { lte: now },
      error:       null,
    },
    take: 100, // Traiter par batch de 100
  });

  console.log(`[Cron/Reminders] Processing ${pending.length} notifications`);

  let sent = 0;
  let failed = 0;

  for (const notification of pending) {
    try {
      // Import dynamique pour éviter les circular imports
      await processNotification(notification);

      await db.notification.update({
        where: { id: notification.id },
        data:  { sent: true, sentAt: new Date() },
      });

      sent++;
    } catch (err) {
      console.error(`[Cron] Failed to send notification ${notification.id}:`, err);

      await db.notification.update({
        where: { id: notification.id },
        data:  { error: err instanceof Error ? err.message : "Unknown error" },
      });

      failed++;
    }
  }

  return NextResponse.json({
    processed: pending.length,
    sent,
    failed,
  });
}

// Traitement d'une notification selon son type
async function processNotification(notification: {
  id: string;
  type: string;
  recipientEmail: string;
  body: string;
}) {
  const metadata = JSON.parse(notification.body);

  // On importe les emails dynamiquement pour éviter les erreurs de build
  // Les templates seront créés dans /emails
  console.log(
    `[Notification] Sending ${notification.type} to ${notification.recipientEmail}`,
    metadata,
  );

  // TODO: Implémenter les envois réels avec Resend
  // Exemple :
  // const { sendEmail } = await import("@/lib/resend");
  // await sendEmail({ to: notification.recipientEmail, subject: notification.subject, react: ... });
}
