import type { SessionFormData } from "./types";

interface Props {
  data: SessionFormData;
  onChange: (patch: Partial<SessionFormData>) => void;
}

export function StepType({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">
        QUEL TYPE DE SESSION ?
      </h2>
      <p className="text-[#666] text-sm font-sans mb-8">
        Le type définit le public ciblé et le prix recommandé.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* DÉCOUVERTE */}
        <button
          type="button"
          onClick={() => onChange({ sessionType: "discovery" })}
          className={`text-left p-6 border transition-all duration-120 relative overflow-hidden group ${
            data.sessionType === "discovery"
              ? "border-[#10b981] bg-[#10b981]/10"
              : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#10b981]/50"
          }`}
        >
          {data.sessionType === "discovery" && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <span className="badge-discover mb-4 block w-fit">DÉCOUVERTE</span>
          <h3 className="font-display text-2xl text-white mb-2">Première fois.</h3>
          <p className="text-[#888] text-sm font-sans leading-relaxed">
            Zéro prérequis. Tu accueilles des gens qui n&apos;ont jamais pratiqué et veulent ressentir pour la première fois.
          </p>
          <p className="font-display-md text-xs text-[#10b981] mt-4">13 – 16€ recommandé</p>
        </button>

        {/* PROGRESSION */}
        <button
          type="button"
          onClick={() => onChange({ sessionType: "progression" })}
          className={`text-left p-6 border transition-all duration-120 relative overflow-hidden group ${
            data.sessionType === "progression"
              ? "border-[#3b82f6] bg-[#3b82f6]/10"
              : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#3b82f6]/50"
          }`}
        >
          {data.sessionType === "progression" && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#3b82f6] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <span className="badge-progress mb-4 block w-fit">PROGRESSION</span>
          <h3 className="font-display text-2xl text-white mb-2">Débloquer un point.</h3>
          <p className="text-[#888] text-sm font-sans leading-relaxed">
            Pour les pratiquants. Tu cibles une compétence précise et tu donnes des clés concrètes applicables immédiatement.
          </p>
          <p className="font-display-md text-xs text-[#3b82f6] mt-4">16 – 20€ recommandé</p>
        </button>
      </div>
    </div>
  );
}
