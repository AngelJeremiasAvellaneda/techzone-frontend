// src/components/CartDrawer.jsx
'use client';

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/models/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

const CartDrawer = () => {
  const {
    cart,
    updateQuantity,
    removeItem,
    emptyCart,
    totalItems,
    totalPrice,
    cartOpen,
    setCartOpen
  } = useCart();

  const drawerRef = useRef(null);

  // Manejar focus + scroll lock
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (cartOpen) {
      document.body.style.overflow = 'hidden';

      const firstFocusable = drawer.querySelector(
        "button, [href], input, select, textarea"
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && cartOpen) {
        setCartOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [cartOpen, setCartOpen]);

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        aria-hidden={!cartOpen}
        className={`
          fixed top-0 right-0 h-full z-50
          w-full sm:w-96
          bg-white dark:bg-gray-900
          border-l border-gray-200 dark:border-gray-800
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Carrito ({totalItems})
            </h2>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LISTA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tu carrito está vacío
              </p>

              <Link
                href="/"
                onClick={() => setCartOpen(false)}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-lg"
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                {/* Imagen */}
                <Link
                  href={`/products/${item.id}`}
                  onClick={() => setCartOpen(false)}
                  className="shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain bg-white dark:bg-gray-900 rounded-lg"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.id}`}
                    onClick={() => setCartOpen(false)}
                    className="block font-semibold text-gray-900 dark:text-gray-100 line-clamp-2"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-1 text-lg font-bold text-primary">
                    S/. {Number(item.price).toLocaleString("es-PE")}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-3 font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-bold text-primary text-2xl">
                S/. {Number(totalPrice).toLocaleString("es-PE")}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg"
            >
              Ver carrito
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => {
                if (confirm('¿Vaciar carrito?')) emptyCart();
              }}
              className="w-full border-2 border-red-500 text-red-500 py-2 rounded-lg"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
