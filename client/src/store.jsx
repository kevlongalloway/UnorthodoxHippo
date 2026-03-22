import { createContext, useContext, useState } from "react";
import { THEMES } from "./themes.js";
import { LENSES } from "./themes.js";

const PrecisContext = createContext(null);

const ME = { id: "me", name: "Sean", handle: "@sean", initials: "SP", ink: 1240, lens: "analyst" };

export function PrecisProvider({ children }) {
  const [themeId, setThemeId] = useState("twilight");
  const T = THEMES[themeId];
  const lensData = LENSES[ME.lens] || LENSES.analyst;

  return (
    <PrecisContext.Provider value={{ T, themeId, setThemeId, user: ME, lensData }}>
      {children}
    </PrecisContext.Provider>
  );
}

export function usePrecis() {
  const ctx = useContext(PrecisContext);
  if (!ctx) throw new Error("usePrecis must be within PrecisProvider");
  return ctx;
}
