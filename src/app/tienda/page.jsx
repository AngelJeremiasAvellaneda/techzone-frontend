'use client';

import { useState, useEffect } from 'react';
import BaseLayout from '@/views/layouts/BaseLayout';
import ProductsLayout from '@/views/layouts/ProductsLayout';
import { useProducts } from '@/models/hooks/useProducts';

export default function TiendaPage() {
  const { products, loading, error } = useProducts();
  const [allProducts, setAllProducts] = useState([]);

  // Datos de ejemplo para categorías
  const subcategories = [
    { id: 'laptops', name: 'Laptops', slug: 'laptops' },
    { id: 'desktops', name: 'Computadoras', slug: 'desktops' },
    { id: 'accesories', name: 'Accesorios', slug: 'accesories' },
  ];

  useEffect(() => {
    if (products && products.length > 0) {
      setAllProducts(products);
    } else {
      // Datos de ejemplo si no hay conexión
      setAllProducts([
        {
          id: 1,
          name: 'Laptop Gamer Asus ROG',
          description: 'Laptop gaming con procesador Intel i7, 16GB RAM, RTX 3060',
          price: 4599,
          brand: 'Asus',
          category: 'Laptops',
          subcategory: 'laptops',
          image: '/images/laptop.jpg',
          stock: 5,
          discount: 10,
          specs: ['Gaming', '16GB RAM', 'RTX 3060']
        },
        {
          id: 2,
          name: 'PC Gamer Intel i9',
          description: 'Computadora de escritorio para gaming y trabajo',
          price: 6999,
          brand: 'Intel',
          category: 'Computadoras',
          subcategory: 'desktops',
          image: '/images/pc-gamer.jpg',
          stock: 3,
          discount: 15,
          specs: ['Intel i9', '32GB RAM', 'RTX 4070']
        },
        {
          id: 3,
          name: 'Mouse Gaming Logitech',
          description: 'Mouse RGB con 8 botones programables',
          price: 199,
          brand: 'Logitech',
          category: 'Accesorios',
          subcategory: 'accesories',
          image: '/images/mouse.jpg',
          stock: 20,
          discount: 5,
          specs: ['RGB', 'Programmable', 'Gaming']
        },
        {
          id: 4,
          name: 'Teclado Mecánico Redragon',
          description: 'Teclado mecánico switches azules, RGB',
          price: 299,
          brand: 'Redragon',
          category: 'Accesorios',
          subcategory: 'accesories',
          image: '/images/keyboard.jpg',
          stock: 15,
          discount: 0,
          specs: ['Mechanical', 'RGB', 'Blue Switches']
        },
        {
          id: 5,
          name: 'Monitor 27" 144Hz',
          description: 'Monitor gaming 144Hz, 1ms, FreeSync',
          price: 1599,
          brand: 'AOC',
          category: 'Accesorios',
          subcategory: 'accesories',
          image: '/images/monitor.jpg',
          stock: 8,
          discount: 12,
          specs: ['144Hz', '1ms', 'FreeSync']
        },
        {
          id: 6,
          name: 'Laptop HP Pavilion',
          description: 'Laptop para trabajo y estudio',
          price: 2999,
          brand: 'HP',
          category: 'Laptops',
          subcategory: 'laptops',
          image: '/images/laptop-hp.jpg',
          stock: 12,
          discount: 8,
          specs: ['i5', '8GB RAM', '512GB SSD']
        }
      ]);
    }
  }, [products]);

  if (loading) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">Error al cargar productos</div>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="min-h-screen pt-24 pb-12">
        <ProductsLayout 
          title="Tienda TechZone"
          products={allProducts}
          subcategories={subcategories}
          category="all"
        />
      </div>
    </BaseLayout>
  );
}