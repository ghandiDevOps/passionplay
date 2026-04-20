"use client";

import { useState } from "react";

export function ReviewForm({ bookingId }: { bookingId: string }) {
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [comment,   setComment]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function submit() {
    if (rating === 0) { setError("Choisis une note."); return; }
    setLoading(true);
    setError(null);

    const res = await fetch("/api/reviews", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ bookingId, rating, comment: comment.trim() || null }),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erreur, réessaie.");
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-[#FF7A00] text-lg">★</span>
        ))}
        <span className="text-[#10b981] text-xs font-sans ml-1">Merci !</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Étoiles */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const val = i + 1;
          return (
            <button
              key={i}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(val)}
              className={`text-2xl transition-colors duration-75 ${
                val <= (hovered || rating) ? "text-[#FF7A00]" : "text-[#333]"
              }`}
            >
              ★
            </button>
          );
        })}
        {rating > 0 && (
          <span className="text-[#555] text-xs font-sans ml-1">{rating}/5</span>
        )}
      </div>

      {/* Commentaire */}
      {rating > 0 && (
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Un mot sur la session ? (optionnel)"
          maxLength={500}
          rows={2}
          className="w-full bg-[#111] border border-[#2a2a2a] text-white text-xs font-sans p-2 resize-none placeholder:text-[#444] focus:outline-none focus:border-[#FF7A00]/50"
        />
      )}

      {error && <p className="text-[#FF3D00] text-xs font-sans">{error}</p>}

      {rating > 0 && (
        <button
          onClick={submit}
          disabled={loading}
          className="btn-passion text-xs px-5 py-2 min-h-0 disabled:opacity-50"
        >
          {loading ? "..." : "ENVOYER →"}
        </button>
      )}
    </div>
  );
}
