import Link from "next/link";

export const metadata = { title: "Contact · Passion Spark" };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-xl mx-auto px-4 py-14">

        <Link href="/" className="font-display-md text-xs text-[#555] hover:text-[#FF7A00] transition-colors tracking-widest mb-10 inline-block">
          ← ACCUEIL
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">SUPPORT</span>
          </div>
          <h1 className="font-display text-5xl text-white mb-2">CONTACT</h1>
          <p className="text-[#555] text-sm">Une question ? Un problème ? On répond sous 24h.</p>
        </div>

        <div className="flex flex-col gap-3 mb-10">
          <ContactCard
            icon="📧"
            title="EMAIL GÉNÉRAL"
            value="hello@passionspark.fr"
            href="mailto:hello@passionspark.fr"
          />
          <ContactCard
            icon="🔒"
            title="DONNÉES PERSONNELLES (RGPD)"
            value="privacy@passionspark.fr"
            href="mailto:privacy@passionspark.fr"
          />
          <ContactCard
            icon="🤝"
            title="PARTENARIATS & PRESSE"
            value="partenaires@passionspark.fr"
            href="mailto:partenaires@passionspark.fr"
          />
        </div>

        <div className="bg-[#1e1e1e] border border-[#FF7A00]/20 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">TU ES COACH ?</span>
          </div>
          <p className="font-display text-xl text-white mb-1">SOIS PARMI LES PREMIERS.</p>
          <p className="text-[#555] text-sm mb-5 leading-relaxed">
            Crée ton compte et commence à proposer des sessions en 5 minutes. Aucun justificatif requis.
          </p>
          <Link href="/sign-up" className="btn-passion inline-block px-6 text-sm">
            CRÉER MON COMPTE COACH →
          </Link>
        </div>

        <p className="mt-10 text-xs text-[#333] text-center">
          Passion Spark · Paris, France · © 2026
        </p>
      </div>
    </main>
  );
}

function ContactCard({ icon, title, value, href }: { icon: string; title: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 bg-[#1e1e1e] border border-[#2a2a2a] p-4 hover:border-[#FF7A00]/40 transition-colors group"
    >
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <p className="font-display-md text-[10px] text-[#555] tracking-[0.15em] mb-0.5">{title}</p>
        <p className="font-display-md text-sm text-[#FF7A00] group-hover:text-[#FFB700] transition-colors">{value}</p>
      </div>
    </a>
  );
}
