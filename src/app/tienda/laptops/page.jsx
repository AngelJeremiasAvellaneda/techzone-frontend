// src/app/tienda/laptops/page.jsx
import ProductsLayout from '@/views/layouts/ProductsLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/views/components/LoadingScreen';

export const metadata = {
  title: 'Laptops | TechZone',
  description: 'Encuentra las mejores laptops para gaming, trabajo y estudio',
};

// 🔗 BACKEND URL
const API_URL = 'http://localhost:8080/api/items';

async function getLaptops() {
  const res = await fetch(API_URL, {
    cache: 'no-store', // importante en Next App Router
  });

  if (!res.ok) {
    throw new Error('Error al cargar productos');
  }

  const items = await res.json();

  // 🔄 Adaptar backend → frontend
  return items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    image: '/images/resources/feature1.png', // temporal
    brand: 'TechZone', // temporal
    category: 'laptops',
    subcategory: 'general',
  }));
}

async function getSubcategories() {
  // por ahora fijo, luego viene de categories
  return ['gaming', 'ultrabook', 'business', 'convertible'];
}

export default async function Laptops() {
  const [products, subcategories] = await Promise.all([
    getLaptops(),
    getSubcategories(),
  ]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductsLayout
        title="Laptops"
        products={products}
        subcategories={subcategories}
        category="laptops"
      />
    </Suspense>
  );
}
