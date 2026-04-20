import type { SessionFormData } from "./types";

interface Props {
  data: SessionFormData;
  onChange: (patch: Partial<SessionFormData>) => void;
}

const EXAMPLE_ADDRESSES = [
  "Salle de sport Les Arènes, 12 rue des Arènes, Paris 5e",
  "Gymnase Municipale Croix-Rousse, Lyon 4e",
  "Court padel Le Havre Sport, Le Havre",
];

export function StepLocation({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">
        OÙ ÇA SE PASSE ?
      </h2>
      <p className="text-[#666] text-sm font-sans mb-8">
        Indique l&apos;adresse complète du lieu. Les participants la recevront à la confirmation.
      </p>

      <div className="space-y-6">

        {/* Adresse */}
        <div>
          <label className="font-display-md text-xs text-[#888] tracking-widest block mb-3">
            ADRESSE COMPLÈTE
          </label>
          <textarea
            rows={3}
            placeholder="Nom du lieu, adresse, ville, code postal"
            value={data.locationAddress}
            onChange={(e) => onChange({ locationAddress: e.target.value })}
            maxLength={200}
            className="w-full bg-[#1e1e1e] border border-[#2a2a2a] text-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-[#FF7A00] placeholder-[#444] transition-colors resize-none"
          />
          <p className="text-[#444] text-xs font-sans mt-1.5">
            {data.locationAddress.length}/200 caractères
          </p>
        </div>

        {/* Exemples */}
        <div>
          <p className="font-display-md text-xs text-[#555] tracking-widest mb-3">EXEMPLES</p>
          <div className="space-y-2">
            {EXAMPLE_ADDRESSES.map((addr) => (
              <button
                key={addr}
                type="button"
                onClick={() => onChange({ locationAddress: addr })}
                className="w-full text-left text-xs font-sans text-[#555] hover:text-[#FF7A00] py-2 border-b border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors"
              >
                {addr}
              </button>
            ))}
          </div>
        </div>

        {/* Note intégration Maps */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-4">
          <p className="font-display-md text-xs text-[#555] tracking-widest mb-1">INFO</p>
          <p className="text-[#444] text-xs font-sans leading-relaxed">
            La carte interactive sera disponible dans une prochaine version. Pour l&apos;instant, l&apos;adresse textuelle est partagée avec les participants.
          </p>
        </div>

        {/* Preview adresse */}
        {data.locationAddress && (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 flex items-start gap-3">
            <div className="w-1 h-full min-h-8 bg-[#FF7A00] shrink-0 self-stretch" />
            <div>
              <p className="font-display-md text-xs text-[#888] tracking-widest mb-1">LIEU SÉLECTIONNÉ</p>
              <p className="text-white text-sm font-sans">{data.locationAddress}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
