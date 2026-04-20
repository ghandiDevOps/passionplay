import Link from "next/link";

export const metadata = { title: "Confidentialité · PassionPlay" };

export default function PrivacyPage() {
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
            POLITIQUE DE<br />CONFIDENTIALITÉ
          </h1>
          <p className="text-[#444] text-xs mt-3">Dernière mise à jour : avril 2026</p>
        </div>

        <div className="space-y-8">
          <LegalSection title="Données collectées">
            Nous collectons : nom, prénom, adresse email, informations de paiement (traitées par Stripe, non stockées
            chez nous), historique des réservations et sessions.
          </LegalSection>
          <LegalSection title="Utilisation des données">
            Vos données servent à : gérer votre compte, traiter les réservations, vous envoyer les confirmations et
            QR codes de session, améliorer le service.
          </LegalSection>
          <LegalSection title="Partage des données">
            Nous ne vendons jamais vos données. Elles peuvent être partagées avec : Stripe (paiements), Clerk
            (authentification), Supabase (base de données), dans le cadre strict de la fourniture du service.
          </LegalSection>
          <LegalSection title="Cookies">
            PassionPlay utilise uniquement des cookies techniques nécessaires au fonctionnement du service (session,
            authentification). Aucun cookie publicitaire ou de tracking tiers.
          </LegalSection>
          <LegalSection title="Vos droits (RGPD)">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données.
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:privacy@passionplay.fr" className="text-[#FF7A00] hover:text-[#FFB700] transition-colors">
              privacy@passionplay.fr
            </a>.
          </LegalSection>
          <LegalSection title="Conservation">
            Les données sont conservées pendant la durée de votre compte, plus 3 ans pour les obligations légales
            (facturation).
          </LegalSection>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex flex-wrap gap-4 text-xs text-[#444]">
          <span>Questions sur vos données ?</span>
          <Link href="/legal/contact" className="text-[#FF7A00] hover:text-[#FFB700] transition-colors">
            Contactez-nous
          </Link>
          <span>·</span>
          <Link href="/legal/cgu" className="text-[#555] hover:text-[#888] transition-colors">
            CGU
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
