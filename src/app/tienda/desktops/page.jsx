// src/app/tienda/desktops/page.jsx
import ProductsLayout from '@/views/layouts/ProductsLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/views/components/LoadingScreen';

export const metadata = {
  title: 'Desktops | TechZone',
  description: 'Computadoras de escritorio para gaming y trabajo profesional',
};

async function getDesktops() {
  // TODO: Reemplazar con llamada a tu API
  return [
    { 
      id: 4, 
      name: 'Desktop Gaming Pro', 
      price: 1899.99, 
      image: '/images/resources/feature1.png',
      brand: 'ASUS',
      category: 'desktops',
      subcategory: 'gaming',
      description: 'PC gaming con RTX 4080 y i9-13900K'
    },
    { 
      id: 5, 
      name: 'Workstation Pro', 
      price: 2499.99, 
      image: '/images/resources/feature2.png',
      brand: 'HP',
      category: 'desktops',
      subcategory: 'workstation',
      description: 'Estación de trabajo para diseño y desarrollo'
    },
  ];
}

async function getSubcategories() {
  return ['gaming', 'workstation', 'office', 'all-in-one'];
}

export default async function Desktops() {
  const [products, subcategories] = await Promise.all([
    getDesktops(),
    getSubcategories()
  ]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductsLayout
        title="Desktops"
        products={products}
        subcategories={subcategories}
        category="desktops"
      />
    </Suspense>
  );
}