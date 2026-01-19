// /src/components/ClientProviders.jsx
'use client';

import { CartProvider } from '@/models/context/CartContext';
import { AuthProvider } from '@/models/context/AuthContext';
import { ThemeProvider } from '@/models/context/ThemeContext';
import { ToastContainer } from './ToastContainer'; // import normal

export function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
