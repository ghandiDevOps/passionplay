import { format, formatDistanceToNow, isFuture, addMinutes } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Ex: "Samedi 18 avril 2026"
 */
export function formatDateLong(date: Date): string {
  return format(date, "EEEE d MMMM yyyy", { locale: fr });
}

/**
 * Ex: "Sam. 18 avril"
 */
export function formatDateShort(date: Date): string {
  return format(date, "EEE d MMM", { locale: fr });
}

/**
 * Ex: "10h00"
 */
export function formatTime(date: Date): string {
  return format(date, "HH'h'mm");
}

/**
 * Ex: "Samedi 18 avril · 10h00 – 11h00"
 */
export function formatSessionDateTime(dateStart: Date, durationMin: number): string {
  const dateEnd = addMinutes(dateStart, durationMin);
  const day = format(dateStart, "EEEE d MMMM", { locale: fr });
  const start = formatTime(dateStart);
  const end = formatTime(dateEnd);
  return `${day} · ${start} – ${end}`;
}

/**
 * Ex: "dans 2 jours" ou "il y a 3 heures"
 */
export function formatRelative(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: fr });
}

/**
 * Vérifie si une session est encore dans le futur
 */
export function isSessionFuture(dateStart: Date): boolean {
  return isFuture(dateStart);
}
