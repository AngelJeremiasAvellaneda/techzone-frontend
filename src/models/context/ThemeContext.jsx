// /models/context/ThemeContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext debe ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Inicializar tema desde localStorage o preferencia del sistema
  useEffect(() => {
    const storedTheme = localStorage.getItem('techzone-theme');
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    setMounted(true);
  }, []);

  // Aplicar tema al documento
  useEffect(() => {
    if (!mounted) return;

    // Aplicar clase al html
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Guardar en localStorage
    localStorage.setItem('techzone-theme', theme);

    // También actualizar meta theme-color para navegadores móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#111827' : '#ffffff'
      );
    }
  }, [theme, mounted]);

  // Toggle entre light/dark
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Setear tema específico
  const setThemeMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setTheme(mode);
    }
  };

  // Detectar si el sistema prefiere dark mode
  const useSystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  };

  // Value para el contexto
  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    useSystemTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};