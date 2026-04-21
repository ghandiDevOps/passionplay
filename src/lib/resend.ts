import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Passion Spark <noreply@passionspark.fr>";

export type EmailPayload = {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
};

/**
 * Envoi générique d'un email via Resend
 */
export async function sendEmail({ to, subject, react }: EmailPayload) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      react,
    });

    if (error) {
      console.error("[Resend] Error sending email:", error);
      throw new Error(`Email send failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("[Resend] Unexpected error:", err);
    throw err;
  }
}
