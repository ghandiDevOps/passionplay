"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn-passion-outline text-xs px-4 py-2 min-h-0 shrink-0"
    >
      {copied ? "COPIÉ ✓" : "COPIER"}
    </button>
  );
}
