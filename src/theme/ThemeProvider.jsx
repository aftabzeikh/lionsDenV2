import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, themeTokens } from './themeConfig';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return Object.values(THEMES).includes(savedTheme) ? savedTheme : THEMES.NORMAL;
  });

  const setTheme = (name) => {
    if (Object.values(THEMES).includes(name)) {
      setThemeName(name);
      localStorage.setItem('app-theme', name);
    }
  };

  const resetToNormal = () => setTheme(THEMES.NORMAL);

  useEffect(() => {
    const tokens = themeTokens[themeName];
    if (tokens && tokens.colors) {
      const root = document.documentElement;
      Object.entries(tokens.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  }, [themeName]);

  const theme = themeTokens[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme, resetToNormal, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
