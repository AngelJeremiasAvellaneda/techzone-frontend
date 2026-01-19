// src/app/tienda/laptops/page.jsx
import ProductsLayout from '@/views/layouts/ProductsLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/views/components/LoadingScreen';

export const metadata = {
  title: 'Laptops | TechZone',
  description: 'Encuentra las mejores laptops para gaming, trabajo y estudio',
};

async function getLaptops() {
  // TODO: Reemplazar con llamada a tu API
  // Por ahora datos de ejemplo
  return [
    { 
      id: 1, 
      name: 'Laptop Gaming Pro', 
      price: 1299.99, 
      image: '/images/resources/feature1.png',
      brand: 'ASUS',
      category: 'laptops',
      subcategory: 'gaming',
      description: 'Potente laptop para gaming con RTX 4070'
    },
    { 
      id: 2, 
      name: 'Laptop Ultrabook', 
      price: 899.99, 
      image: '/images/resources/feature2.png',
      brand: 'Dell',
      category: 'laptops',
      subcategory: 'ultrabook',
      description: 'Ultrabook ligero para trabajo y estudio'
    },
    { 
      id: 3, 
      name: 'Laptop Business', 
      price: 1099.99, 
      image: '/images/resources/feature3.png',
      brand: 'HP',
      category: 'laptops',
      subcategory: 'business',
      description: 'Laptop empresarial con máxima seguridad'
    },
  ];
}

async function getSubcategories() {
  // TODO: Reemplazar con llamada a tu API
  return ['gaming', 'ultrabook', 'business', 'convertible'];
}

export default async function Laptops() {
  const [products, subcategories] = await Promise.all([
    getLaptops(),
    getSubcategories()
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