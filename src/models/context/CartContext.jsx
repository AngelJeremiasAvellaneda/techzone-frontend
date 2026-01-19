// src/models/context/CartContext.jsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api-client";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar carrito desde API
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const cartData = await apiClient.get('/cart');
      setCart(cartData.items || []);
      setTotalItems(cartData.totalItems || 0);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      // Si no hay usuario, usar carrito local
      if (typeof window !== 'undefined') {
        const localCart = localStorage.getItem('guest_cart');
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          setCart(parsedCart);
          setTotalItems(parsedCart.reduce((sum, item) => sum + item.quantity, 0));
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await apiClient.post('/cart/add', {
        productId,
        quantity,
      });

      if (response.success) {
        await fetchCart(); // Refrescar carrito
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await apiClient.delete(`/cart/remove/${productId}`);
      
      if (response.success) {
        await fetchCart();
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      return { success: false, error: error.message };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await apiClient.put('/cart/update', {
        productId,
        quantity,
      });

      if (response.success) {
        await fetchCart();
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      const response = await apiClient.delete('/cart/clear');
      
      if (response.success) {
        setCart([]);
        setTotalItems(0);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    cart,
    totalItems,
    cartOpen,
    setCartOpen,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart: fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
};