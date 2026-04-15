# PassionPlay — Contexte projet pour Claude

> Ce fichier est lu automatiquement à chaque session.
> Pour le contexte complet → lire `../MEMORY.md`, `../SECURITY.md`, `../CODE_GUIDE.md`

---

## C'est quoi PassionPlay

Plateforme de sessions collectives ultra-ciblées : un coach propose une session d'1h sur **une seule compétence précise** (ex: "tir à 3 points", "défense au sol MMA") à 10-20 personnes, entre 13€ et 20€. Mobile-first, réservation en < 30 secondes. On commence par le sport, l'architecture est pensée multi-domaines.

---

## Règles métier à ne jamais changer sans validation

```
Prix session       13€ → 20€  (MIN_PRICE_CENTS / MAX_PRICE_CENTS)
Groupe             10 → 20 personnes
Commission coach   70%
Commission PassionPlay  22%
Commission parrainage    7%  (reversé à qui amène le client — coach ou PassionPlay)
Si coach = référent     77%  (70 + 7)
application_fee_amount  29%  (22 + 7) — calculé dans src/lib/stripe.ts UNIQUEMENT
```

---

## Stack

```
Next.js 14 App Router + TypeScript + Tailwind
Auth         Clerk
DB           PostgreSQL → Supabase eu-west-1 + Prisma ORM
Realtime     Supabase Realtime (compteur de places)
Paiement     Stripe Connect Express (Destination Charge)
Emails       Resend + react-email
Deploy       Vercel + Cron Jobs
QR           qrcode.react (génération) + jsQR (scan)
```

---

## Palette couleurs (Tailwind)

```
passion-400 / flame-yellow  #FFB700  ← accent principal
passion-500 / flame-orange  #FF7A00  ← couleur primaire
passion-700 / flame-deep    #FF3D00  ← profondeur / hover
discovery                   #22c55e  ← badge Découverte
progression                 #3b82f6  ← badge Progression
fond                        #080808
```

---

## État d'avancement

| Phase | Statut |
|-------|--------|
| Docs + scaffold code | ✅ Fait |
| Flyers coachs V3 | ✅ Fait (marketing/flyers/) |
| **Phase 0 — Infra** | 🔄 En cours (guide → docs/phases/PHASE_0_SETUP.md) |
| Phase 1 — Auth + Onboarding | ⏳ |
| Phase 2 — Sessions + page publique | ⏳ |
| Phase 3 — Réservation + paiement | ⏳ |
| Phase 4 — QR Code scan | ⏳ |
| Phase 5 — Lancement | ⏳ |

---

## Règles de sécurité critiques (détail → ../SECURITY.md)

1. **Secrets serveur uniquement** — jamais de `STRIPE_SECRET_KEY`, `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY` dans un composant `use client`
2. **Montant depuis la DB** — jamais faire confiance au montant venant du client pour un PaymentIntent
3. **Transaction atomique** — la réservation (`reserve/route.ts`) utilise `db.$transaction()` obligatoirement
4. **Signature webhook** — toujours appeler `constructWebhookEvent()` avant de traiter un payload Stripe
5. **Ownership coach** — toujours vérifier `session.coachId === userId` avant toute mutation
6. **Idempotence webhook** — vérifier `booking.status === "confirmed"` avant de retraiter un paiement
7. **QR Token** — généré avec `crypto.randomUUID()`, invalide après premier scan

---

## Fichiers clés à connaître

```
src/lib/stripe.ts              ← calculateAmounts(), createPaymentIntent()
src/lib/db.ts                  ← singleton Prisma (toujours importer db depuis ici)
src/lib/supabase.ts            ← client Realtime + Storage
src/constants/index.ts         ← toutes les constantes métier
src/middleware.ts               ← routes protégées Clerk
prisma/schema.prisma           ← schéma BDD complet (9 modèles, 11 enums)

src/app/api/sessions/[id]/reserve/route.ts  ← réservation atomique
src/app/api/webhooks/stripe/route.ts        ← confirmation paiement + QR
src/app/api/webhooks/clerk/route.ts         ← sync users en base
src/app/s/[slug]/page.tsx                   ← page session publique (SSR)
src/app/(coach)/sessions/[id]/scan/page.tsx ← scanner QR côté coach
```

---

## Conventions

- Fichiers : `kebab-case.tsx`
- Composants : `PascalCase`
- Par défaut Server Component — `"use client"` seulement si état/événements
- Erreurs API : `{ error: "MESSAGE_CODE" }` + code HTTP
- Validation : toujours Zod sur les inputs API
- Après modif schema Prisma : `npx prisma generate` puis `npx prisma migrate dev`

---

## Structure des dossiers (racine PassionPlay/)

```
docs/          ← documentation complète
docs/phases/   ← guides par phase (PHASE_0_SETUP.md, ...)
marketing/     ← flyers PDF coachs
passionplay/   ← CE DOSSIER — code Next.js
../MEMORY.md   ← mémoire complète du projet
../SECURITY.md ← règles sécurité avec exemples de code
../CODE_GUIDE.md ← doc de chaque fichier et fonction
```

---

*CLAUDE.md — Lu automatiquement à chaque session VS Code*
