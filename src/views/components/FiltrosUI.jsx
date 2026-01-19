// src/views/components/FiltrosUI.jsx
'use client';

import { useState } from 'react';

export default function FiltrosUI({
  marca,
  setMarca,
  subcategoria,
  setSubcategoria,
  especificacion,
  setEspecificacion,
  orden,
  setOrden,
  precioMax,
  setPrecioMax,
  precioMaxReal,
  subcategories = [],
  category,
  marcas = [],
  specsUnicos = [],
  cerrarMobile
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setEspecificacion(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrecioMax(Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      {/* Búsqueda por especificaciones */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          Buscar por especificaciones
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Ej: 16GB RAM, SSD 512GB..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>

      {/* Filtro por subcategorías */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Subcategorías</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSubcategoria('');
                if (cerrarMobile) cerrarMobile();
              }}
              className={`block w-full text-left px-3 py-2 rounded ${!subcategoria ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Todas
            </button>
            {subcategories.map((subcat, index) => (
              <button
                key={index}
                onClick={() => {
                  setSubcategoria(typeof subcat === 'string' ? subcat : subcat.name);
                  if (cerrarMobile) cerrarMobile();
                }}
                className={`block w-full text-left px-3 py-2 rounded ${subcategoria === (typeof subcat === 'string' ? subcat : subcat.name) ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {typeof subcat === 'string' ? subcat : subcat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por marcas */}
      {marcas.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Marcas</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setMarca('');
                if (cerrarMobile) cerrarMobile();
              }}
              className={`block w-full text-left px-3 py-2 rounded ${!marca ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              Todas
            </button>
            {marcas.map((brand, index) => (
              <button
                key={index}
                onClick={() => {
                  setMarca(brand);
                  if (cerrarMobile) cerrarMobile();
                }}
                className={`block w-full text-left px-3 py-2 rounded ${marca === brand ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por precio */}
      <div>
        <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
          Precio máximo: S/. {precioMax.toLocaleString('es-PE')}
        </h3>
        <input
          type="range"
          min="0"
          max={precioMaxReal}
          value={precioMax}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>S/. 0</span>
          <span>S/. {precioMaxReal.toLocaleString('es-PE')}</span>
        </div>
      </div>

      {/* Ordenamiento */}
      <div>
        <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Ordenar por</h3>
        <select
          value={orden}
          onChange={(e) => {
            setOrden(e.target.value);
            if (cerrarMobile) cerrarMobile();
          }}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="asc">Precio: Menor a Mayor</option>
          <option value="desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>
    </div>
  );
}