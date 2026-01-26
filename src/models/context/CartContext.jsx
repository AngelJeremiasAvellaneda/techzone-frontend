'use client';

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar carrito local (sin API por ahora)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('guest_cart');
      if (localCart) {
        try {
          const parsedCart = JSON.parse(localCart);
          setCart(parsedCart);
          setTotalItems(parsedCart.reduce((sum, item) => sum + item.quantity, 0));
        } catch (error) {
          console.error("Error parsing cart:", error);
        }
      }
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    // Simulación local sin backend
    console.log(`Añadiendo producto ${productId}, cantidad: ${quantity}`);
    
    const newItem = {
      id: Date.now(),
      productId,
      quantity,
      name: `Producto ${productId}`,
      price: 99.99,
      image: '/placeholder.jpg'
    };
    
    const newCart = [...cart, newItem];
    setCart(newCart);
    setTotalItems(newCart.reduce((sum, item) => sum + item.quantity, 0));
    
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
    
    return { success: true };
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.productId !== productId);
    setCart(newCart);
    setTotalItems(newCart.reduce((sum, item) => sum + item.quantity, 0));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
    
    return { success: true };
  };

  const updateQuantity = async (productId, quantity) => {
    const newCart = cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(newCart);
    setTotalItems(newCart.reduce((sum, item) => sum + item.quantity, 0));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
    
    return { success: true };
  };

  const clearCart = async () => {
    setCart([]);
    setTotalItems(0);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('guest_cart');
    }
    
    return { success: true };
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
    refreshCart: () => console.log("Refresh cart"),
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