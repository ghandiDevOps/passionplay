import Link from "next/link";

export const metadata = { title: "CGU · PassionPlay" };

export default function CguPage() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <Link href="/" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
        ← Retour à l&apos;accueil
      </Link>
      <h1 style={{ fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 8 }}>Conditions Générales d&apos;Utilisation</h1>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 40 }}>Dernière mise à jour : avril 2026</p>

      <Legal title="1. Objet">
        PassionPlay est une plateforme de mise en relation entre des coachs proposant des sessions collectives et des participants souhaitant y assister. Les présentes CGU régissent l&apos;accès et l&apos;utilisation du service.
      </Legal>
      <Legal title="2. Inscription et compte">
        L&apos;utilisation de PassionPlay nécessite la création d&apos;un compte. L&apos;utilisateur s&apos;engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants.
      </Legal>
      <Legal title="3. Sessions et réservations">
        Les sessions sont créées par des coachs indépendants. PassionPlay n&apos;est pas responsable du contenu ou de la qualité des sessions. Le paiement est sécurisé via Stripe. Toute réservation confirmée et payée est définitive sauf annulation par le coach.
      </Legal>
      <Legal title="4. Commission et paiements">
        PassionPlay prélève une commission de 22% sur chaque réservation. Une commission additionnelle de 7% peut s&apos;appliquer en cas de parrainage. Le coach reçoit 70% du montant (ou 77% sans parrainage tiers).
      </Legal>
      <Legal title="5. Propriété intellectuelle">
        Tout le contenu publié sur PassionPlay (textes, logos, interface) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.
      </Legal>
      <Legal title="6. Données personnelles">
        Le traitement de vos données est décrit dans notre <Link href="/legal/privacy" style={{ color: "#FF5500" }}>Politique de confidentialité</Link>.
      </Legal>
      <Legal title="7. Droit applicable">
        Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris sont seuls compétents.
      </Legal>

      <p style={{ marginTop: 48, fontSize: 13, color: "#888" }}>
        Des questions ?{" "}
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
