# PassionPlay — Contrat d'interface Frontend / Backend

> Ce fichier est le **contrat partagé** entre Manus AI (frontend) et Claude (backend).
> Les deux IAs doivent le respecter. Toute modification doit être validée par le propriétaire du projet.

---

## Responsabilités

| Domaine | Manus AI (Frontend) | Claude (Backend) |
|---------|---------------------|------------------|
| Pages marketing | UI, animations, responsive | — |
| Pages coach (SSR) | Rendu, layout, UX | Data fetching, queries Prisma |
| Composants React | Création, styling, interactions | — |
| API Routes `/api/*` | — | Logique métier, validation, sécurité |
| Prisma Schema | — | Modèles, migrations, seed |
| Stripe | — | PaymentIntent, webhooks, Connect |
| Clerk Auth | Composants UI (`<UserButton>`, etc.) | Middleware, webhooks, `auth()` |
| Supabase Realtime | Composant `spots-counter.tsx` | Channel setup, policies |
| Styles / Tailwind | `globals.css`, composants UI | — |
| Tests | Tests UI (si applicable) | Tests API, tests métier |

---

## Zone grise : Server Components avec data

**Règle** : Claude gère le data fetching (queries Prisma, `Promise.all`), Manus gère le JSX/rendu.

En pratique pour les pages comme `dashboard/page.tsx` ou `earnings/page.tsx` :
- Claude écrit la partie `async function` avec les queries
- Manus écrit le JSX de retour et les composants enfants
- Si conflit : la version Claude prime pour les queries, la version Manus prime pour le JSX

---

## Types partagés (`src/types/index.ts`)

```typescript
// Types Prisma enrichis — NE PAS MODIFIER sans accord des deux côtés
SessionWithCoach    // Session + coach + user
BookingWithSession  // Booking + session + coach + user
CoachWithUser       // CoachProfile + user

// Types API
ApiError            // { error: string; code?: string }
ReserveResponse     // { clientSecret: string; bookingId: string }
ScanResponse        // { success: true, participantName, scannedAt } | { success: false, error, code }
```

---

## Endpoints API existants

| Méthode | Route | Responsable | Description |
|---------|-------|-------------|-------------|
| POST | `/api/sessions` | Claude | Créer une session |
| POST | `/api/sessions/[id]/reserve` | Claude | Réserver (transaction atomique) |
| POST | `/api/sessions/[id]/scan` | Claude | Scanner QR code |
| POST | `/api/webhooks/stripe` | Claude | Webhook Stripe |
| POST | `/api/webhooks/clerk` | Claude | Webhook Clerk (sync users) |
| GET | `/api/cron/reminders` | Claude | Cron rappels email |

---

## Constantes métier (`src/constants/index.ts`)

```
Prix session       : 13€ → 20€  (MIN_PRICE_CENTS / MAX_PRICE_CENTS)
Groupe             : 10 → 20 personnes (MIN_SPOTS / MAX_SPOTS)
Commission coach   : 70%
Commission plateforme : 22%
Commission parrainage : 7%
Durées possibles   : 60 ou 120 min
Annulation         : remboursement si > 24h avant
```

**Ces constantes sont importées depuis `src/constants/index.ts` — jamais hardcodées.**

---

## Palette couleurs (Tailwind)

```
passion-400 / flame-yellow  #FFB700  ← accent secondaire
passion-500 / flame-orange  #FF7A00  ← couleur primaire
passion-700 / flame-deep    #FF3D00  ← profondeur / hover
discovery                   #22c55e  ← badge Découverte (green-500)
progression                 #3b82f6  ← badge Progression (blue-500)
fond                        #1a1a1a  ← background principal
fond-dark                   #111111  ← background coach area
border                      #2a2a2a  ← bordures
text-muted                  #555555  ← texte secondaire
text-dim                    #888888  ← texte tertiaire
```

---

## Classes CSS custom (`globals.css`)

| Classe | Usage |
|--------|-------|
| `.font-display` | Barlow Condensed 900, uppercase, titres principaux |
| `.font-display-md` | Barlow Condensed 700, uppercase, labels/sous-titres |
| `.btn-passion` | Bouton principal orange, hover rouge |
| `.btn-passion-outline` | Bouton outline, hover orange |
| `.badge-discover` | Badge vert "DÉCOUVERTE" |
| `.badge-progress` | Badge bleu "PROGRESSION" |
| `.badge-sport` | Badge orange pour le sport |
| `.session-card` | Card avec hover lift + shadow |
| `.watermark-number` | Grand nombre décoratif en arrière-plan |
| `.passion-sep` | Séparateur gradient orange |
| `.pulse-orange` | Animation pulse sur les CTA |
| `.animate-ticker` | Animation défilement horizontal |

---

## Structure des fichiers — Qui touche quoi

```
src/
├── app/
│   ├── (auth)/              ← Manus : UI sign-in/sign-up
│   ├── (coach)/
│   │   ├── layout.tsx       ← Manus : navigation, header, bottom nav
│   │   ├── dashboard/       ← Partagé : Claude = queries, Manus = rendu
│   │   ├── earnings/        ← Partagé : Claude = queries, Manus = rendu
│   │   ├── sessions/        ← Partagé
│   │   └── onboarding/      ← Manus : UI formulaire
│   ├── (marketing)/
│   │   └── explore/         ← Manus : UI explore
│   ├── api/                 ← Claude uniquement
│   ├── book/                ← Manus : UI booking flow
│   ├── legal/               ← Manus : pages légales
│   ├── s/[slug]/            ← Partagé : Claude = SSR data, Manus = rendu
│   ├── layout.tsx           ← Manus : layout global
│   └── page.tsx             ← Manus : homepage
├── components/
│   ├── booking/             ← Manus : composants booking
│   ├── session/             ← Partagé : types = Claude, UI = Manus
│   └── ui/                  ← Manus : composants shadcn/ui
├── constants/               ← Claude : constantes métier
├── hooks/                   ← Manus : hooks React
├── lib/
│   ├── db.ts                ← Claude : singleton Prisma
│   ├── stripe.ts            ← Claude : logique Stripe
│   ├── supabase.ts          ← Claude : clients Supabase
│   ├── resend.ts            ← Claude : emails
│   ├── sessions/            ← Claude : logique métier sessions
│   └── utils/               ← Partagé
├── styles/
│   └── globals.css          ← Manus : styles globaux
├── types/
│   └── index.ts             ← Partagé : ne modifier qu'avec accord mutuel
└── middleware.ts             ← Claude : protection routes
```

---

## Règles de collaboration

1. **Jamais de push direct sur `master`** — tout passe par PR
2. **Manus travaille sur `feat/frontend-manus`**, Claude sur `feat/backend-claude`
3. **Fusion hebdo sur `feat/integration`** puis merge dans `master`
4. **En cas de conflit** :
   - Fichiers `src/app/api/*` → version Claude prime
   - Fichiers `src/components/*` → version Manus prime
   - Fichiers `src/types/*` → discussion obligatoire
5. **Nouveaux endpoints** : Claude les documente ici avant implémentation
6. **Nouveaux composants** : Manus les liste ici avant création

---

*INTERFACE.md — Dernière mise à jour : 17 avril 2026*
