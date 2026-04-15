/**
 * Génère un token UUID v4 sécurisé pour un QR code
 * Utilise la Web Crypto API native (Node 22 / navigateur)
 */
export function generateQrToken(): string {
  return crypto.randomUUID();
}
