"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Read saved preference, default to dark
    const saved = localStorage.getItem("pp-theme");
    const prefersDark = saved ? saved === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("pp-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex items-center justify-center w-8 h-8 rounded-sm transition-colors hover:bg-white/10 dark:hover:bg-white/10"
    >
      {/* Lamp / bulb SVG — glowing in dark mode, off in light mode */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Glow halo — visible only in dark mode */}
        {isDark && (
          <circle cx="12" cy="10" r="7" fill="#FF7A00" opacity="0.12" />
        )}

        {/* Bulb body */}
        <path
          d="M12 2C8.686 2 6 4.686 6 8c0 2.137 1.11 4.017 2.783 5.113C9.5 13.69 9.889 14.359 9.98 15H14.02c.09-.641.48-1.31 1.197-1.887C16.89 12.017 18 10.137 18 8c0-3.314-2.686-6-6-6z"
          fill={isDark ? "#FF7A00" : "none"}
          stroke={isDark ? "#FF7A00" : "currentColor"}
          strokeWidth={isDark ? "0" : "1.5"}
          opacity={isDark ? 1 : 0.5}
        />

        {/* Filament lines (visible in light/off state) */}
        {!isDark && (
          <>
            <line x1="10.5" y1="9" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13.5" y1="9" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}

        {/* Base cap */}
        <rect
          x="9.5" y="15" width="5" height="1.5"
          rx="0.5"
          fill={isDark ? "#FF7A00" : "currentColor"}
          opacity={isDark ? 0.8 : 0.4}
        />
        <rect
          x="9.8" y="17" width="4.4" height="1.5"
          rx="0.5"
          fill={isDark ? "#FF7A00" : "currentColor"}
          opacity={isDark ? 0.6 : 0.3}
        />

        {/* Screw tip */}
        <path
          d="M10.5 19.5 Q12 21 13.5 19.5"
          stroke={isDark ? "#FF7A00" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity={isDark ? 0.5 : 0.25}
        />
      </svg>
    </button>
  );
}
