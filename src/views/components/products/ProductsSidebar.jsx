// src/views/layouts/ProductsLayout/components/ProductsSidebar.jsx
'use client';

import { Filter, X } from "@/components/icons";
import FiltrosUI from "@/views/components/FiltrosUI";

export default function ProductsSidebar({
  filters,
  updateFilter,
  resetFilters,
  marcas,
  specsUnicos,
  subcategories,
  precios,
  category,
  mobileFiltersOpen,
  setMobileFiltersOpen
}) {
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtros</h2>
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          <X className="w-4 h-4" />
          Limpiar
        </button>
      </div>

      <FiltrosUI
        marca={filters.marca}
        setMarca={(value) => updateFilter('marca', value)}
        subcategoria={filters.subcategoria}
        setSubcategoria={(value) => updateFilter('subcategoria', value)}
        especificacion={filters.especificacion}
        setEspecificacion={(value) => updateFilter('especificacion', value)}
        orden={filters.orden}
        setOrden={(value) => updateFilter('orden', value)}
        precioMax={filters.precioMax}
        setPrecioMax={(value) => updateFilter('precioMax', value)}
        precioMaxReal={precios.precioMaxReal}
        subcategories={subcategories}
        category={category}
        marcas={marcas}
        specsUnicos={specsUnicos}
      />
    </>
  );

  // Modal móvil
  const mobileModal = mobileFiltersOpen && (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-800 z-50 p-6 overflow-auto lg:hidden transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtros</h2>
          <button 
            onClick={() => setMobileFiltersOpen(false)} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <button
          onClick={() => { 
            resetFilters(); 
            setMobileFiltersOpen(false); 
          }}
          className="mb-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium"
        >
          <X className="w-4 h-4" />
          Limpiar todos los filtros
        </button>

        <FiltrosUI
          marca={filters.marca}
          setMarca={(value) => updateFilter('marca', value)}
          subcategoria={filters.subcategoria}
          setSubcategoria={(value) => updateFilter('subcategoria', value)}
          especificacion={filters.especificacion}
          setEspecificacion={(value) => updateFilter('especificacion', value)}
          orden={filters.orden}
          setOrden={(value) => updateFilter('orden', value)}
          precioMax={filters.precioMax}
          setPrecioMax={(value) => updateFilter('precioMax', value)}
          precioMaxReal={precios.precioMaxReal}
          subcategories={subcategories}
          category={category}
          marcas={marcas}
          specsUnicos={specsUnicos}
          cerrarMobile={() => setMobileFiltersOpen(false)}
        />
      </div>
    </>
  );

  // Botón móvil
  const mobileButton = (
    <button
      onClick={() => setMobileFiltersOpen(true)}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 p-4 rounded-full text-white shadow-xl lg:hidden"
      aria-label="Abrir filtros"
    >
      <Filter className="w-6 h-6" />
    </button>
  );

  return {
    desktop: (
      <aside className="lg:w-1/4 p-4 lg:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hidden lg:block sticky top-24 self-start border border-gray-200 dark:border-gray-700">
        {sidebarContent}
      </aside>
    ),
    mobileModal,
    mobileButton,
  };
}