"use client";

import { useState } from "react";
import { APP_URL } from "@/constants";

interface SessionShareProps {
  slug: string;
  sessionTitle: string;
  priceCents: number;
}

export function SessionShare({ slug, sessionTitle, priceCents }: SessionShareProps) {
  const [copied, setCopied] = useState(false);
  const url = `${APP_URL}/s/${slug}`;
  const price = priceCents / 100;
  const message = `🔥 Je donne une session "${sessionTitle}" — ${price}€ seulement !\nSeulement quelques places 👉 ${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: sessionTitle, url });
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareInstagram = () => {
    // Instagram ne supporte pas le partage direct par URL
    // On copie le lien pour que le coach le colle dans ses stories
    copyLink();
    window.open("https://www.instagram.com", "_blank");
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-600">
        Partage maintenant pour remplir tes places :
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={shareWhatsApp}
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white
                     font-semibold py-3 px-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          📱 WhatsApp
        </button>

        <button
          onClick={shareInstagram}
          className="flex items-center justify-center gap-2 bg-gradient-to-r
                     from-purple-500 to-pink-500 text-white font-semibold
                     py-3 px-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          📸 Instagram
        </button>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={shareNative}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900
                       font-semibold py-3 px-4 rounded-2xl text-sm active:scale-95 transition-transform"
          >
            🔗 Partager
          </button>
        )}

        <button
          onClick={copyLink}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900
                     font-semibold py-3 px-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          {copied ? "✅ Copié !" : "📋 Copier le lien"}
        </button>
      </div>

      {/* Lien affiché */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2">
        <span className="text-sm text-gray-500 truncate flex-1">{url}</span>
        <button onClick={copyLink} className="text-passion-500 text-sm font-medium shrink-0">
          {copied ? "✅" : "Copier"}
        </button>
      </div>
    </div>
  );
}
