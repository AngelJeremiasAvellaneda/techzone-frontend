// src/app/tienda/page.jsx
import Link from 'next/link';
import { Laptop, Monitor, Headphones } from 'lucide-react';

export const metadata = {
  title: 'Tienda | TechZone',
  description: 'Explora todos nuestros productos tecnológicos',
};

export default function Tienda() {
  const categories = [
    {
      name: 'Laptops',
      icon: Laptop,
      href: '/tienda/laptops',
      description: 'Portátiles de última generación',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Desktops',
      icon: Monitor,
      href: '/tienda/desktops',
      description: 'Computadoras de escritorio potentes',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Accesorios',
      icon: Headphones,
      href: '/tienda/accessories',
      description: 'Periféricos y complementos',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestra Tienda</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Explora nuestras categorías y encuentra el producto perfecto para ti.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br via-transparent p-8 hover:scale-[1.02] transition-transform"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative z-10">
                  <Icon className="w-16 h-16 mb-6 text-gray-900 dark:text-white" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                  <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    <span>Ver productos</span>
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Productos Destacados</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nuestros productos destacados estarán disponibles próximamente
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Estamos preparando las mejores ofertas para ti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}