// src/views/components/products/ProductsQuickLinks.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function ProductsQuickLinks({ links = [] }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Explorar Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`${link.color || 'bg-gray-50'} p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 text-left group`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{link.icon}</div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {link.name}
                  </div>
                  {link.count && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {link.count} productos
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}