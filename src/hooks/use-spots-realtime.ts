"use client";

import { useEffect, useState } from "react";
import { subscribeToSessionSpots } from "@/lib/supabase";

/**
 * Abonnement en temps réel au nombre de places disponibles d'une session.
 * Met à jour le state automatiquement via Supabase Realtime (WebSocket).
 */
export function useSpotsRealtime(sessionId: string, initialSpotsTaken: number) {
  const [spotsTaken, setSpotsTaken] = useState(initialSpotsTaken);

  useEffect(() => {
    const channel = subscribeToSessionSpots(sessionId, setSpotsTaken);
    return () => { channel.unsubscribe(); };
  }, [sessionId]);

  return spotsTaken;
}
