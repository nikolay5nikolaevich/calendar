import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("darkMode") !== "false"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <button
      className="dark_toggle"
      onClick={() => setDark((d) => !d)}
      aria-label="Переключить тему"
      title={dark ? "Светлая тема" : "Тёмная тема"}
    >
      {dark ? (
        // dark active → show "minus" (light = remove dark)
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      ) : (
        // light active → show "plus" (dark = add dark)
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      )}
    </button>
  );
}
