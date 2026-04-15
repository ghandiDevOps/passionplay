import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./emails/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales PassionPlay — Palette FLAMME
        passion: {
          50:  "#fff9e6",
          100: "#fff0b3",
          200: "#ffe066",
          300: "#ffcc00",
          400: "#ffb700",  // Jaune flamme
          500: "#ff7a00",  // Orange flamme — couleur primaire
          600: "#ff5500",
          700: "#ff3d00",  // Orange profond
          800: "#cc2200",
          900: "#991a00",
          950: "#4d0d00",
        },
        flame: {
          yellow: "#FFB700",
          orange: "#FF7A00",
          deep:   "#FF3D00",
        },
        discovery: {
          DEFAULT: "#22c55e",   // Vert — badge Découverte
          light:   "#dcfce7",
          dark:    "#15803d",
        },
        progression: {
          DEFAULT: "#3b82f6",   // Bleu — badge Progression
          light:   "#dbeafe",
          dark:    "#1d4ed8",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scan-line": "scanLine 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        scanLine: {
          "0%":   { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
