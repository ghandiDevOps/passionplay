"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

interface Props {
  sessionId: string;
  bookingId: string;
  amountLabel: string;
}

export function PaymentForm({ sessionId, bookingId, amountLabel }: Props) {
  const stripe   = useStripe();
  const elements = useElements();
  const router   = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/book/${sessionId}/confirmation?booking_id=${bookingId}`,
      },
    });

    // confirmPayment redirige automatiquement en cas de succès
    // On arrive ici uniquement en cas d'erreur
    if (stripeError) {
      if (stripeError.type === "card_error" || stripeError.type === "validation_error") {
        setError(stripeError.message ?? "Paiement refusé.");
      } else {
        setError("Une erreur est survenue. Réessaie dans un instant.");
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["apple_pay", "google_pay", "card"],
        }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        loading={isLoading}
        fullWidth
      >
        Payer {amountLabel}
      </Button>

      <p className="text-xs text-center text-gray-400">
        Paiement sécurisé par Stripe · Tu peux annuler jusqu&apos;à 24h avant la session.
      </p>
    </form>
  );
}
