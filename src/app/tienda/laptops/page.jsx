// src/app/tienda/laptops/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Laptops() {
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo (reemplazar con API real)
  const laptops = [
    { id: 1, name: 'Laptop Gaming Pro', price: 1299.99, image: '/images/resources/feature1.png' },
    { id: 2, name: 'Laptop Ultrabook', price: 899.99, image: '/images/resources/feature2.png' },
    { id: 3, name: 'Laptop Business', price: 1099.99, image: '/images/resources/feature3.png' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Laptops</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Portátiles de última generación para gaming, trabajo y estudio
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {laptops.map((laptop) => (
                <Link
                  key={laptop.id}
                  href={`/tienda/producto/${laptop.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                    {/* Image placeholder - usar Image de Next.js cuando tengas imágenes reales */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Imagen del producto
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {laptop.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${laptop.price.toFixed(2)}
                      </span>
                      <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                        Laptop
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¿Necesitas ayuda para elegir?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Contamos con asesores especializados que te ayudarán a encontrar la laptop perfecta según tus necesidades.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Contactar a un asesor
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}