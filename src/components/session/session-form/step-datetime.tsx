import type { SessionFormData } from "./types";

interface Props {
  data: SessionFormData;
  onChange: (patch: Partial<SessionFormData>) => void;
}

// Créneaux toutes les 30 minutes de 06h00 à 22h00
const TIME_SLOTS: string[] = [];
for (let h = 6; h <= 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 22) TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

// Date minimum : demain
function minDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// Date max : 6 mois
function maxDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().split("T")[0];
}

export function StepDatetime({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">
        QUAND ? COMBIEN DE TEMPS ?
      </h2>
      <p className="text-[#666] text-sm font-sans mb-8">
        Choisis la date, l&apos;heure de début et la durée de ta session.
      </p>

      <div className="space-y-6">

        {/* Date */}
        <div>
          <label className="font-display-md text-xs text-[#888] tracking-widest block mb-3">
            DATE
          </label>
          <input
            type="date"
            min={minDate()}
            max={maxDate()}
            value={data.dateStr}
            onChange={(e) => onChange({ dateStr: e.target.value })}
            className="w-full bg-[#1e1e1e] border border-[#2a2a2a] text-white text-sm font-sans px-4 py-3 focus:outline-none focus:border-[#FF7A00] transition-colors [color-scheme:dark]"
          />
        </div>

        {/* Heure */}
        <div>
          <label className="font-display-md text-xs text-[#888] tracking-widest block mb-3">
            HEURE DE DÉBUT
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onChange({ timeStr: slot })}
                className={`font-display-md text-sm py-2.5 border transition-colors duration-120 ${
                  data.timeStr === slot
                    ? "border-[#FF7A00] bg-[#FF7A00]/10 text-[#FF7A00]"
                    : "border-[#2a2a2a] text-[#555] hover:border-[#FF7A00]/50 hover:text-[#888]"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Durée */}
        <div>
          <label className="font-display-md text-xs text-[#888] tracking-widest block mb-3">
            DURÉE
          </label>
          <div className="grid grid-cols-2 gap-4">
            {([60, 120] as const).map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => onChange({ durationMin: min })}
                className={`p-5 border text-left transition-all duration-120 ${
                  data.durationMin === min
                    ? "border-[#FF7A00] bg-[#FF7A00]/10"
                    : "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#FF7A00]/50"
                }`}
              >
                <span className="font-display text-4xl text-white block leading-none mb-1">
                  {min}<span className="text-2xl text-[#555]">min</span>
                </span>
                <span className="font-display-md text-xs text-[#666]">
                  {min === 60 ? "Format standard" : "Session intensive"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Récap */}
        {data.dateStr && data.timeStr && (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-4 flex items-center gap-3">
            <div className="w-1 h-10 bg-[#FF7A00] shrink-0" />
            <div>
              <p className="font-display-md text-xs text-[#888] tracking-widest mb-1">RÉCAP</p>
              <p className="text-white text-sm font-sans">
                {new Date(`${data.dateStr}T${data.timeStr}`).toLocaleDateString("fr-FR", {
                  weekday: "long", day: "numeric", month: "long",
                })} à {data.timeStr} · {data.durationMin} min
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
