import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: { coachProfile: true },
    });

    if (!user?.coachProfile) {
      return Response.json({ error: "Coach profile not found" }, { status: 404 });
    }

    // Créer ou récupérer le compte Stripe Connect Express
    let stripeAccountId = user.coachProfile.stripeAccountId;

    if (!stripeAccountId) {
      // Créer un nouveau compte Stripe Connect Express
      const account = await stripe.accounts.create({
        type: "express",
        country: "FR",
        email: user.email,
        business_type: "individual",
        individual: {
          first_name: user.name.split(" ")[0],
          last_name: user.name.split(" ").slice(1).join(" "),
          email: user.email,
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      stripeAccountId = account.id;

      // Mettre à jour le profil coach avec l'ID du compte
      await db.coachProfile.update({
        where: { id: user.coachProfile.id },
        data: { stripeAccountId },
      });
    }

    // Créer un lien d'onboarding Stripe
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      type: "account_onboarding",
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?stripe_success=true`,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?stripe_refresh=true`,
    });

    return Response.json({ url: accountLink.url });
  } catch (error) {
    console.error("[STRIPE_CONNECT_ERROR]", error);
    return Response.json(
      { error: "Failed to create Stripe onboarding link" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: { coachProfile: true },
    });

    if (!user?.coachProfile?.stripeAccountId) {
      return Response.json({ status: "not_started" });
    }

    // Récupérer le statut du compte Stripe
    const account = await stripe.accounts.retrieve(user.coachProfile.stripeAccountId);

    const chargesEnabled = account.charges_enabled;
    const payoutsEnabled = account.payouts_enabled;
    const requirementsStatus = account.requirements?.current_deadline
      ? "pending"
      : "complete";

    // Mettre à jour le statut dans la base de données
    const newStatus =
      chargesEnabled && payoutsEnabled ? "active" : requirementsStatus === "pending" ? "pending" : "incomplete";

    if (user.coachProfile.stripeOnboardingStatus !== newStatus) {
      await db.coachProfile.update({
        where: { id: user.coachProfile.id },
        data: { stripeOnboardingStatus: newStatus as any },
      });
    }

    return Response.json({
      status: newStatus,
      chargesEnabled,
      payoutsEnabled,
      requirements: account.requirements?.currently_due || [],
    });
  } catch (error) {
    console.error("[STRIPE_STATUS_ERROR]", error);
    return Response.json(
      { error: "Failed to check Stripe status" },
      { status: 500 }
    );
  }
}
