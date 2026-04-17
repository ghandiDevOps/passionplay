import Link from "next/link";

export const metadata = { title: "Contact · PassionPlay" };

const FLAME = "linear-gradient(90deg, #FFB700 0%, #FF3D00 100%)";

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <Link href="/" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
        ← Retour à l&apos;accueil
      </Link>

      <h1 style={{ fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 6 }}>Contact</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 40 }}>Une question ? Un problème ? On répond sous 24h.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        <ContactCard
          icon="📧"
          title="Email général"
          value="hello@passionplay.fr"
          href="mailto:hello@passionplay.fr"
        />
        <ContactCard
          icon="🔒"
          title="Données personnelles (RGPD)"
          value="privacy@passionplay.fr"
          href="mailto:privacy@passionplay.fr"
        />
        <ContactCard
          icon="🤝"
          title="Partenariats & presse"
          value="partenaires@passionplay.fr"
          href="mailto:partenaires@passionplay.fr"
        />
      </div>

      <div style={{ background: "#F5F4F2", borderRadius: 14, padding: "24px", border: "1px solid #EBEBEB" }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 6 }}>Tu es coach ?</p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>
          Crée ton compte directement et commence à proposer des sessions en 5 minutes. Aucun justificatif requis pour démarrer.
        </p>
        <Link href="/sign-up" style={{
          display: "inline-block", fontWeight: 800, fontSize: 14,
          background: FLAME, color: "#fff", padding: "12px 20px",
          borderRadius: 10, textDecoration: "none",
        }}>
          Créer mon compte coach →
        </Link>
      </div>

      <p style={{ marginTop: 36, fontSize: 12, color: "#AAA", textAlign: "center" }}>
        PassionPlay · Paris, France · © 2026
      </p>
    </main>
  );
}

function ContactCard({ icon, title, value, href }: { icon: string; title: string; value: string; href: string }) {
  return (
    <a href={href} style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "#FFFFFF", borderRadius: 12, padding: "16px 18px",
      border: "1px solid #EBEBEB", textDecoration: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#888", margin: "0 0 2px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{title}</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#FF5500", margin: 0 }}>{value}</p>
      </div>
    </a>
  );
}
