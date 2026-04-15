"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import jsQR from "jsqr";

type ScanState = "idle" | "scanning" | "success" | "error";

interface ScanResult {
  success: boolean;
  participantName?: string;
  error?: string;
  code?: string;
}

export default function ScanPage() {
  const params = useParams<{ id: string }>();
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scanState, setScanState]       = useState<ScanState>("idle");
  const [result, setResult]             = useState<ScanResult | null>(null);
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [isCamera, setIsCamera]         = useState(false);

  // Démarrer la caméra
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Caméra arrière sur mobile
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCamera(true);
        requestAnimationFrame(scanFrame);
      }
    } catch {
      console.error("Impossible d'accéder à la caméra");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
    }
  };

  // Boucle de scan frame-by-frame
  const scanFrame = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code?.data && scanState !== "scanning") {
      validateQrToken(code.data);
    } else {
      requestAnimationFrame(scanFrame);
    }
  };

  const validateQrToken = async (token: string) => {
    setScanState("scanning");

    try {
      const res = await fetch(`/api/sessions/${params.id}/scan`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ qrToken: token }),
      });

      const data: ScanResult = await res.json();
      setResult(data);
      setScanState(data.success ? "success" : "error");

      if (data.success) {
        setAttendeesCount((c) => c + 1);
      }

      // Reset après 2 secondes
      setTimeout(() => {
        setScanState("idle");
        setResult(null);
        requestAnimationFrame(scanFrame);
      }, 2000);
    } catch {
      setScanState("error");
      setResult({ success: false, error: "Erreur de connexion" });
      setTimeout(() => {
        setScanState("idle");
        setResult(null);
        requestAnimationFrame(scanFrame);
      }, 2000);
    }
  };

  const bgColor =
    scanState === "success" ? "bg-green-500"
    : scanState === "error"   ? "bg-red-500"
    : "bg-gray-950";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-safe pt-4 pb-2">
        <button
          onClick={() => window.history.back()}
          className="text-white text-sm font-medium"
        >
          ← Retour
        </button>
        <div className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
          {attendeesCount} validé{attendeesCount > 1 ? "s" : ""}
        </div>
      </div>

      {/* Résultat du scan */}
      {result && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          {result.success ? (
            <>
              <div className="text-8xl mb-4">✅</div>
              <p className="text-4xl font-black text-white">
                Bienvenue {result.participantName} !
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-4">
                {result.code === "ALREADY_SCANNED" ? "⚠️" : "❌"}
              </div>
              <p className="text-2xl font-black text-white">
                {result.code === "ALREADY_SCANNED"
                  ? "Déjà scanné"
                  : "QR code invalide"}
              </p>
              {result.error && (
                <p className="text-white/70 mt-2 text-sm">{result.error}</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Caméra */}
      {!result && (
        <div className="flex-1 relative flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Cadre de visée */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 relative">
              {/* Coins du cadre */}
              {["tl", "tr", "bl", "br"].map((corner) => (
                <div
                  key={corner}
                  className={`absolute w-8 h-8 border-4 border-white
                    ${corner.includes("t") ? "top-0" : "bottom-0"}
                    ${corner.includes("l") ? "left-0 border-r-0 border-b-0" : "right-0 border-l-0 border-b-0"}
                    ${corner.includes("b") && corner.includes("l") ? "border-r-0 border-t-0" : ""}
                    ${corner.includes("b") && corner.includes("r") ? "border-l-0 border-t-0" : ""}
                  `}
                />
              ))}
            </div>
          </div>

          {!isCamera && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-center px-8">
                Autorise l&apos;accès à la caméra pour scanner les QR codes
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!result && (
        <div className="px-4 py-6 text-center">
          <p className="text-white/70 text-sm">
            Pointe la caméra vers le QR code du participant
          </p>
        </div>
      )}
    </div>
  );
}
