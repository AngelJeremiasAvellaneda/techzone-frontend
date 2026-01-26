// src/app/tienda/peripherals/page.jsx
'use client';

import { useState, useEffect } from 'react';
import ProductsLayout from '@/views/layouts/ProductsLayout';
import LoadingScreen from '@/views/components/LoadingScreen';
import { itemService } from '@/models/services/itemService';

export default function PeripheralsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPeripherals();
  }, []);

  const loadPeripherals = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Cargando Peripherals...');
      const peripherals = await itemService.getPeripherals();

      console.log(`✅ Encontradas ${peripherals.length} Peripherals`);
      setProducts(peripherals);
    } catch (err) {
      console.error('❌ Error cargando Peripherals:', err);
      setError(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const subcategories = [
    { label: 'Teclados', categoryId: 17},
    { label: 'Ratones', categoryId: 18},
    { label: 'Monitores', categoryId: 19}
  ];

  if (loading) {
    return <LoadingScreen message="Cargando peripherals..." />;
  }

  return (
    <ProductsLayout
      title="Periféricos"
      products={products}
      subcategories={subcategories}
      category="peripherals"
      isLoading={loading}
      error={error}
      onRetry={loadPeripherals}
    />
  );
}
