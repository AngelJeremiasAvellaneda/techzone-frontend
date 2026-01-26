// src/app/checkout/page.jsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/models/context/CartContext";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield,
  CheckCircle 
} from "lucide-react";
import BaseLayout from "@/views/layouts/BaseLayout";

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();
  const [step, setStep] = useState(1);

  const shipping = totalPrice > 100 ? 0 : 10;
  const finalTotal = totalPrice + shipping;

  return (
    <BaseLayout title="Checkout - TechZone">
      <main className="mt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-primary transition-colors">
            Carrito
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100">Checkout</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Finalizar Compra
            </h1>

            {/* Pasos */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {['Información', 'Envío', 'Pago'].map((label, index) => (
                  <div key={label} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${step > index + 1 ? 'bg-green-500' : 
                        step === index + 1 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}
                      ${step === index + 1 ? 'ring-2 ring-primary ring-offset-2' : ''}
                      text-white font-bold
                    `}>
                      {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`ml-2 font-medium ${step === index + 1 ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                      {label}
                    </span>
                    {index < 2 && (
                      <div className={`w-16 h-1 mx-4 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario básico */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>

              <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg transition-all shadow-lg">
                Continuar con el pago
              </button>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:sticky lg:top-20">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Resumen del pedido
              </h2>

              {/* Productos */}
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-gray-800"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.quantity} × S/. {item.price.toLocaleString("es-PE")}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      S/. {(item.price * item.quantity).toLocaleString("es-PE")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold">
                    S/. {totalPrice.toLocaleString("es-PE")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Gratis' : `S/. ${shipping.toLocaleString("es-PE")}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span>Total</span>
                  <span>S/. {finalTotal.toLocaleString("es-PE")}</span>
                </div>
              </div>

              {/* Seguridad */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 text-green-600 dark:text-green-400 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Pago 100% seguro</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tus datos están protegidos con encriptación SSL de 256-bit
                </p>
              </div>
            </div>

            {/* Volver al carrito */}
            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 mt-4 w-full py-3 border-2 border-primary/30 rounded-lg hover:bg-primary/10 transition-colors text-gray-900 dark:text-gray-100 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al carrito
            </Link>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

export default CheckoutPage;