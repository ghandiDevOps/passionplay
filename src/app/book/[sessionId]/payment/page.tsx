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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  const amountLabel = amountCents ? formatPrice(parseInt(amountCents)) : "";

  return (
    <main className="min-h-screen bg-white">
      <div className="page-container pt-10 space-y-8">

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">
            Dernière étape 🔥
          </h1>
          <p className="text-gray-500">
            Règle ta place et ton QR code t&apos;est envoyé immédiatement.
          </p>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary:        "#FF7A00",
                colorBackground:     "#ffffff",
                colorText:           "#111827",
                colorDanger:         "#ef4444",
                fontFamily:          "system-ui, sans-serif",
                borderRadius:        "12px",
                spacingUnit:         "4px",
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
