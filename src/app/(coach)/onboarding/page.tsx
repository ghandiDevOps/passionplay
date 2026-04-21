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
    <main className="min-h-screen bg-[#1a1a1a]">
      <div className="page-container pt-10">

        {/* Progress bar */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-0.5 flex-1 transition-colors ${
                s <= step ? "bg-[#FF7A00]" : "bg-[#2a2a2a]"
              }`}
            />
          ))}
        </div>

        {/* Étape 1 : Domaines */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF7A00]" />
                <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">ÉTAPE 1 / 3</span>
              </div>
              <h1 className="font-display text-4xl text-white">
                QUELLE EST TA PASSION ?
              </h1>
              <p className="text-[#555] mt-2 text-sm">
                Sélectionne un ou plusieurs domaines que tu maîtrises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {domains.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => toggleDomain(value)}
                  className={`p-4 border text-left transition-all ${
                    selectedDomains.includes(value)
                      ? "border-[#FF7A00] bg-[#FF7A00]/10"
                      : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#FF7A00]/40"
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <p className="font-display text-sm text-white mt-1">{label.toUpperCase()}</p>
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
          <div className="space-y-6 animate-fade-up">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF7A00]" />
                <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">ÉTAPE 2 / 3</span>
              </div>
              <h1 className="font-display text-4xl text-white">
                PRÉSENTE-TOI EN 1 PHRASE
              </h1>
              <p className="text-[#555] mt-2 text-sm">
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
                className="w-full px-4 py-3.5 bg-[#1e1e1e] border border-[#2a2a2a] text-white
                           placeholder:text-[#444] focus:outline-none focus:border-[#FF7A00]
                           resize-none text-base transition-colors"
              />
              <p className="text-xs text-right text-[#555]">{bio.length}/140</p>
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
          <div className="space-y-6 animate-fade-up">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF7A00]" />
                <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">ÉTAPE 3 / 3</span>
              </div>
              <h1 className="font-display text-4xl text-white">
                REÇOIS TES PAIEMENTS
              </h1>
              <p className="text-[#555] mt-2 text-sm leading-relaxed">
                Passion Spark utilise Stripe pour virer tes revenus directement sur ton
                compte bancaire. L&apos;inscription prend 3 minutes.
              </p>
            </div>

            <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 space-y-4">
              {[
                { icon: "🔒", text: "Stripe est le leader mondial des paiements — 100% sécurisé." },
                { icon: "💳", text: "Tu auras besoin de ton IBAN et d'une pièce d'identité." },
                { icon: "📅", text: "Versements chaque lundi pour les sessions de la semaine précédente." },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-start gap-3">
                  <span className="text-xl">{icon}</span>
                  <p className="text-sm text-[#888]">{text}</p>
                </div>
              ))}
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
              className="w-full text-sm text-[#555] text-center hover:text-[#888] transition-colors"
            >
              Passer pour l&apos;instant (tu pourras le faire plus tard)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
