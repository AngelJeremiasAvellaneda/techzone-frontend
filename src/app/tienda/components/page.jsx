// src/app/tienda/Accesories/page.jsx
'use client';

import { useState, useEffect } from 'react';
import ProductsLayout from '@/views/layouts/ProductsLayout';
import LoadingScreen from '@/views/components/LoadingScreen';
import { itemService } from '@/models/services/itemService';

export default function ComponentsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Cargando Componentes...');
      const components = await itemService.getComponents();

      console.log(`✅ Encontradas ${components.length} Componentes`);
      setProducts(components);
    } catch (err) {
      console.error('❌ Error cargando Componentes:', err);
      setError(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const subcategories = [
    { label: 'Procesadores', categoryId: 14},
    { label: 'Tarjetas gráficas', categoryId: 15},
    { label: 'Memoria RAM', categoryId: 16 }
  ];

  if (loading) {
    return <LoadingScreen message="Cargando Componentes..." />;
  }

  return (
    <ProductsLayout
      title="Componentes"
      products={products}
      subcategories={subcategories}
      category="componentes"
      isLoading={loading}
      error={error}
      onRetry={loadComponents}
    />
  );
}
