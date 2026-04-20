"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PassionPlay GlobalError]", error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#1a1a1a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1rem" }}>
          <div style={{ width: 2, height: 48, background: "#FF7A00", margin: "0 auto 2rem" }} />
          <p style={{ fontSize: "3rem", fontWeight: 900, color: "#FF7A00", textTransform: "uppercase", margin: "0 0 1rem" }}>
            ERREUR CRITIQUE
          </p>
          <p style={{ color: "#555", marginBottom: "2rem", fontSize: "0.875rem" }}>
            Une erreur critique s&apos;est produite. Veuillez recharger la page.
          </p>
          {error.digest && (
            <p style={{ color: "#333", fontSize: "0.75rem", fontFamily: "monospace", marginBottom: "1.5rem" }}>
              ref: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{ background: "#FF7A00", color: "#fff", border: "none", padding: "0.875rem 2rem", fontWeight: 800, textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}
          >
            RECHARGER
          </button>
        </main>
      </body>
    </html>
  );
}
