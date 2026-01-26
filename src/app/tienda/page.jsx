// src/app/tienda/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from '@/views/layouts/BaseLayout';
import { itemService } from '@/models/services/itemService';
import { useCartContext } from '@/models/context/CartContext';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slugify';
import { ShoppingCart, Truck, Shield, Clock, CheckCircle, Zap, TrendingUp } from '@/components/icons';

// Enlaces rápidos a categorías (estáticos - siempre visibles)
const quickCategories = [
  { 
    id: 'laptops', 
    name: '💻 Laptops', 
    href: '/tienda/laptops', 
    description: 'Portátiles gaming, trabajo y estudio',
    color: 'from-blue-500 to-cyan-500',
    icon: '💻'
  },
  { 
    id: 'desktops', 
    name: '🖥️ Desktops', 
    href: '/tienda/desktops', 
    description: 'Computadoras de escritorio potentes',
    color: 'from-purple-500 to-pink-500',
    icon: '🖥️'
  },
  { 
    id: 'accesories', 
    name: '🎧 Accesorios', 
    href: '/tienda/accesories', 
    description: 'Audífonos, teclados, mouse y más',
    color: 'from-green-500 to-emerald-500',
    icon: '🎧'
  },
  { 
    id: 'software', 
    name: '💿 Software', 
    href: '/tienda?type=software', 
    description: 'Sistemas operativos y aplicaciones',
    color: 'from-yellow-500 to-orange-500',
    icon: '💿'
  },
  { 
    id: 'services', 
    name: '🔧 Servicios', 
    href: '/tienda?type=service', 
    description: 'Soporte técnico y consultoría',
    color: 'from-red-500 to-rose-500',
    icon: '🔧'
  },
];

export default function TiendaPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const { addToCart } = useCartContext();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setConnectionError(false);
      console.log('🔄 Intentando cargar productos desde el backend...');
      
      const data = await itemService.getAllItems();
      
      if (data && data.length > 0) {
        console.log(`✅ Cargados ${data.length} productos del backend`);
        setProducts(data);
      } else {
        console.log('ℹ️ Backend respondió pero sin productos');
        setProducts([]);
      }
    } catch (error) {
      console.error('❌ Error conectando al backend:', error.message);
      setConnectionError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductUrl = (product) => {
    const slug = product.slug || slugify(product.name);
    return ROUTES.PRODUCT_DETAIL(product.id);
  };

  const handleAddToCart = (product, cantidad = 1) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discount ? product.price * (1 - product.discount / 100) : product.price,
      originalPrice: product.price,
      discount: product.discount,
      image: product.image || '/images/placeholder.jpg',
      quantity: cantidad,
      stock: product.stock || 10,
      category: product.category,
      brand: product.brand
    });
  };

  return (
    <BaseLayout title="Tienda TechZone">
      {/* Hero Section - Siempre visible */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bienvenido a <span className="text-yellow-300">TechZone</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Descubre la mejor tecnología, software y servicios especializados
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#productos" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
              >
                🔥 Ver Productos
              </a>
              <a 
                href="#categorias" 
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition"
              >
                📦 Explorar Categorías
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías Rápidas - Siempre visibles */}
      <section id="categorias" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              🚀 Explora Nuestras Categorías
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Navega rápidamente por nuestras principales secciones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {category.description}
                </p>
                <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Ver productos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🔥 Productos Destacados
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {connectionError 
                  ? 'Conecta con el servidor para ver los productos disponibles'
                  : 'Nuestros productos más populares y recomendados'
                }
              </p>
            </div>
            
            {!connectionError && products.length > 0 && (
              <Link 
                href="/tienda/laptops"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium mt-4 md:mt-0"
              >
                <TrendingUp className="w-4 h-4" />
                Ver todos los productos
              </Link>
            )}
          </div>

          {/* Estado de carga */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Cargando productos...
              </p>
            </div>
          )}

          {/* Error de conexión */}
          {!loading && connectionError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 md:p-12 text-center">
              <div className="text-6xl mb-4">🔌</div>
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-3">
                Servicio no disponible
              </h3>
              <p className="text-red-600 dark:text-red-400 max-w-md mx-auto mb-6">
                No podemos conectarnos con el servidor en este momento.
                Verifica que el backend esté corriendo en http://localhost:8080
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={loadProducts}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                >
                  Reintentar conexión
                </button>
                <a
                  href="/tienda/laptops"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition"
                >
                  Explorar categorías
                </a>
              </div>
            </div>
          )}

          {/* Sin productos (pero backend conectado) */}
          {!loading && !connectionError && products.length === 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 md:p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-3">
                No hay productos disponibles
              </h3>
              <p className="text-yellow-600 dark:text-yellow-400 max-w-md mx-auto mb-6">
                El servidor está conectado pero no hay productos registrados.
                Agrega productos desde el panel de administración.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition"
              >
                <Zap className="w-4 h-4" />
                Ir al panel de administración
              </Link>
            </div>
          )}

          {/* Grid de productos (cuando hay datos) */}
          {!loading && !connectionError && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.slice(0, 8).map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition group">
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={product.image || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="p-4">
                      <Link href={getProductUrl(product)}>
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Precio */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          S/. {product.price?.toLocaleString('es-PE') || '0.00'}
                        </span>
                      </div>

                      {/* Acciones */}
                      <div className="flex justify-between">
                        <Link 
                          href={getProductUrl(product)}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          Ver detalles
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product, 1)}
                          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón ver todos */}
              <div className="text-center">
                <Link
                  href="/tienda/laptops"
                  className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Explorar todos los productos ({products.length})
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Ventajas - Siempre visibles */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              ✅ ¿Por qué elegir TechZone?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra en tecnología con garantía de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Garantía Extendida</h3>
              <p className="text-gray-600 dark:text-gray-400">
                12 meses de garantía en todos nuestros productos
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Truck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Envío Rápido</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Entrega en 24-48 horas en Lima y principales ciudades
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Calidad Certificada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Productos 100% originales con certificación internacional
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Asistencia técnica disponible las 24 horas
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}