"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name:  z.string().min(2, "Ton prénom doit faire au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  params: { sessionId: string };
}

export default function BookingPage({ params }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/sessions/${params.sessionId}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue. Réessaie.");
        return;
      }

      // Redirection vers la page paiement avec le client_secret
      router.push(
        `/book/${params.sessionId}/payment?client_secret=${json.clientSecret}&booking_id=${json.bookingId}`,
      );
    } catch {
      setError("Problème de connexion. Réessaie dans un instant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="page-container pt-10">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-gray-900">
              Tu es à 30 secondes 🎯
            </h1>
            <p className="text-gray-500">
              Juste ton prénom et ton email pour réserver ta place.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Ton prénom"
              placeholder="Léa"
              autoComplete="given-name"
              autoFocus
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Ton email"
              type="email"
              placeholder="toi@email.com"
              autoComplete="email"
              error={errors.email?.message}
              hint="Tu recevras ton QR code ici"
              {...register("email")}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                loading={isLoading}
                disabled={!isValid}
                fullWidth
              >
                Continuer vers le paiement →
              </Button>
            </div>
          </form>

          <p className="text-xs text-center text-gray-400">
            En continuant, tu acceptes les{" "}
            <a href="/cgu" className="underline">CGU</a>{" "}
            et la{" "}
            <a href="/confidentialite" className="underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
