/**
 * SEED DE DÉVELOPPEMENT — données de simulation uniquement
 *
 * ⚠️  Ne jamais exécuter en production.
 * Toutes les entrées créées ici ont le préfixe "seed_" dans leurs IDs Clerk
 * pour être facilement identifiables et supprimables.
 *
 * Usage :
 *   npm run db:seed:dev        → injecte les données
 *   npm run db:seed:dev:reset  → supprime toutes les données seed puis réinjecte
 */

import * as fs from "fs";
import * as path from "path";

// Charge .env.local si DATABASE_URL n'est pas déjà défini (utile pour ts-node en dehors de Next.js)
if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^#=\s]+)\s*=\s*"?([^"]*)"?\s*$/);
      if (match) process.env[match[1]] = match[2];
    }
  }
}

import { PrismaClient } from "@prisma/client";
import type {
  SessionType,
  SessionDomain,
  SessionStatus,
  BookingStatus,
  StripeOnboardingStatus,
} from "@prisma/client";

const db = new PrismaClient();

// ─── Marqueur commun à toutes les données seed ─────────────────────────────
const SEED_CLERK_PREFIX = "seed_clerk_";

// ─── Dates relatives ────────────────────────────────────────────────────────
const future = (days: number, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
};

const past = (days: number, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d;
};

// ─── Données ────────────────────────────────────────────────────────────────

const COACHES = [
  {
    clerkId:    `${SEED_CLERK_PREFIX}karim`,
    email:      "karim.seed@passionplay-dev.fr",
    name:       "Karim Daoudi",
    role:       "coach" as const,
    bio:        "Passionné de MMA depuis 12 ans, champion régional 2019. Je transmets ma flamme, pas des techniques.",
    specialties: ["Défense au sol", "Frappe debout", "Clinch"],
    domains:    ["sport"] as SessionDomain[],
    tiktokUrl:  "https://tiktok.com/@karim_mma_seed",
    stripeAccountId:        "acct_seed_karim_001",
    stripeOnboardingStatus: "active" as StripeOnboardingStatus,
    avgRating:  4.9,
    totalSessions: 12,
    totalParticipants: 156,
  },
  {
    clerkId:    `${SEED_CLERK_PREFIX}sarah`,
    email:      "sarah.seed@passionplay-dev.fr",
    name:       "Sarah Lemos",
    role:       "coach" as const,
    bio:        "Ex-pro de tennis reconvertie padel. Je te fais progresser sur un point précis en 1h.",
    specialties: ["Smash", "Voley de fond", "Service"],
    domains:    ["sport"] as SessionDomain[],
    instagramUrl: "https://instagram.com/sarah_padel_seed",
    stripeAccountId:        "acct_seed_sarah_002",
    stripeOnboardingStatus: "active" as StripeOnboardingStatus,
    avgRating:  4.8,
    totalSessions: 8,
    totalParticipants: 87,
  },
  {
    clerkId:    `${SEED_CLERK_PREFIX}thomas`,
    email:      "thomas.seed@passionplay-dev.fr",
    name:       "Thomas Renaud",
    role:       "coach" as const,
    bio:        "Ancien joueur N2, maintenant coach basket. Spécialiste du shoot et de la lecture de jeu.",
    specialties: ["Tir à 3 points", "Dribble", "Défense individuelle"],
    domains:    ["sport"] as SessionDomain[],
    stripeAccountId:        "acct_seed_thomas_003",
    stripeOnboardingStatus: "active" as StripeOnboardingStatus,
    avgRating:  4.7,
    totalSessions: 6,
    totalParticipants: 64,
  },
];

const PARTICIPANTS = [
  { clerkId: `${SEED_CLERK_PREFIX}lea`,    email: "lea.seed@passionplay-dev.fr",    name: "Léa Martin" },
  { clerkId: `${SEED_CLERK_PREFIX}hugo`,   email: "hugo.seed@passionplay-dev.fr",   name: "Hugo Bernard" },
  { clerkId: `${SEED_CLERK_PREFIX}chloe`,  email: "chloe.seed@passionplay-dev.fr",  name: "Chloé Dupont" },
  { clerkId: `${SEED_CLERK_PREFIX}maxime`, email: "maxime.seed@passionplay-dev.fr", name: "Maxime Girard" },
  { clerkId: `${SEED_CLERK_PREFIX}sofia`,  email: "sofia.seed@passionplay-dev.fr",  name: "Sofia Nakamura" },
  { clerkId: `${SEED_CLERK_PREFIX}remi`,   email: "remi.seed@passionplay-dev.fr",   name: "Rémi Faure" },
  { clerkId: `${SEED_CLERK_PREFIX}camille`,email: "camille.seed@passionplay-dev.fr",name: "Camille Petit" },
  { clerkId: `${SEED_CLERK_PREFIX}nour`,   email: "nour.seed@passionplay-dev.fr",   name: "Nour Benali" },
];

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 [SEED-DEV] Démarrage de l'injection de données de simulation...\n");

  // 1. Créer les utilisateurs coaches
  const createdCoaches: { userId: string; coachProfileId: string; data: typeof COACHES[0] }[] = [];

  for (const c of COACHES) {
    const user = await db.user.upsert({
      where:  { clerkId: c.clerkId },
      update: {},
      create: {
        clerkId:       c.clerkId,
        email:         c.email,
        name:          c.name,
        role:          c.role,
        emailVerified: true,
      },
    });

    const coachProfile = await db.coachProfile.upsert({
      where:  { userId: user.id },
      update: {},
      create: {
        userId:                 user.id,
        bio:                    c.bio,
        specialties:            c.specialties,
        domains:                c.domains,
        instagramUrl:           c.instagramUrl ?? null,
        tiktokUrl:              c.tiktokUrl ?? null,
        stripeAccountId:        c.stripeAccountId,
        stripeOnboardingStatus: c.stripeOnboardingStatus,
        avgRating:              c.avgRating,
        totalSessions:          c.totalSessions,
        totalParticipants:      c.totalParticipants,
      },
    });

    createdCoaches.push({ userId: user.id, coachProfileId: coachProfile.id, data: c });
    console.log(`  ✅ Coach : ${c.name} (${c.email})`);
  }

  // 2. Créer les participants
  const createdParticipants: { id: string; name: string; email: string }[] = [];

  for (const p of PARTICIPANTS) {
    const user = await db.user.upsert({
      where:  { clerkId: p.clerkId },
      update: {},
      create: {
        clerkId:       p.clerkId,
        email:         p.email,
        name:          p.name,
        role:          "participant",
        emailVerified: true,
      },
    });
    createdParticipants.push({ id: user.id, name: p.name, email: p.email });
  }
  console.log(`  ✅ ${createdParticipants.length} participants créés\n`);

  const [karim, sarah, thomas] = createdCoaches;

  // 3. Créer les sessions
  type SessionSeed = {
    slug: string;
    coachProfileId: string;
    title: string;
    tagline: string;
    description: string;
    sessionType: SessionType;
    domain: SessionDomain;
    category: string;
    skillFocus: string;
    dateStart: Date;
    durationMin: number;
    locationAddress: string;
    locationLat: number;
    locationLng: number;
    priceCents: number;
    maxSpots: number;
    spotsTaken: number;
    status: SessionStatus;
    coverImageUrl?: string;
  };

  const SESSIONS: SessionSeed[] = [
    // ── Sessions à venir ──────────────────────────────────────────────────
    {
      slug:            "seed-mma-frappe-defense-karim",
      coachProfileId:  karim.coachProfileId,
      title:           "Initiation MMA — Frappe & Défense",
      tagline:         "Apprends les bases en 1h. Zéro expérience requise.",
      description:     "Une session pour découvrir le MMA dans un cadre bienveillant. On travaille les gardes, les déplacements et les premières combinaisons frappe/défense. Pas de sparring, juste de la technique avec du fun.",
      sessionType:     "discovery",
      domain:          "sport",
      category:        "MMA",
      skillFocus:      "Garde + jab-cross + esquive",
      dateStart:       future(3, 10),
      durationMin:     60,
      locationAddress: "Salle Combat Club, 12 rue de la Roquette, Paris 11e",
      locationLat:     48.854,
      locationLng:     2.373,
      priceCents:      1500,
      maxSpots:        15,
      spotsTaken:      11,
      status:          "published",
      coverImageUrl:   null as unknown as string,
    },
    {
      slug:            "seed-padel-smash-sarah",
      coachProfileId:  sarah.coachProfileId,
      title:           "Padel — Maîtrise du Smash",
      tagline:         "Débloquer ce coup qui te résiste depuis des mois.",
      description:     "Le smash au padel c'est technique. On décortique le timing, la position des pieds, le point de contact. Tu repars avec un smash qui claque. Niveau intermédiaire requis.",
      sessionType:     "progression",
      domain:          "sport",
      category:        "Padel",
      skillFocus:      "Smash au-dessus de la tête",
      dateStart:       future(5, 14),
      durationMin:     60,
      locationAddress: "Padel Arena Paris, 8 avenue du Sport, Paris 16e",
      locationLat:     48.869,
      locationLng:     2.267,
      priceCents:      1800,
      maxSpots:        12,
      spotsTaken:      5,
      status:          "published",
      coverImageUrl:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-padel-Zdfd6iNhRVJu3HmS2Q2GTT.webp",
    },
    {
      slug:            "seed-basket-tir-3pts-thomas",
      coachProfileId:  thomas.coachProfileId,
      title:           "Basket — Tir à 3 Points",
      tagline:         "La mécanique du shoot expliquée, répétée, mémorisée.",
      description:     "On travaille la position des pieds, l'alignement du coude, le suivi de la main. Exercices progressifs, feedback en temps réel. Tu ressors avec des automatismes.",
      sessionType:     "progression",
      domain:          "sport",
      category:        "Basket",
      skillFocus:      "Mécanique de tir à 3 points",
      dateStart:       future(7, 11),
      durationMin:     90,
      locationAddress: "Gymnase Gerland, 350 avenue Jean Jaurès, Lyon 7e",
      locationLat:     45.732,
      locationLng:     4.832,
      priceCents:      2000,
      maxSpots:        12,
      spotsTaken:      7,
      status:          "published",
      coverImageUrl:   null as unknown as string,
    },
    {
      slug:            "seed-mma-clinch-karim",
      coachProfileId:  karim.coachProfileId,
      title:           "MMA — Clinch & Projections",
      tagline:         "Contrôle la distance, domine le clinch.",
      description:     "Session dédiée au travail du clinch : placements, contrôle de la nuque, genoux et projections de base. Niveau intermédiaire. Protections obligatoires.",
      sessionType:     "progression",
      domain:          "sport",
      category:        "MMA",
      skillFocus:      "Contrôle du clinch et projections",
      dateStart:       future(10, 19),
      durationMin:     60,
      locationAddress: "Salle Combat Club, 12 rue de la Roquette, Paris 11e",
      locationLat:     48.854,
      locationLng:     2.373,
      priceCents:      1500,
      maxSpots:        10,
      spotsTaken:      8,
      status:          "published",
      coverImageUrl:   null as unknown as string,
    },
    // Session presque pleine — urgence
    {
      slug:            "seed-boxe-jab-crochet-karim",
      coachProfileId:  karim.coachProfileId,
      title:           "Boxe — Jab & Crochet Parfait",
      tagline:         "2 coups. 1h. Des automatismes pour la vie.",
      description:     "On ne travaille que deux coups, mais on les travaille à fond. Technique, timing, enchaînements. Sac de frappe, pattes d'ours, shadow boxing. Débutant bienvenu.",
      sessionType:     "discovery",
      domain:          "sport",
      category:        "Boxe",
      skillFocus:      "Jab + crochet gauche",
      dateStart:       future(2, 9),
      durationMin:     60,
      locationAddress: "Boxing Studio, 45 rue de Ménilmontant, Paris 20e",
      locationLat:     48.870,
      locationLng:     2.384,
      priceCents:      1700,
      maxSpots:        10,
      spotsTaken:      8,
      status:          "published",
      coverImageUrl:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-boxe-EQiqxzCpNe7HC86FY4bwkp.webp",
    },
    // Session complète
    {
      slug:            "seed-padel-debutant-sarah",
      coachProfileId:  sarah.coachProfileId,
      title:           "Padel Débutant — Premiers coups",
      tagline:         "Découvre le padel sans pression, en petit groupe.",
      description:     "Tu n'as jamais joué au padel. On apprend le grip, les déplacements, le coup droit et le revers. Session très accessible, bonne humeur garantie.",
      sessionType:     "discovery",
      domain:          "sport",
      category:        "Padel",
      skillFocus:      "Coup droit + revers de base",
      dateStart:       future(1, 10),
      durationMin:     60,
      locationAddress: "Padel Arena Paris, 8 avenue du Sport, Paris 16e",
      locationLat:     48.869,
      locationLng:     2.267,
      priceCents:      1500,
      maxSpots:        12,
      spotsTaken:      12,
      status:          "full",
      coverImageUrl:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663566022686/R8mt4wVf2JUyTmz8XeetPY/session-padel-Zdfd6iNhRVJu3HmS2Q2GTT.webp",
    },
    // ── Sessions passées ──────────────────────────────────────────────────
    {
      slug:            "seed-mma-defence-sol-karim-past",
      coachProfileId:  karim.coachProfileId,
      title:           "Défense au sol — Kimura & RNC",
      tagline:         "Les soumissions de base que tout le monde doit connaître.",
      description:     "Session passée. Travail du kimura et du rear naked choke sur tapis. 12 présents sur 15 inscrits.",
      sessionType:     "progression",
      domain:          "sport",
      category:        "MMA",
      skillFocus:      "Kimura + Rear Naked Choke",
      dateStart:       past(5, 10),
      durationMin:     60,
      locationAddress: "Salle Combat Club, 12 rue de la Roquette, Paris 11e",
      locationLat:     48.854,
      locationLng:     2.373,
      priceCents:      1500,
      maxSpots:        15,
      spotsTaken:      15,
      status:          "completed",
      coverImageUrl:   null as unknown as string,
    },
  ];

  const createdSessions: { id: string; slug: string; coachProfileId: string; priceCents: number }[] = [];

  for (const s of SESSIONS) {
    const session = await db.session.upsert({
      where:  { slug: s.slug },
      update: {},
      create: {
        coachId:         s.coachProfileId,
        title:           s.title,
        tagline:         s.tagline,
        description:     s.description,
        sessionType:     s.sessionType,
        domain:          s.domain,
        category:        s.category,
        skillFocus:      s.skillFocus,
        dateStart:       s.dateStart,
        durationMin:     s.durationMin,
        locationAddress: s.locationAddress,
        locationLat:     s.locationLat,
        locationLng:     s.locationLng,
        priceCents:      s.priceCents,
        maxSpots:        s.maxSpots,
        spotsTaken:      s.spotsTaken,
        status:          s.status,
        slug:            s.slug,
        coverImageUrl:   s.coverImageUrl ?? null,
      },
    });
    createdSessions.push({ id: session.id, slug: s.slug, coachProfileId: s.coachProfileId, priceCents: s.priceCents });
    console.log(`  ✅ Session : ${s.title} [${s.status}]`);
  }

  console.log("");

  // 4. Créer des réservations sur les sessions publiées
  const bookingData: {
    sessionId: string;
    participantIdx: number;
    status: BookingStatus;
    paidAt?: Date;
    amountPaidCents?: number;
    scannedAt?: Date;
  }[] = [
    // MMA Initiation (11/15) → 11 confirmed
    ...Array.from({ length: 11 }, (_, i) => ({
      sessionId:      createdSessions[0].id,
      participantIdx: i % createdParticipants.length,
      status:         "confirmed" as BookingStatus,
      paidAt:         past(1),
      amountPaidCents: 1500,
    })),
    // Padel Smash (5/12) → 5 confirmed
    ...Array.from({ length: 5 }, (_, i) => ({
      sessionId:      createdSessions[1].id,
      participantIdx: (i + 2) % createdParticipants.length,
      status:         "confirmed" as BookingStatus,
      paidAt:         past(2),
      amountPaidCents: 1800,
    })),
    // Boxe urgente (8/10) → 7 confirmed + 1 pending
    ...Array.from({ length: 7 }, (_, i) => ({
      sessionId:      createdSessions[4].id,
      participantIdx: (i + 1) % createdParticipants.length,
      status:         "confirmed" as BookingStatus,
      paidAt:         past(1),
      amountPaidCents: 1700,
    })),
    {
      sessionId:      createdSessions[4].id,
      participantIdx: 7,
      status:         "pending" as BookingStatus,
    },
    // Session passée → attended + no_show
    ...Array.from({ length: 12 }, (_, i) => ({
      sessionId:      createdSessions[6].id,
      participantIdx: i % createdParticipants.length,
      status:         "attended" as BookingStatus,
      paidAt:         past(7),
      amountPaidCents: 1500,
      scannedAt:      past(5, 10),
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      sessionId:      createdSessions[6].id,
      participantIdx: (i + 4) % createdParticipants.length,
      status:         "no_show" as BookingStatus,
      paidAt:         past(7),
      amountPaidCents: 1500,
    })),
  ];

  let bookingCount = 0;
  for (const b of bookingData) {
    const participant = createdParticipants[b.participantIdx];
    await db.booking.create({
      data: {
        sessionId:        b.sessionId,
        userId:           participant.id,
        participantEmail: participant.email,
        participantName:  participant.name,
        qrToken:          `seed_qr_${b.sessionId.slice(0, 8)}_${b.participantIdx}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        status:           b.status,
        paidAt:           b.paidAt ?? null,
        amountPaidCents:  b.amountPaidCents ?? null,
        scannedAt:        b.scannedAt ?? null,
        stripePaymentIntentId: b.paidAt
          ? `pi_seed_${b.sessionId.slice(0, 8)}_${b.participantIdx}_${Date.now()}`
          : null,
      },
    });
    bookingCount++;
  }
  console.log(`  ✅ ${bookingCount} réservations créées`);

  // 5. Créer un payout pour la session passée
  const pastSession = createdSessions[6];
  const gross = 12 * 1500; // 12 présents × 15€
  const platform = Math.round(gross * 0.22);
  const net = gross - platform;

  await db.payout.upsert({
    where:  { sessionId: pastSession.id },
    update: {},
    create: {
      coachId:          pastSession.coachProfileId,
      sessionId:        pastSession.id,
      grossAmountCents: gross,
      platformFeeCents: platform,
      netAmountCents:   net,
      stripeTransferId: "tr_seed_past_mma_001",
      status:           "completed",
      initiatedAt:      past(4),
      completedAt:      past(3),
    },
  });
  console.log(`  ✅ Payout session passée : ${(net / 100).toFixed(2)}€ net`);

  // 6. Quelques avis sur la session passée
  const reviews = [
    { authorIdx: 0, rating: 5, comment: "Karim est incroyable. J'ai appris plus en 1h qu'en 3 mois de vidéos YouTube." },
    { authorIdx: 1, rating: 5, comment: "Ambiance parfaite, groupe motivé. Je reviens." },
    { authorIdx: 2, rating: 4, comment: "Très bonne session, peut-être un peu court pour tout assimiler." },
    { authorIdx: 3, rating: 5, comment: "Le format petit groupe fait toute la différence. Feedback constant." },
  ];

  const pastSessionBookings = await db.booking.findMany({
    where:  { sessionId: pastSession.id, status: "attended" },
    take:   reviews.length,
  });

  for (let i = 0; i < Math.min(reviews.length, pastSessionBookings.length); i++) {
    const r = reviews[i];
    const booking = pastSessionBookings[i];
    await db.review.upsert({
      where:  { bookingId: booking.id },
      update: {},
      create: {
        sessionId: pastSession.id,
        bookingId: booking.id,
        authorId:  createdParticipants[r.authorIdx].id,
        rating:    r.rating,
        comment:   r.comment,
      },
    });
  }
  console.log(`  ✅ ${reviews.length} avis créés`);

  console.log("\n✅ [SEED-DEV] Injection terminée !\n");
  console.log("📋 Résumé :");
  console.log(`   • ${COACHES.length} coaches`);
  console.log(`   • ${PARTICIPANTS.length} participants`);
  console.log(`   • ${SESSIONS.length} sessions (${SESSIONS.filter(s => s.status === "published").length} publiées, 1 complète, 1 passée)`);
  console.log(`   • ${bookingCount} réservations`);
  console.log("   • 1 payout complété");
  console.log(`   • ${reviews.length} avis\n`);
  console.log("🔗 Slugs de test :");
  for (const s of createdSessions) {
    console.log(`   http://localhost:3000/s/${s.slug}`);
  }
  console.log("\n⚠️  Ces données sont identifiables par le préfixe 'seed_' dans les clerkIds.");
}

async function reset() {
  console.log("🗑️  [SEED-DEV] Suppression des données seed...\n");

  // Récupérer tous les users seed
  const seedUsers = await db.user.findMany({
    where: { clerkId: { startsWith: SEED_CLERK_PREFIX } },
    select: { id: true },
  });
  const seedUserIds = seedUsers.map(u => u.id);

  if (seedUserIds.length === 0) {
    console.log("   Aucune donnée seed trouvée.\n");
    return;
  }

  // Récupérer les sessions seed via les coaches
  const seedCoachProfiles = await db.coachProfile.findMany({
    where: { userId: { in: seedUserIds } },
    select: { id: true },
  });
  const seedCoachIds = seedCoachProfiles.map(c => c.id);

  const seedSessions = await db.session.findMany({
    where: { coachId: { in: seedCoachIds } },
    select: { id: true },
  });
  const seedSessionIds = seedSessions.map(s => s.id);

  // Cascade manuelle (Prisma ne gère pas toujours bien les cycles)
  await db.review.deleteMany({ where: { sessionId: { in: seedSessionIds } } });
  await db.notification.deleteMany({ where: { userId: { in: seedUserIds } } });
  await db.payout.deleteMany({ where: { sessionId: { in: seedSessionIds } } });
  await db.booking.deleteMany({ where: { sessionId: { in: seedSessionIds } } });
  await db.waitlistEntry.deleteMany({ where: { sessionId: { in: seedSessionIds } } });
  await db.session.deleteMany({ where: { id: { in: seedSessionIds } } });
  await db.coachProfile.deleteMany({ where: { id: { in: seedCoachIds } } });
  await db.user.deleteMany({ where: { id: { in: seedUserIds } } });

  console.log(`   ✅ ${seedUserIds.length} users seed supprimés (+ toutes leurs données liées)\n`);
}

// ─── Entry point ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

(async () => {
  try {
    if (args.includes("--reset")) {
      await reset();
      await main();
    } else {
      await main();
    }
  } catch (e) {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
