// src/views/layouts/ProductsLayout/components/ProductsHeader.jsx
'use client';

import { SortAsc, SortDesc } from "@/components/icons";

export default function ProductsHeader({ 
  title, 
  filteredTotal,
  filters, 
  updateFilter,
  viewMode,
  setViewMode,
  onOpenMobileFilters 
}) {
  return (
    <section className="mt-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredTotal} {filteredTotal === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            {/* Vista toggle */}
            <div className="hidden sm:flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                title="Vista cuadrícula"
              >
                ▦
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                title="Vista lista"
              >
                ☰
              </button>
            </div>

            {/* Contador */}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredTotal} {filteredTotal === 1 ? 'producto' : 'productos'}
            </span>
            
            {/* Ordenar */}
            <div className="relative">
              <select
                value={filters.orden}
                onChange={(e) => updateFilter('orden', e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-sm w-full sm:w-48 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white appearance-none"
              >
                <option value="asc">Precio: Menor a Mayor</option>
                <option value="desc">Precio: Mayor a Menor</option>
                <option value="new">Más nuevos primero</option>
                <option value="popular">Más populares</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {filters.orden === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}