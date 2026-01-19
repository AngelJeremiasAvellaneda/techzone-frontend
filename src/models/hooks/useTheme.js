// src/models/hooks/useTheme.js
'use client';

import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Cargar tema desde localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
}