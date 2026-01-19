'use client';

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/models/context/CartContext";
import { useAuth } from "@/models/context/AuthContext";
import { useToast } from "@/models/hooks/useToast";
import { ROUTES } from "@/constants/routes";
import {
  XCircle, Trash2, Plus, Minus, ShoppingCart, 
  ArrowRight, Package, AlertCircle, CheckCircle
} from "@/components/icons";

const CartDrawer = ({ open, setOpen }) => {
  const {
    cart,
    updateQuantity,
    removeItem,
    emptyCart,
    totalItems,
    totalPrice,
    cartTotal,
    shippingCost,
    tax,
  } = useCartContext();
  
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const drawerRef = useRef(null);

  // Manejar inert y focus cuando el drawer se abre/cierra
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (open) {
      drawer.removeAttribute("inert");
      document.body.style.overflow = 'hidden';
      
      // Enfocar el primer elemento enfocable después de un breve delay
      setTimeout(() => {
        const firstFocusable = drawer.querySelector("button, [href], input, select, textarea");
        if (firstFocusable) firstFocusable.focus();
      }, 100);
    } else {
      drawer.setAttribute("inert", "true");
      document.body.style.overflow = '';
      
      const active = document.activeElement;
      if (active && drawer.contains(active)) active.blur();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, setOpen]);

  // Calcular precios
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'warning');
      return;
    }

    if (!user) {
      showToast('Inicia sesión para continuar con la compra', 'warning');
      router.push(ROUTES.LOGIN);
      setOpen(false);
      return;
    }

    setOpen(false);
    router.push(ROUTES.CHECKOUT);
  };

  const handleRemoveItem = (itemId, itemName) => {
    if (window.confirm(`¿Eliminar "${itemName}" del carrito?`)) {
      removeItem(itemId);
      showToast('Producto eliminado del carrito', 'success');
    }
  };

  const handleEmptyCart = () => {
    if (cart.length === 0) return;
    
    if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
      emptyCart();
      showToast('Carrito vaciado', 'success');
    }
  };

  const handleUpdateQuantity = (itemId, change) => {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
      handleRemoveItem(itemId, item.name);
      return;
    }

    if (newQuantity > item.stock) {
      showToast(`Solo quedan ${item.stock} unidades disponibles`, 'warning');
      return;
    }

    updateQuantity(itemId, change);
  };

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full bg-white dark:bg-gray-900 shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          w-full sm:w-96 md:w-[28rem]
          flex flex-col
          border-l border-gray-200 dark:border-gray-800
          backdrop-blur-xl bg-white/95 dark:bg-gray-900/95
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="font-bold text-gray-900 dark:text-white text-xl">
              Carrito ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Cerrar carrito"
          >
            <XCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* LISTA (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="w-20 h-20 text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                Agrega productos para comenzar tu compra
              </p>
              <Link
                href={ROUTES.SHOP}
                onClick={() => setOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            <>
              {/* Productos */}
              {cart.map(item => (
                <div
                  key={`${item.id}-${item.variant || 'default'}`}
                  className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                >
                  {/* Imagen */}
                  <Link
                    href={`${ROUTES.PRODUCT_DETAIL(item.id)}`}
                    onClick={() => setOpen(false)}
                    className="flex-shrink-0 group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={item.image || '/images/placeholder.jpg'}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {item.discount > 0 && (
                        <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`${ROUTES.PRODUCT_DETAIL(item.id)}`}
                      onClick={() => setOpen(false)}
                      className="font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2 mb-1"
                    >
                      {item.name}
                    </Link>

                    {item.variant && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Variante: {item.variant}
                      </p>
                    )}

                    {/* Precio */}
                    <div className="flex items-center gap-2 mb-3">
                      {item.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">
                            {formatPrice(item.price * (1 - item.discount / 100))}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {formatPrice(item.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* Controles */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                        </button>

                        <span className="px-3 font-semibold text-gray-900 dark:text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                          aria-label="Aumentar cantidad"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className={`w-3 h-3 ${item.quantity >= item.stock ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {formatPrice(item.price * item.quantity * (1 - (item.discount || 0) / 100))}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stock */}
                    {item.stock <= 10 && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                        {item.stock <= 5 ? '⚠️ Quedan pocas unidades' : 'Últimas unidades disponibles'}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Cupón de descuento */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-gray-900 dark:text-white">¿Tienes un cupón?</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm">
                    Aplicar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER FIJO */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4">
            {/* Resumen */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(calculateSubtotal())}
                </span>
              </div>
              
              {shippingCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Envío:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatPrice(shippingCost)}
                  </span>
                </div>
              )}
              
              {tax > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Impuestos:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(tax)}
                  </span>
                </div>
              )}
              
              {shippingCost === 0 && calculateSubtotal() > 100 && (
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    ¡Envío gratis!
                  </span>
                  <span className="font-medium">S/. 0.00</span>
                </div>
              )}
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">Total:</span>
                  <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Proceder al pago
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex gap-3">
                <Link
                  href={ROUTES.CART}
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Ver carrito completo
                </Link>
                
                <button
                  onClick={handleEmptyCart}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar
                </button>
              </div>
            </div>

            {/* Nota de seguridad */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Pago 100% seguro · Tus datos están protegidos
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;