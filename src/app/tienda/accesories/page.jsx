// src/app/tienda/accessories/page.jsx
import ProductsLayout from '@/views/layouts/ProductsLayout';
import { Suspense } from 'react';
import LoadingScreen from '@/views/components/LoadingScreen';

export const metadata = {
  title: 'Accesorios | TechZone',
  description: 'Periféricos y accesorios para tu setup tecnológico',
};

async function getAccessories() {
  // TODO: Reemplazar con llamada a tu API
  return [
    { 
      id: 6, 
      name: 'Teclado Mecánico RGB', 
      price: 89.99, 
      image: '/images/resources/feature3.png',
      brand: 'Razer',
      category: 'accessories',
      subcategory: 'keyboards',
      description: 'Teclado gaming mecánico con RGB personalizable'
    },
    { 
      id: 7, 
      name: 'Mouse Gaming', 
      price: 59.99, 
      image: '/images/resources/feature1.png',
      brand: 'Logitech',
      category: 'accessories',
      subcategory: 'mice',
      description: 'Mouse gaming con sensor de alta precisión'
    },
  ];
}

async function getSubcategories() {
  return ['keyboards', 'mice', 'headsets', 'monitors', 'cables'];
}

export default async function Accessories() {
  const [products, subcategories] = await Promise.all([
    getAccessories(),
    getSubcategories()
  ]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductsLayout
        title="Accesorios"
        products={products}
        subcategories={subcategories}
        category="accessories"
      />
    </Suspense>
  );
}