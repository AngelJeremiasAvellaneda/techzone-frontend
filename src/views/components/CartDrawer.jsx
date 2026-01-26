'use client';

import { X, Plus, Minus, Trash } from 'lucide-react';
import { useCart } from '@/models/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    totalPrice
  } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="w-96 bg-white p-5 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">🛒 Tu carrito</h2>
          <button onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 && (
            <p className="text-gray-500 text-center">
              Tu carrito está vacío
            </p>
          )}

          {cart.map(item => (
            <div
              key={item.id}
              className="flex gap-3 border-b pb-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  S/. {item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 border rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 border rounded"
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold mb-3">
              <span>Total</span>
              <span>S/. {totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-black text-white py-2 rounded">
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
