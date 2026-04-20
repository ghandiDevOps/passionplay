"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  qrToken: string;
  sessionTitle: string;
  isUsable: boolean; // false si attended / cancelled / session passée
}

export function BookingQrCard({ qrToken, sessionTitle, isUsable }: Props) {
  const [open, setOpen] = useState(false);

  if (!isUsable) return null;

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="font-display-md text-xs text-[#FF7A00] tracking-widest flex items-center gap-2"
      >
        {open ? "▲ CACHER LE QR CODE" : "▼ AFFICHER MON QR CODE"}
      </button>

      {open && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <QRCodeSVG value={qrToken} size={180} level="H" includeMargin />
          </div>
          <p className="text-xs text-[#555] text-center">
            Montre ce QR code à l&apos;entrée · {sessionTitle}
          </p>
        </div>
      )}
    </div>
  );
}
