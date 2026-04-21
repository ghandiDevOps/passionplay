import Link from "next/link";

export const metadata = { title: "CGU · Passion Spark" };

export default function CguPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-2xl mx-auto px-4 py-14">

        <Link href="/" className="font-display-md text-xs text-[#555] hover:text-[#FF7A00] transition-colors tracking-widest mb-10 inline-block">
          ← ACCUEIL
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">LÉGAL</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-2 leading-none">
            CONDITIONS<br />D&apos;UTILISATION
          </h1>
          <p className="text-[#444] text-xs mt-3">Dernière mise à jour : avril 2026</p>
        </div>

        <div className="space-y-8">
          <LegalSection title="1. Objet">
            Passion Spark est une plateforme de mise en relation entre des coachs proposant des sessions collectives et
            des participants souhaitant y assister. Les présentes CGU régissent l&apos;accès et l&apos;utilisation du service.
          </LegalSection>
          <LegalSection title="2. Inscription et compte">
            L&apos;utilisation de Passion Spark nécessite la création d&apos;un compte. L&apos;utilisateur s&apos;engage à fournir des
            informations exactes et à maintenir la confidentialité de ses identifiants.
          </LegalSection>
          <LegalSection title="3. Sessions et réservations">
            Les sessions sont créées par des coachs indépendants. Passion Spark n&apos;est pas responsable du contenu ou de la
            qualité des sessions. Le paiement est sécurisé via Stripe. Toute réservation confirmée et payée est
            définitive sauf annulation par le coach.
          </LegalSection>
          <LegalSection title="4. Commission et paiements">
            Passion Spark prélève une commission de 23% sur chaque réservation. Une commission additionnelle de 7% peut
            s&apos;appliquer en cas de parrainage. Le coach reçoit 70% du montant (ou 77% sans parrainage tiers).
          </LegalSection>
          <LegalSection title="5. Propriété intellectuelle">
            Tout le contenu publié sur Passion Spark (textes, logos, interface) est protégé par le droit de la propriété
            intellectuelle. Toute reproduction sans autorisation est interdite.
          </LegalSection>
          <LegalSection title="6. Données personnelles">
            Le traitement de vos données est décrit dans notre{" "}
            <Link href="/legal/privacy" className="text-[#FF7A00] hover:text-[#FFB700] transition-colors">
              Politique de confidentialité
            </Link>.
          </LegalSection>
          <LegalSection title="7. Droit applicable">
            Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris sont seuls compétents.
          </LegalSection>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex flex-wrap gap-4 text-xs text-[#444]">
          <span>Des questions ?</span>
          <Link href="/legal/contact" className="text-[#FF7A00] hover:text-[#FFB700] transition-colors">
            Contactez-nous
          </Link>
          <span>·</span>
          <Link href="/legal/privacy" className="text-[#555] hover:text-[#888] transition-colors">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </main>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#2a2a2a] pl-4">
      <h2 className="font-display-md text-xs text-[#FF7A00] tracking-[0.15em] mb-2">{title.toUpperCase()}</h2>
      <p className="text-[#888] text-sm leading-relaxed">{children}</p>
    </div>
  );
}
