import React, { useEffect, useState } from "react";

export default function DarkModeToggle({ iconOnly }) {
  const [dark, setDark] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-colors", "duration-500");
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    // Clean up transition class on unmount
    return () => {
      html.classList.remove("transition-colors", "duration-500");
    };
  }, [dark]);

  return (
    <button
      className={`hidden md:flex ml-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-500 items-center justify-center ${iconOnly ? 'w-10 h-10 p-0' : ''}`}
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
    >
      {iconOnly ? (
        dark ? <span role="img" aria-label="Dark">🌙</span> : <span role="img" aria-label="Light">☀️</span>
      ) : (
        dark ? "🌙 Dark" : "☀️ Light"
      )}
    </button>
  );
} 