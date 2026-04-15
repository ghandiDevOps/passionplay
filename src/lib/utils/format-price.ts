/**
 * Formate un montant en centimes en chaîne affichable
 * Ex: 1500 → "15 €"
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Formate un montant en centimes en string court
 * Ex: 1500 → "15€"
 */
export function formatPriceShort(cents: number): string {
  return `${cents / 100}€`;
}
