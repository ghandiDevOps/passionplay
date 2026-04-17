import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSessionDateTime } from "@/lib/utils/format-date";

export const metadata = { title: "Revenus · PassionPlay" };

export default async function EarningsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where:   { clerkId: userId },
    include: { coachProfile: true },
  });

  if (!user?.coachProfile) redirect("/onboarding");

  const now       = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [payouts, thisMonthBookings, allBookings] = await Promise.all([
    // Payouts listés
    db.payout.findMany({
      where:   { coachId: user.coachProfile.id },
      include: { session: { select: { title: true, dateStart: true, durationMin: true } } },
      orderBy: { createdAt: "desc" },
      take:    20,
    }),
    // Bookings ce mois
    db.booking.findMany({
      where: {
        session:  { coachId: user.coachProfile.id },
        status:   { in: ["confirmed", "attended"] },
        paidAt:   { gte: startOfMonth },
      },
      select: { amountPaidCents: true },
    }),
    // Total all time
    db.booking.findMany({
      where: {
        session: { coachId: user.coachProfile.id },
        status:  { in: ["confirmed", "attended"] },
      },
      select: { amountPaidCents: true },
    }),
  ]);

  const thisMonthGross  = thisMonthBookings.reduce((s, b) => s + (b.amountPaidCents ?? 0), 0);
  const totalGross      = allBookings.reduce((s, b) => s + (b.amountPaidCents ?? 0), 0);
  const thisMonthNet    = Math.round(thisMonthGross * 0.70);
  const totalNet        = Math.round(totalGross * 0.70);
  const pendingPayout   = payouts.filter((p) => p.status === "pending").reduce((s, p) => s + p.netAmountCents, 0);

  return (
    <div className="px-4 sm:px-6 py-8 space-y-8">

      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-[#FF7A00]" />
          <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">MES REVENUS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white">REVENUS</h1>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-5">
          <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-1">CE MOIS</p>
          <p className="font-display text-4xl text-[#FF7A00]">{formatPrice(thisMonthNet)}</p>
          <p className="font-sans text-xs text-[#444] mt-1">{formatPrice(thisMonthGross)} brut</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-5">
          <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-1">TOTAL ALL TIME</p>
          <p className="font-display text-4xl text-[#FF7A00]">{formatPrice(totalNet)}</p>
          <p className="font-sans text-xs text-[#444] mt-1">{formatPrice(totalGross)} brut</p>
        </div>
        {pendingPayout > 0 && (
          <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 p-5 col-span-2">
            <p className="font-display-md text-[10px] text-[#FF7A00] tracking-widest mb-1">EN ATTENTE DE VERSEMENT</p>
            <p className="font-display text-4xl text-[#FF7A00]">{formatPrice(pendingPayout)}</p>
            <p className="font-sans text-xs text-[#FF7A00]/60 mt-1">Versement sous 2–7 jours ouvrés</p>
          </div>
        )}
      </div>

      {/* ── Commission info ── */}
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-5">
        <p className="font-display-md text-[10px] text-[#555] tracking-widest mb-4">TON TAUX DE COMMISSION</p>
        <div className="w-full h-8 flex overflow-hidden border border-[#2a2a2a]">
          <div className="bg-[#FF7A00] flex items-center justify-center font-display-md text-xs text-white" style={{ width: "70%" }}>
            70% TOI
          </div>
          <div className="bg-[#FF7A00]/25 flex items-center justify-center font-display-md text-[10px] text-white/50" style={{ width: "22%" }}>
            22%
          </div>
          <div className="bg-[#222] flex items-center justify-center font-display-md text-[10px] text-white/30" style={{ width: "8%" }}>
            7%
          </div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-[#444] font-sans">
          <span>Tes revenus</span>
          <span>Plateforme</span>
          <span>Frais</span>
        </div>
        <p className="text-[#555] text-xs font-sans mt-3">
          Si tu ramènes toi-même tes participants → <strong className="text-[#888]">77%</strong> pour toi.
        </p>
      </div>

      {/* ── Historique payouts ── */}
      <div>
        <h2 className="font-display text-2xl text-white mb-4">HISTORIQUE</h2>

        {payouts.length === 0 ? (
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] p-10 text-center">
            <p className="font-display text-4xl text-[#2a2a2a] mb-3">0€</p>
            <p className="text-[#555] text-sm font-sans">
              Tes versements apparaîtront ici après ta première session.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {payouts.map((payout) => (
              <div key={payout.id} className="bg-[#1e1e1e] border border-[#2a2a2a] px-4 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-display-md text-sm text-white truncate">{payout.session.title}</p>
                  <p className="text-[#555] text-xs font-sans mt-0.5 capitalize">
                    {formatSessionDateTime(payout.session.dateStart, payout.session.durationMin)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-xl text-[#FF7A00]">{formatPrice(payout.netAmountCents)}</p>
                  <span className={`font-display-md text-[10px] ${
                    payout.status === "completed" ? "text-[#10b981]" :
                    payout.status === "pending"   ? "text-[#FF7A00]" :
                    "text-[#555]"
                  }`}>
                    {payout.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
