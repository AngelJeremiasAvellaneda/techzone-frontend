// src/components/ClientProviders.jsx
'use client';

import { AuthProvider } from '@/models/context/AuthContext';
import { CartProvider } from '@/models/context/CartContext';
import { ThemeProvider } from '@/models/context/ThemeContext';
import { ToastContainer } from './ToastContainer';
import CartDrawer from './CartDrawer';

export function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <ToastContainer />
          <CartDrawer />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}