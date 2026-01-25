'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import FiltrosUI from "../components/FiltrosUI";
import { useCartContext } from "@/models/context/CartContext";
import { ROUTES } from "@/constants/routes";
import { slugify } from '@/utils/slugify';
import {
  Filter, X, ShoppingCart,
  ChevronUp, ChevronDown, SortAsc, SortDesc
} from "@/components/icons";
import BaseLayout from '@/views/layouts/BaseLayout';

export default function ProductsLayout({ 
  title, 
  products = [], 
  subcategories = [], 
  category 
}) {
  // Estados y hooks
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [cantidades, setCantidades] = useState({});
  const [filtros, setFiltros] = useState({
    marca: "",
    subcategoria: "",
    especificacion: "",
    orden: "asc",
    precioMax: 9999,
  });

  const { addToCart } = useCartContext();
  
  const stableSubcategories = useMemo(() => subcategories || [], [subcategories?.length]);

  // Funciones de filtrado
  const productosFiltrados = useMemo(() => {
    let filtered = [...products];
    
    // Filtrar por marca
    if (filtros.marca) {
      filtered = filtered.filter(p => 
        p.brand?.toLowerCase().includes(filtros.marca.toLowerCase())
      );
    }
    
    // Filtrar por subcategoría
    if (filtros.subcategoria) {
      filtered = filtered.filter(p => 
        p.subcategory?.toLowerCase() === filtros.subcategoria.toLowerCase()
      );
    }
    
    // Filtrar por precio
    filtered = filtered.filter(p => p.price <= filtros.precioMax);
    
    // Ordenar
    filtered.sort((a, b) => {
      if (filtros.orden === "asc") return a.price - b.price;
      return b.price - a.price;
    });
    
    return filtered;
  }, [products, filtros]);

  const totalFiltrados = productosFiltrados.length;

  // Datos para filtros
  const marcas = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return uniqueBrands;
  }, [products]);

  const specsUnicos = useMemo(() => {
    // Extraer especificaciones únicas de los productos
    const specs = new Set();
    products.forEach(p => {
      if (p.specs && Array.isArray(p.specs)) {
        p.specs.forEach(spec => specs.add(spec));
      }
    });
    return Array.from(specs);
  }, [products]);

  const precios = useMemo(() => {
    const preciosArray = products.map(p => p.price).filter(p => p > 0);
    const maxPrice = preciosArray.length > 0 ? Math.max(...preciosArray) : 9999;
    return {
      precioMax: maxPrice,
      precioMaxReal: maxPrice,
    };
  }, [products]);

  const limpiarFiltros = () => {
    setFiltros({
      marca: "",
      subcategoria: "",
      especificacion: "",
      orden: "asc",
      precioMax: precios.precioMaxReal,
    });
  };

  const incrementar = (id) => setCantidades(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrementar = (id) => setCantidades(prev => ({ 
    ...prev, 
    [id]: Math.max(1, (prev[id] || 1) - 1) 
  }));

  // Función para generar URL del producto
  const getProductUrl = (product) => {
    const slug = product.slug || slugify(product.name);
    return ROUTES.PRODUCT_DETAIL(product.id);
  };

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

  return (
    <BaseLayout>
      {/* Encabezado */}
      <section className="mt-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {totalFiltrados} {totalFiltrados === 1 ? 'producto' : 'productos'}
              </span>
              <div className="relative">
                <select
                  value={filtros.orden}
                  onChange={(e) => setFiltros(prev => ({ ...prev, orden: e.target.value }))}
                  className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-sm w-full sm:w-48 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="asc">Precio: Menor a Mayor</option>
                  <option value="desc">Precio: Mayor a Menor</option>
                  <option value="new">Más nuevos primero</option>
                  <option value="popular">Más populares</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {filtros.orden === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main */}
      <main className="px-4 sm:px-6 lg:px-8 relative lg:flex lg:gap-8 mt-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="lg:flex lg:gap-8">
            {/* Sidebar escritorio */}
            <aside className="lg:w-1/4 p-4 lg:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hidden lg:block sticky top-24 self-start border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtros</h2>
                <button
                  onClick={limpiarFiltros}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                  Limpiar
                </button>
              </div>

              <FiltrosUI
                marca={filtros.marca}
                setMarca={(value) => setFiltros(prev => ({ ...prev, marca: value }))}
                subcategoria={filtros.subcategoria}
                setSubcategoria={(value) => setFiltros(prev => ({ ...prev, subcategoria: value }))}
                especificacion={filtros.especificacion}
                setEspecificacion={(value) => setFiltros(prev => ({ ...prev, especificacion: value }))}
                orden={filtros.orden}
                setOrden={(value) => setFiltros(prev => ({ ...prev, orden: value }))}
                precioMax={filtros.precioMax}
                setPrecioMax={(value) => setFiltros(prev => ({ ...prev, precioMax: value }))}
                precioMaxReal={precios.precioMaxReal}
                subcategories={stableSubcategories}
                category={category}
                marcas={marcas}
                specsUnicos={specsUnicos}
              />
            </aside>

            {/* Separador */}
            <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700"></div>

            {/* Botón mobile */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 p-4 rounded-full text-white shadow-xl lg:hidden"
              aria-label="Abrir filtros"
            >
              <Filter className="w-6 h-6" />
            </button>

            {/* Modal mobile */}
            {mobileFiltersOpen && (
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
                      limpiarFiltros(); 
                      setMobileFiltersOpen(false); 
                    }}
                    className="mb-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium"
                  >
                    <X className="w-4 h-4" />
                    Limpiar todos los filtros
                  </button>

                  <FiltrosUI
                    marca={filtros.marca}
                    setMarca={(value) => setFiltros(prev => ({ ...prev, marca: value }))}
                    subcategoria={filtros.subcategoria}
                    setSubcategoria={(value) => setFiltros(prev => ({ ...prev, subcategoria: value }))}
                    especificacion={filtros.especificacion}
                    setEspecificacion={(value) => setFiltros(prev => ({ ...prev, especificacion: value }))}
                    orden={filtros.orden}
                    setOrden={(value) => setFiltros(prev => ({ ...prev, orden: value }))}
                    precioMax={filtros.precioMax}
                    setPrecioMax={(value) => setFiltros(prev => ({ ...prev, precioMax: value }))}
                    precioMaxReal={precios.precioMaxReal}
                    subcategories={stableSubcategories}
                    category={category}
                    marcas={marcas}
                    specsUnicos={specsUnicos}
                    cerrarMobile={() => setMobileFiltersOpen(false)}
                  />
                </div>
              </>
            )}

            {/* Lista de productos */}
            <section className="w-full lg:w-3/4">
              {productosFiltrados.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                    <Filter className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Intenta con otros filtros o busca productos diferentes
                  </p>
                  <button
                    onClick={limpiarFiltros}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productosFiltrados.map((product) => {
                    const cantidadActual = cantidades[product.id] || 1;
                    const productUrl = getProductUrl(product);
                    const isOutOfStock = product.stock <= 0;
                    const isLowStock = product.stock > 0 && product.stock < 10;

                    return (
                      <div 
                        key={product.id} 
                        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300"
                      >
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
                        {product.discount > 0 && (
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
                            {product.discount > 0 ? (
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
                                onClick={() => decrementar(product.id)} 
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-l-lg"
                                disabled={isOutOfStock || cantidadActual <= 1}
                              >
                                <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                              </button>
                              <span className="px-3 font-medium text-gray-900 dark:text-white min-w-[40px] text-center">
                                {cantidadActual}
                              </span>
                              <button 
                                onClick={() => incrementar(product.id)} 
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-r-lg"
                                disabled={isOutOfStock}
                              >
                                <ChevronUp className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleAddToCart(product, cantidadActual)}
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
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}