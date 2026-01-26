// src/views/layouts/ProductsLayout/components/ProductCard.jsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ChevronUp, ChevronDown } from "@/components/icons";

export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  cantidad,
  onIncrement,
  onDecrement,
  onAddToCart,
  productUrl 
}) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 10;
  const hasDiscount = product.discount > 0;

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        {/* Imagen */}
        <Link href={productUrl} className="md:w-1/4">
          <div className="relative h-48 md:h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </Link>
        
        {/* Contenido */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Link href={productUrl}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="text-right">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    S/. {(product.price * (1 - product.discount / 100)).toLocaleString('es-PE')}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through block">
                    S/. {product.price.toLocaleString('es-PE')}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  S/. {product.price.toLocaleString('es-PE')}
                </span>
              )}
            </div>
          </div>
          
          {/* Acciones */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button 
                  onClick={onDecrement}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-l-lg"
                  disabled={isOutOfStock || cantidad <= 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <span className="px-3 font-medium text-gray-900 dark:text-white">
                  {cantidad}
                </span>
                <button 
                  onClick={onIncrement}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-r-lg"
                  disabled={isOutOfStock}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
              {isLowStock && !isOutOfStock && (
                <span className="text-sm text-orange-600 dark:text-orange-400">
                  Solo {product.stock} disponibles
                </span>
              )}
            </div>
            <button
              onClick={onAddToCart}
              disabled={isOutOfStock}
              className={`px-4 py-2 rounded-lg font-medium ${isOutOfStock 
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
            >
              {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista grid (por defecto)
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300">
      {/* Etiquetas */}
      {isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          AGOTADO
        </div>
      )}
      {isLowStock && !isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          ÚLTIMAS {product.stock} UNIDADES
        </div>
      )}
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          -{product.discount}%
        </div>
      )}

      {/* Imagen */}
      <Link href={productUrl} className="block">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-4">
        <Link href={productUrl}>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Precio */}
        <div className="flex items-center gap-2 mb-4">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                S/. {(product.price * (1 - product.discount / 100)).toLocaleString('es-PE')}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                S/. {product.price.toLocaleString('es-PE')}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              S/. {product.price.toLocaleString('es-PE')}
            </span>
          )}
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button 
              onClick={onDecrement} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-l-lg"
              disabled={isOutOfStock || cantidad <= 1}
            >
              <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <span className="px-3 font-medium text-gray-900 dark:text-white min-w-[40px] text-center">
              {cantidad}
            </span>
            <button 
              onClick={onIncrement} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-r-lg"
              disabled={isOutOfStock}
            >
              <ChevronUp className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isOutOfStock 
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isOutOfStock ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}