// src/app/tienda/laptops/page.jsx
'use client';

import { useState, useEffect } from 'react';
import ProductsLayout from '@/views/layouts/ProductsLayout';
import LoadingScreen from '@/views/components/LoadingScreen';
import { itemService } from '@/models/services/itemService';

export default function LaptopsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadLaptops();
  }, []);

  const loadLaptops = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Cargando laptops...');
      const laptops = await itemService.getLaptops();

      console.log(`✅ Encontradas ${laptops.length} laptops`);
      setProducts(laptops);

    } catch (err) {
      console.error('❌ Error cargando laptops:', err);
      setError(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const subcategories = [
    { label: 'Gaming', categoryId: 10 },
    { label: 'Profesionales', categoryId: 11 }
  ];

  if (loading) {
    return <LoadingScreen message="Cargando laptops..." />;
  }

  return (
    <ProductsLayout
      title="Laptops"
      products={products}
      subcategories={subcategories}
      category="laptops"
      isLoading={loading}
      error={error}
      onRetry={loadLaptops}
    />
  );
}
