import React, { createContext, useContext, useState } from 'react';
import { THEMES } from './themes.js';
import { CURRENT_USER } from './data.js';
import { LENSES } from './themes.js';

const PrecisContext = createContext(null);

export function PrecisProvider({ children }) {
  const [themeId, setThemeId] = useState('twilight');
  const [user] = useState(CURRENT_USER);

  const theme = THEMES[themeId];
  const lensData = LENSES[user.lens] || LENSES.empath;

  return (
    <PrecisContext.Provider value={{ theme, themeId, setThemeId, user, lensData }}>
      {children}
    </PrecisContext.Provider>
  );
}

export function usePrecis() {
  const ctx = useContext(PrecisContext);
  if (!ctx) throw new Error('usePrecis must be used within PrecisProvider');
  return ctx;
}
