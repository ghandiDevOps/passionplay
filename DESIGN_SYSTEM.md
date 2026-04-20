# PassionPlay — Design System

> Ce fichier est lu par Claude avant toute intervention design.
> Il contient la source de vérité visuelle du projet.

---

## 1. Philosophie

PassionPlay est une marque **énergique, directe, premium dark**.
Inspirée des marques sportives haut de gamme (Nike, Gymshark) + tech startup.

- **Police display** : Impact / Arial Black — titres en majuscules
- **Police body** : Geist Sans — texte courant, lisible
- **Ton visuel** : sombre, intense, avec des accents flamme orange
- **Mobile-first** : max-width 560px pour les pages mobiles, 7xl pour les pages desktop

---

## 2. Palette de couleurs

### Couleurs principales
```
Background principal  : #1a1a1a  (dark, pas tout noir)
Background carte      : #1e1e1e
Background secondaire : #111111  (plus sombre)
Bordure               : #2a2a2a
Bordure hover         : #3a3a3a
```

### Flamme (accent principal — utiliser avec parcimonie)
```
Flamme jaune          : #FFB700
Flamme orange         : #FF7A00  ← couleur principale de la marque
Flamme rouge          : #FF3D00

Gradient horizontal   : linear-gradient(90deg, #FFB700 0%, #FF3D00 100%)
Gradient vertical     : linear-gradient(180deg, #FFB700 0%, #FF3D00 100%)
Gradient doux         : linear-gradient(90deg, #FF8C00 0%, #FF2E00 100%)
```

### Texte
```
Blanc principal       : #FFFFFF
Blanc atténué         : #F5F5F5
Gris clair            : #AAAAAA
Gris moyen            : #888888
Gris foncé            : #555555
Gris très foncé       : #444444
Fantôme               : #2a2a2a (textes décoratifs)
```

### Statuts
```
Succès / Découverte   : #10b981  (vert emerald)
Info / Progression    : #3b82f6  (bleu)
Alerte                : #FF7A00  (orange flamme)
Erreur                : #FF3D00  (rouge flamme)
En attente            : #FFB700  (jaune)
```

---

## 3. Typographie

### Classes Tailwind personnalisées
```css
font-display     → Impact, 'Arial Black', sans-serif — MAJUSCULES, titres
font-display-md  → 'Arial Black', Impact, sans-serif — sous-titres, labels
font-sans        → Geist Sans — corps de texte
font-mono        → Geist Mono — données, prix, codes
```

### Hiérarchie des tailles
```
H1 hero         : text-[clamp(3rem,8vw,7rem)]  font-display  text-white
H1 page         : text-4xl sm:text-5xl          font-display  text-white
H2 section      : text-2xl sm:text-3xl          font-display  text-white
Label section   : text-xs tracking-[0.2em]      font-display-md text-[#FF7A00]
Corps           : text-sm / text-base           font-sans     text-[#aaa]
Prix            : text-xl / text-2xl            font-display  text-[#FF7A00]
Label mono      : text-[10px] tracking-widest   font-display-md text-[#555]
```

### Règle d'or
- Tous les titres en **MAJUSCULES** avec `font-display`
- `letter-spacing: -0.03em` sur les gros titres (tight)
- `tracking-[0.2em]` sur les labels (wide)

---

## 4. Composants

### Bouton principal (btn-passion)
```css
background: linear-gradient(90deg, #FFB700, #FF3D00)
color: white
font: font-display-md uppercase tracking-wider
padding: px-6 py-3
border-radius: rounded-none (carré, pas arrondi)
hover: brightness-110
active: scale-95
shadow: 0 0 20px rgba(255,122,0,0.3)  ← effet glow
```

### Bouton outline (btn-passion-outline)
```css
border: 1px solid #FF7A00
color: #FF7A00
background: transparent
hover: bg-[#FF7A00]/10
```

### Carte session
```css
background: #1e1e1e
border: 1px solid #2a2a2a
border-radius: 0 (carré)
hover: border-[#FF7A00]/40
transition: colors 200ms
padding: p-4 sm:p-5
```

### Barre de progression places
```css
background: #2a2a2a  (track)
height: 1px (h-px)
fill: #FF7A00 (normal) ou #FF3D00 (complet)
```

### Label section (motif récurrent)
```jsx
<div className="flex items-center gap-2 mb-2">
  <div className="w-1 h-5 bg-[#FF7A00]" />  {/* barre flamme */}
  <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">LABEL</span>
</div>
<h2 className="font-display text-4xl text-white">Titre</h2>
```

### Watermark / Ghost number
```jsx
<span className="watermark-number right-0 bottom-20">99</span>
/* position: absolute, font-display, text-[#1e1e1e], text-[20rem], pointer-events-none */
```

---

## 5. Layout

### Pages marketing (homepage, explore)
```
max-width: max-w-7xl (1280px)
padding: px-4 sm:px-6 lg:px-8
```

### Pages coach / mobile
```
max-width: max-w-lg (512px)
padding: px-4 py-8
bottom-padding (mobile nav): pb-24
```

### Sections
```
vertical padding entre sections: py-16 sm:py-20
section dark (full-width): bg-[#111] border-y border-[#2a2a2a]
```

---

## 6. Animations

### animate-ticker (stats bar)
```css
@keyframes ticker {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
animation: ticker 20s linear infinite
```

### pulse-orange (CTA principal)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 15px rgba(255,122,0,0.3) }
  50%       { box-shadow: 0 0 30px rgba(255,122,0,0.6) }
}
animation: pulse-glow 2s ease-in-out infinite
```

### Transitions standard
```
couleurs / border  : transition-colors duration-200
transform          : transition-transform duration-150
opacity            : transition-opacity duration-300
```

---

## 7. Icônes et emojis par domaine

```
MMA / Boxe     : 🥊
Football       : ⚽
Basket         : 🏀
Padel / Tennis : 🎾
Yoga           : 🧘
Musique        : 🎸
Cuisine        : 🍳
Business       : 💼
Art            : 🎨
```

---

## 8. Grille de spacing

```
4px   → gap-1   (micro)
8px   → gap-2   (tight)
12px  → gap-3   (normal)
16px  → gap-4   (comfortable)
20px  → gap-5
24px  → gap-6   (spacious)
32px  → gap-8   (section)
40px  → gap-10  (large section)
```

---

## 9. Patterns récurrents à réutiliser

### Card avec top-border flamme
```jsx
<div className="bg-[#1e1e1e] border border-[#2a2a2a] p-5 relative overflow-hidden">
  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFB700] to-[#FF3D00]" />
  {/* contenu */}
</div>
```

### Prix en flamme
```jsx
<p className="font-display text-2xl text-[#FF7A00]">{formatPrice(priceCents)}</p>
```

### Badge statut
```jsx
<span className="font-display-md text-[10px] tracking-[0.12em] text-[#10b981]">DÉCOUVERTE</span>
<span className="font-display-md text-[10px] tracking-[0.12em] text-[#3b82f6]">PROGRESSION</span>
```

### Nombre de places restantes (urgence)
```jsx
{/* ≤ 3 places → rouge urgent */}
{remaining <= 3 && <span className="text-[#FF3D00] font-display-md text-xs">🔥 {remaining} PLACE{remaining > 1 ? 'S' : ''}</span>}
```

---

## 10. Ce qu'il NE FAUT PAS faire

❌ Coins très arrondis (rounded-2xl, rounded-full sur les cartes) — PP est angulaire
❌ Fond blanc — le site est dark
❌ Couleurs pastel
❌ Texte body en majuscules (réservé aux titres/labels)
❌ Gradients rainbow — uniquement flamme (jaune → rouge)
❌ Ombres colorées autres qu'orange (#FF7A00)
❌ Plus de 2 niveaux de gris dans la même carte
