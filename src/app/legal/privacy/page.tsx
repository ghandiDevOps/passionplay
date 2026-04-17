import Link from "next/link";

export const metadata = { title: "Confidentialité · PassionPlay" };

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <Link href="/" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
        ← Retour à l&apos;accueil
      </Link>
      <h1 style={{ fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 8 }}>Politique de confidentialité</h1>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 40 }}>Dernière mise à jour : avril 2026</p>

      <Legal title="Données collectées">
        Nous collectons : nom, prénom, adresse email, informations de paiement (traitées par Stripe, non stockées chez nous), historique des réservations et sessions.
      </Legal>
      <Legal title="Utilisation des données">
        Vos données servent à : gérer votre compte, traiter les réservations, vous envoyer les confirmations et QR codes de session, améliorer le service.
      </Legal>
      <Legal title="Partage des données">
        Nous ne vendons jamais vos données. Elles peuvent être partagées avec : Stripe (paiements), Clerk (authentification), Supabase (base de données), dans le cadre strict de la fourniture du service.
      </Legal>
      <Legal title="Cookies">
        PassionPlay utilise uniquement des cookies techniques nécessaires au fonctionnement du service (session, authentification). Aucun cookie publicitaire ou de tracking tiers.
      </Legal>
      <Legal title="Vos droits (RGPD)">
        Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à privacy@passionplay.fr.
      </Legal>
      <Legal title="Conservation">
        Les données sont conservées pendant la durée de votre compte, plus 3 ans pour les obligations légales (facturation).
      </Legal>

      <p style={{ marginTop: 48, fontSize: 13, color: "#888" }}>
        Questions sur vos données ?{" "}
        <Link href="/legal/contact" style={{ color: "#FF5500", textDecoration: "none" }}>Contactez-nous</Link>
      </p>
    </main>
  );
}

function Legal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#111" }}>{title}</h2>
      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}
