// src/views/layouts/ProductsLayout/ProductsLayout.jsx
'use client';

import BaseLayout from '@/views/layouts/BaseLayout';
import useProductsFilter from '@/models/hooks/useProductsFilter';
import ProductsHeader from '@/views/components/products/ProductsHeader';
import ProductsSidebar from '@/views/components/products/ProductsSidebar';
import ProductCard from '@/views/components/products/ProductCard';
import { ROUTES } from "@/constants/routes";
import { slugify } from '@/utils/slugify';
import { useCartContext } from "@/models/context/CartContext";

export default function ProductsLayout({ 
  title, 
  products = [], 
  subcategories = [], 
  category 
}) {
  const { addToCart } = useCartContext();
  
  // Usar el hook de filtrado
  const filter = useProductsFilter(products, subcategories);
  
  // Función para generar URL del producto
  const getProductUrl = (product) => {
    const slug = product.slug || slugify(product.name);
    return ROUTES.PRODUCT_DETAIL(product.id);
  };

  // Función para agregar al carrito
  const handleAddToCart = (product, cantidad) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '/images/placeholder.jpg',
      quantity: cantidad,
      stock: product.stock || 10
    });
  };

  // Renderizar sidebar
  const sidebar = ProductsSidebar({
    filters: filter.filters,
    updateFilter: filter.updateFilter,
    resetFilters: filter.resetFilters,
    marcas: filter.marcas,
    specsUnicos: filter.specsUnicos,
    subcategories: filter.subcategories,
    precios: filter.precios,
    category,
    mobileFiltersOpen: filter.mobileFiltersOpen,
    setMobileFiltersOpen: filter.setMobileFiltersOpen,
  });

  return (
    <BaseLayout>
      {/* Header */}
      <ProductsHeader
        title={title}
        filteredTotal={filter.filteredTotal}
        filters={filter.filters}
        updateFilter={filter.updateFilter}
        viewMode={filter.viewMode}
        setViewMode={filter.setViewMode}
        onOpenMobileFilters={() => filter.setMobileFiltersOpen(true)}
      />

      {/* Main */}
      <main className="px-4 sm:px-6 lg:px-8 relative lg:flex lg:gap-8 mt-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="lg:flex lg:gap-8">
            {/* Sidebar escritorio */}
            {sidebar.desktop}

            {/* Separador */}
            <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700"></div>

            {/* Botón y modal móvil */}
            {sidebar.mobileButton}
            {sidebar.mobileModal}

            {/* Lista de productos */}
            <section className="w-full lg:w-3/4">
              {filter.productosFiltrados.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Intenta con otros filtros o busca productos diferentes
                  </p>
                  <button
                    onClick={filter.resetFilters}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className={filter.viewMode === 'list' ? 'space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
                  {filter.productosFiltrados.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={filter.viewMode}
                      cantidad={filter.cantidades[product.id] || 1}
                      onIncrement={() => filter.incrementar(product.id)}
                      onDecrement={() => filter.decrementar(product.id)}
                      onAddToCart={() => handleAddToCart(product, filter.cantidades[product.id] || 1)}
                      productUrl={getProductUrl(product)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}