import { db } from "@/lib/db";

/**
 * Convertit une chaîne en slug kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, "")   // Supprime les caractères spéciaux
    .trim()
    .replace(/\s+/g, "-")            // Espaces → tirets
    .replace(/-+/g, "-")             // Tirets multiples → 1 tiret
    .slice(0, 80);
}

/**
 * Génère un slug unique pour une session
 * Format : {sport}-{competence}-{prenom}-{ville}
 * Ex: mma-defense-sol-karim-paris
 */
export async function generateSessionSlug({
  category,
  skillFocus,
  coachName,
  city,
}: {
  category: string;
  skillFocus: string;
  coachName: string;
  city: string;
}): Promise<string> {
  const firstName = coachName.split(" ")[0] ?? coachName;
  const cityName = city.split(",")[0] ?? city;

  const base = toKebabCase(`${category} ${skillFocus} ${firstName} ${cityName}`);

  // Vérification de l'unicité en base
  let slug = base;
  let suffix = 1;

  while (true) {
    const existing = await db.session.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${base}-${suffix++}`;
  }
}
