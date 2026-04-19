"use client";

import { useEffect, useState } from "react";
import { subscribeToSessionSpots } from "@/lib/supabase";
import { cn } from "@/lib/utils/cn";

interface SpotsCounterProps {
  sessionId: string;
  initialSpotsTaken: number;
  maxSpots: number;
}

export function SpotsCounter({
  sessionId,
  initialSpotsTaken,
  maxSpots,
}: SpotsCounterProps) {
  const [spotsTaken, setSpotsTaken] = useState(initialSpotsTaken);
  const spotsLeft = maxSpots - spotsTaken;
  const isFull = spotsLeft <= 0;
  const isAlmostFull = spotsLeft <= 3 && !isFull;

  // Abonnement Supabase Realtime
  useEffect(() => {
    const channel = subscribeToSessionSpots(sessionId, (newSpotsTaken) => {
      setSpotsTaken(newSpotsTaken);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  if (isFull) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#FF3D00] font-semibold text-sm">
        🔴 Session complète
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold text-sm",
        isAlmostFull ? "text-[#FF7A00]" : "text-[#888]",
      )}
    >
      {isAlmostFull ? "🔥" : "👥"}
      {spotsLeft === 1
        ? "Dernière place !"
        : isAlmostFull
          ? `Plus que ${spotsLeft} places`
          : `${spotsLeft} places restantes`}
    </span>
  );
}
