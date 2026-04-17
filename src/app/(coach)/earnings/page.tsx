import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = { title: "Revenus · PassionPlay" };

const FLAME = "linear-gradient(90deg, #FFB700 0%, #FF3D00 100%)";

export default async function EarningsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="px-4 pt-8 pb-24">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Mes revenus</h1>

      {/* Résumé rapide */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: FLAME }} />
          <p className="text-xs text-gray-400 font-semibold mb-1">CE MOIS</p>
          <p className="text-3xl font-black" style={{ background: FLAME, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            0€
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: FLAME }} />
          <p className="text-xs text-gray-400 font-semibold mb-1">TOTAL</p>
          <p className="text-3xl font-black" style={{ background: FLAME, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            0€
          </p>
        </div>
      </div>

      {/* Commission info */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
        <p className="text-xs font-bold text-gray-400 mb-3">TON TAUX DE COMMISSION</p>
        <div className="rounded-xl overflow-hidden flex h-10">
          <div className="w-[70%] flex items-center justify-center text-sm font-black text-white" style={{ background: FLAME }}>
            70% TOI
          </div>
          <div className="w-[22%] flex items-center justify-center text-xs font-bold text-gray-400 bg-gray-200">
            22%
          </div>
          <div className="w-[8%] flex items-center justify-center text-xs text-gray-300 bg-gray-300">
            7%
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Tu ramènes tes participants → tu gardes <strong className="text-gray-600">77%</strong>
        </p>
      </div>

      {/* Placeholder transactions */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
        <p className="text-4xl mb-3">💰</p>
        <p className="font-bold text-gray-900 mb-1">Aucune transaction</p>
        <p className="text-sm text-gray-500">
          Tes revenus apparaîtront ici dès ta première session complète.
        </p>
      </div>
    </div>
  );
}
