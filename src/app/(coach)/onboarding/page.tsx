"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DOMAIN_LABELS, DOMAIN_EMOJIS } from "@/constants";

type Step = 1 | 2 | 3;

const domains = Object.entries(DOMAIN_LABELS).map(([value, label]) => ({
  value,
  label,
  emoji: DOMAIN_EMOJIS[value],
}));

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleDomain = (value: string) => {
    setSelectedDomains((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    );
  };

  const handleStripeConnect = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/coach/stripe-connect", { method: "POST" });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="page-container pt-10">

        {/* Progress bar */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-passion-500" : "bg-gray-100"
              }`}
            />
          ))}
        </div>

        {/* Étape 1 : Domaines */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Quelle est ta passion ?
              </h1>
              <p className="text-gray-500 mt-1">
                Sélectionne un ou plusieurs domaines que tu maîtrises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {domains.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => toggleDomain(value)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedDomains.includes(value)
                      ? "border-passion-500 bg-passion-50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <p className="font-semibold text-gray-900 mt-1">{label}</p>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={selectedDomains.length === 0}
              fullWidth
            >
              Continuer →
            </Button>
          </div>
        )}

        {/* Étape 2 : Bio */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Présente-toi en 1 phrase
              </h1>
              <p className="text-gray-500 mt-1">
                Qu&apos;est-ce qui te rend unique dans ta pratique ?
              </p>
            </div>

            <div className="space-y-1.5">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ex : Passionné de MMA depuis 12 ans, j'ai appris à tomber avant d'apprendre à frapper."
                maxLength={140}
                rows={3}
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:ring-2
                           focus:ring-passion-500 resize-none text-base"
              />
              <p className="text-xs text-right text-gray-400">{bio.length}/140</p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} fullWidth>
                ← Retour
              </Button>
              <Button onClick={() => setStep(3)} fullWidth>
                Continuer →
              </Button>
            </div>
          </div>
        )}

        {/* Étape 3 : Stripe Connect */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                Reçois tes paiements 💸
              </h1>
              <p className="text-gray-600 mt-2 leading-relaxed">
                PassionPlay utilise Stripe pour virer tes revenus directement sur ton
                compte bancaire. L&apos;inscription prend 3 minutes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <p className="text-sm text-gray-600">
                  Stripe est le leader mondial des paiements — 100% sécurisé.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">💳</span>
                <p className="text-sm text-gray-600">
                  Tu auras besoin de ton IBAN et d&apos;une pièce d&apos;identité.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <p className="text-sm text-gray-600">
                  Versements chaque lundi pour les sessions de la semaine précédente.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(2)} fullWidth>
                ← Retour
              </Button>
              <Button onClick={handleStripeConnect} loading={isLoading} fullWidth>
                Connecter mon compte →
              </Button>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full text-sm text-gray-400 text-center"
            >
              Passer pour l&apos;instant (tu pourras le faire plus tard)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
