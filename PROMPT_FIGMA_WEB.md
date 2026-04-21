# Prompt Passion Spark — Pour Figma AI / Framer AI / Webflow AI / v0

Copie-colle ce prompt tel quel dans l'IA de ton outil.

---

## PROMPT (version complète)

```
Design a modern, mobile-first landing page for "Passion Spark" — a French platform
where coaches offer 1-hour collective skill sessions (sports, passion, arts) at
13–20€ per person, in groups of 10–20.

---

### BRAND IDENTITY

Name: Passion Spark
Tagline: "Vis ta passion. Maintenant."
Tone: Energetic, bold, direct. Like a sports brand meets a tech startup.
Language: French (UI copy in French)

Logo: A flame icon (orange-to-yellow gradient, portrait shape ~2:3 ratio)
      + "Passion Spark" wordmark in bold next to it.
      The flame represents passion, energy, live action.

---

### COLOR PALETTE

Background:    #FAFAFA  (off-white, almost white)
Dot pattern:   radial dots rgba(0,0,0,0.035) every 26px — subtle texture
Text primary:  #111111
Text secondary:#444444
Text muted:    #888888
Card bg:       #FFFFFF with border #EBEBEB and shadow rgba(0,0,0,0.04)
Divider:       #EBEBEB

Flame gradient (PRIMARY ACCENT — use generously):
  → Horizontal: linear-gradient(90deg, #FFB700 0%, #FF3D00 100%)
  → Vertical:   linear-gradient(180deg, #FFB700 0%, #FF3D00 100%)
  Use for: buttons, badges, price text, section accents, borders

Dark section bg: #0F0F0F (for the "Coach" section — intentional contrast block)
Dark card:       #161616

---

### TYPOGRAPHY

Font: "Inter" or "Geist" — system-ui fallback
Hero H1: 62px, weight 900, letter-spacing -0.04em, uppercase, color #111
Flame H1 accent: same size but flame gradient text
Section titles: 18px, weight 800, letter-spacing -0.02em
Body: 14–15px, line-height 1.65, color #444
Mono labels: 10–11px, weight 700, letter-spacing 0.1em, uppercase

---

### PAGE STRUCTURE (top to bottom)

#### 1. STICKY HEADER
- Glass effect: background rgba(250,250,250,0.88) + blur 12px
- Bottom border: 1px solid #EBEBEB
- Left: Flame logo icon (27×40px) + "Passion Spark" text in flame gradient, bold 19px
- Right nav: "Sessions" link | "Connexion" link | "Devenir coach" CTA button
- CTA button: flame gradient bg, white text, rounded-lg, subtle orange box-shadow

#### 2. HERO SECTION
- Background: #FAFAFA with dot pattern
- Giant ghost letter "P" positioned top-right, color #F0EFEF, ~300px, Impact font
- Thin vertical flame bar (3px wide) on the left edge
- Content (padded left of flame bar):
  • Badge pill: flame gradient bg, white text "SESSIONS LIVE · SPORT · PASSION" with dot separator
  • H1 line 1: "VIS TA" + line break + "PASSION." → dark text, 62px, uppercase, weight 900
  • H1 line 2: "MAINTENANT." → flame gradient text, 50px, uppercase, weight 900
  • Body copy: "Des sessions collectives d'1h sur une seule compétence précise — guidées par quelqu'un qui maîtrise vraiment. En petit groupe. 13€ à 20€."
  • Sport filter pills (horizontal scroll): 🥊 MMA  🏀 Basket  ⚽ Football  🥋 Boxe  🎾 Tennis  → "+ d'autres"
    Pills: white bg, #EBEBEB border, 12px font, rounded-full
  • Primary CTA: "Trouver une session →" — flame gradient, white text, rounded-xl, full width, strong shadow
  • Secondary CTA: "Je suis coach, je crée ma session" — white bg, grey border, muted text

#### 3. STATS BAR (dark strip)
- Full-width dark background #0F0F0F
- 4 stats in a row, equal spacing:
  • "127+"  / SESSIONS
  • "2k+"   / PASSIONNÉS
  • "14"    / VILLES
  • "4.9★"  / NOTE MOYENNE
- Numbers: flame gradient text, 22px bold
- Labels: #555, 10px uppercase, letter-spacing 0.06em

#### 4. "C'EST QUOI ?" SECTION
- White background
- Section title with thin vertical flame bar on left: "C'est quoi Passion Spark ?"
- Short paragraph explaining the concept
- 2-column card grid:
  Card 1 "Découverte" — top border #16a34a (green), emoji 🌱, "Première fois", "Zéro prérequis. Juste l'envie d'essayer."
  Card 2 "Progression" — top border #2563eb (blue), emoji 🎯, "Débloquer un point", "Un coach focalisé sur ta difficulté précise."
  Cards: white bg, #EBEBEB border, rounded-xl, light shadow

#### 5. "COMMENT ÇA MARCHE" SECTION
- Background: #F5F4F2 (warm light gray band)
- Section title: "Réserve en 30 secondes"
- 3 step rows, each with:
  • Circle with number (1, 2, 3) — white bg, flame gradient border (2px)
  • Number text in flame gradient
  • Title (bold 14px) + description (muted 13px)
  Steps:
  1. "Tu trouves une session" — Filtre par sport, type, ville. Chaque session cible une compétence précise.
  2. "Tu réserves en 30 secondes" — Prénom + email + paiement sécurisé. Apple Pay & Google Pay acceptés.
  3. "Tu vis le moment" — QR code à l'entrée. Le coach t'attend. 10 à 15 passionnés comme toi.

#### 6. "SESSIONS DU MOMENT" SECTION
- White background
- Section title: "Des moments qui existent vraiment"
- 3 session cards stacked:

  Card 1:
  Badge "PROGRESSION" (blue pill)  |  Title: "Défense au sol — kimura & rear naked choke"
  Meta: "Paris 11e · Sam 10h · 1h"  |  Price "15€" in flame gradient (22px bold)  |  "4 places"

  Card 2:
  Badge "PROGRESSION" (blue pill)  |  Title: "Tir à 3 points — mécanique de shoot"
  Meta: "Lyon 3e · Dim 14h · 1h"   |  Price "18€" in flame gradient              |  "7 places"

  Card 3:
  Badge "DÉCOUVERTE" (green pill)  |  Title: "Initiation MMA — premières techniques"
  Meta: "Paris 20e · Jeu 19h · 1h" |  Price "13€" in flame gradient              |  "12 places"

  Cards: white bg, #EBEBEB border, rounded-xl, shadow. Price aligned right.

- CTA button: "Voir toutes les sessions →" flame gradient, white text, full width, rounded-xl

#### 7. COACH SECTION (dark block — intentional contrast)
- Full dark background #0F0F0F
- Small badge: flame gradient, white text "TU ES COACH ?"
- H2: "TU TRANSMETS." — white, 46px, uppercase, weight 900
- H3: "ON TE PAIE." — flame gradient text, 38px, uppercase, weight 900
- Body: dark muted text, explains the process
- Example calculation label: "EXEMPLE — 15 JOUEURS × 18€" (muted mono)
- 2 earning cards (dark #161616 bg, flame top border 3px):
  Card 1: "189€" (flame text, 32px) / "tu reçois" / "PAR SESSION"
  Card 2: "756€" (flame text, 32px) / "par mois"  / "×4 SESSIONS"
- Commission bar (full width, 50px tall, 3 sections, rounded):
  70% | flame gradient bg | "70%" white 20px bold | "TOI" label
  22% | #1E1E1E bg         | "22%" gray            | "PLATEFORM"
  8%  | #181818 bg         | "7%"  dark gray       | "REF"
- Note: "→ Tu ramènes tes propres participants : tu gardes 77%"
- Thin flame divider line
- Big CTA: "CRÉE TA PREMIÈRE SESSION GRATUITEMENT" — flame gradient, white, rounded-xl, glowing shadow
- Sub-note: "Gratuit pour les coachs · Payé avant chaque session" (muted centered)

#### 8. FOOTER
- White/light background, top border #EBEBEB
- Left: Flame logo wordmark + tagline "Vis ta passion. Pas que la rêver."
- Right: 2 link columns
  Produit: Sessions | Devenir coach | Se connecter
  Légal:   CGU | Confidentialité | Contact
- Bottom bar: "© 2026 Passion Spark · Paris" left | "Made with 🔥 in France" right

---

### DESIGN PRINCIPLES

- Mobile-first: max content width 560px, centered
- Cards: white bg, 1px #EBEBEB border, border-radius 14px, subtle shadow
- Buttons: border-radius 12px (primary) or 8px (nav)
- No dark mode — intentionally white + flame accents
- The coach section being dark on an otherwise white page is intentional — it creates visual drama
- Generous whitespace between sections (padding: 44px top/bottom per section)
- The flame gradient should feel premium, not gaudy — use it for key moments only

---

### INTERACTIONS (if the tool supports it)

- Header: appears instantly sticky on scroll
- Sport pills: horizontal scroll on mobile, no scrollbar visible
- Session cards: subtle lift on hover (translateY -2px, shadow increase)
- CTAs: slight scale on hover (scale 1.01), brightness increase
- Stats numbers: count-up animation on scroll into view

---

### ASSETS TO USE

Logo flame icon: /public/logo.svg
  → Simple flame shape, gradient from #FF3D00 (bottom) to #FFB700 (top)
  → viewBox 0 0 40 56 (portrait, flame shape)
  → Use at 27×40px in header, 20×30px in footer

Logo wordmark: /public/logo-wordmark.svg
  → Flame icon + "Passion Spark" text in flame gradient
  → Use at 174×37px in header

---

### PAGES TO CREATE (if building full site)

/ (homepage — described above)
/explore (session discovery — grid of session cards with filters: sport, city, type, price)
/sign-in (Clerk auth component, centered, white card)
/sign-up (Clerk auth component, centered, white card, title "Crée ton compte coach")
/legal/cgu
/legal/privacy
/legal/contact
```

---

## VERSION COURTE (pour outils avec limite de tokens)

```
Create a mobile-first landing page for "Passion Spark" — a French platform
for 1h collective sports coaching sessions at 13–20€.

Design style:
- White (#FAFAFA) background with subtle dot pattern
- Flame gradient accent: linear-gradient(90deg, #FFB700, #FF3D00)
- Dark text #111, muted #888, cards white with #EBEBEB border
- One intentional dark section (#0F0F0F) for the "coach" block
- Bold 900-weight typography, tight letter-spacing, uppercase headlines
- Mobile-first, max-width 560px

Sections (top to bottom):
1. Sticky glass header — flame logo + "Passion Spark" wordmark + nav
2. Hero — ghost "P" letter bg, vertical flame bar, big uppercase title
   "VIS TA PASSION. MAINTENANT." + sport filter pills + 2 CTAs
3. Dark stats bar — 127+ sessions · 2k+ passionnés · 14 villes · 4.9★
4. "C'est quoi ?" — 2 cards: Découverte (green) + Progression (blue)
5. "Comment ça marche" — warm gray bg, 3 numbered steps
6. "Sessions du moment" — 3 session cards with badge, title, price in flame
7. Coach dark section — "TU TRANSMETS. ON TE PAIE." + commission bar 70/22/7%
8. Footer — columns Produit + Légal + copyright

French copy. Energetic sports-brand tone. Flame gradient on all key CTAs.
```
