// src/components/ClientProviders.jsx
'use client';

import { AuthProvider } from '@/models/context/AuthContext';
import { CartProvider } from '@/models/context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { 
              background: "#1f2937", 
              color: "#f3f4f6", 
              border: "1px solid #374151" 
            },
            success: { 
              iconTheme: { 
                primary: "#3b82f6", 
                secondary: "#ffffff" 
              } 
            },
            error: { 
              iconTheme: { 
                primary: "#ef4444", 
                secondary: "#ffffff" 
              } 
            },
          }}
        />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}