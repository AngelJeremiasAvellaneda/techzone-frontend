// /models/hooks/useTheme.js
'use client';

import { useThemeContext } from '../context/ThemeContext';

export default function useTheme() {
  return useThemeContext();
}