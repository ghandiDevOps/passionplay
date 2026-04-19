"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "@/components/booking/payment-element";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "@/lib/utils/format-price";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Props {
  params: { sessionId: string };
}

export default function PaymentPage({ params }: Props) {
  const searchParams  = useSearchParams();
  const clientSecret  = searchParams.get("client_secret");
  const bookingId     = searchParams.get("booking_id");
  const amountCents   = searchParams.get("amount");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (clientSecret && bookingId) setReady(true);
  }, [clientSecret, bookingId]);

  if (!ready || !clientSecret || !bookingId) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  const amountLabel = amountCents ? formatPrice(parseInt(amountCents)) : "";

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <div className="page-container pt-10 space-y-8">

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">PAIEMENT SÉCURISÉ</span>
          </div>
          <h1 className="font-display text-4xl text-white">
            DERNIÈRE ÉTAPE
          </h1>
          <p className="text-[#555] text-sm">
            Règle ta place et ton QR code t&apos;est envoyé immédiatement.
          </p>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary:        "#FF7A00",
                colorBackground:     "#1e1e1e",
                colorText:           "#ffffff",
                colorTextSecondary:  "#888888",
                colorDanger:         "#FF3D00",
                colorIcon:           "#FF7A00",
                fontFamily:          "system-ui, sans-serif",
                borderRadius:        "0px",
                spacingUnit:         "4px",
              },
              rules: {
                ".Input": {
                  border:      "1px solid #2a2a2a",
                  backgroundColor: "#1a1a1a",
                },
                ".Input:focus": {
                  border:     "1px solid #FF7A00",
                  boxShadow:  "none",
                },
                ".Label": {
                  color:      "#888",
                  fontSize:   "12px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                },
              },
            },
            locale: "fr",
          }}
        >
          <PaymentForm
            sessionId={params.sessionId}
            bookingId={bookingId}
            amountLabel={amountLabel}
          />
        </Elements>

      </div>
    </main>
  );
}
