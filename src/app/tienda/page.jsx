// src/app/tienda/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from '@/views/layouts/BaseLayout';
import { itemService } from '@/models/services/itemService';
import { useCart } from '@/models/context/CartContext';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slugify';
import { ShoppingCart, Truck, Shield, Clock, CheckCircle, Zap, TrendingUp, Star, Award, ChevronRight, Sparkles, Heart, Eye, Package, Cpu, Headphones, Gamepad2, Smartphone, Monitor } from '@/components/icons';

// Categorías con iconos y colores vibrantes
const quickCategories = [
  { 
    id: 'laptops', 
    name: 'Laptops Gaming', 
    href: '/tienda/laptops', 
    description: 'Alto rendimiento para gamers y creadores',
    color: 'from-purple-600 via-pink-600 to-rose-600',
    icon: <Cpu className="w-8 h-8" />,
    gradient: 'bg-gradient-to-br',
    hover: 'hover:scale-105 hover:shadow-2xl'
  },
  { 
    id: 'desktops', 
    name: 'PCs Armadas', 
    href: '/tienda/desktops', 
    description: 'Computadoras personalizadas',
    color: 'from-blue-600 via-cyan-600 to-teal-600',
    icon: <Monitor className="w-8 h-8" />,
    gradient: 'bg-gradient-to-tr',
    hover: 'hover:scale-105 hover:shadow-2xl'
  },
  { 
    id: 'accesories', 
    name: 'Gamer Gear', 
    href: '/tienda/accesories', 
    description: 'Periféricos profesionales',
    color: 'from-green-600 via-emerald-600 to-lime-600',
    icon: <Gamepad2 className="w-8 h-8" />,
    gradient: 'bg-gradient-to-br',
    hover: 'hover:scale-105 hover:shadow-2xl'
  },
  { 
    id: 'audio', 
    name: 'Audio Premium', 
    href: '/tienda/audio', 
    description: 'Sonido de estudio',
    color: 'from-orange-600 via-amber-600 to-yellow-600',
    icon: <Headphones className="w-8 h-8" />,
    gradient: 'bg-gradient-to-tr',
    hover: 'hover:scale-105 hover:shadow-2xl'
  },
  { 
    id: 'mobile', 
    name: 'Tech Mobile', 
    href: '/tienda/mobile', 
    description: 'Dispositivos móviles',
    color: 'from-red-600 via-rose-600 to-fuchsia-600',
    icon: <Smartphone className="w-8 h-8" />,
    gradient: 'bg-gradient-to-br',
    hover: 'hover:scale-105 hover:shadow-2xl'
  },
];

// Productos destacados (placeholder mientras carga)
const featuredProducts = [
  {
    id: 1,
    name: 'RTX 4090 Gaming PC',
    category: 'Gaming',
    price: 8999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop',
    tag: '🔥 TOP SELLER'
  },
  {
    id: 2,
    name: 'MacBook Pro M3 Max',
    category: 'Profesional',
    price: 12999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w-800&auto=format&fit=crop',
    tag: '✨ NEW'
  },
  {
    id: 3,
    name: 'Razer Keyboard Pro',
    category: 'Periféricos',
    price: 699,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&auto=format&fit=crop',
    tag: '🏷️ SALE'
  }
];

export default function TiendaPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setConnectionError(false);
      console.log('🔄 Cargando productos desde el backend...');
      
      const data = await itemService.getAllItems();
      
      if (data && data.length > 0) {
        console.log(`✅ ${data.length} productos cargados`);
        setProducts(data);
      } else {
        console.log('ℹ️ Sin productos en el backend');
        setProducts([]);
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
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

  // Componente de estrella para ratings
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <BaseLayout title="Tienda TechZone">
      {/* Hero Section con efecto parallax */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
        {/* Efecto de partículas */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">🎯 TECNOLOGÍA DE VANGUARDIA</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Descubre el{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Futuro
              </span>{' '}
              Hoy
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl">
              Equipamiento de alto rendimiento para gamers, creadores y profesionales.
              <span className="block mt-2 text-cyan-300 font-semibold">🚀 Performance sin límites</span>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#productos-destacados" 
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Explorar Colección
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link 
                href="#categorias" 
                className="group bg-transparent border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl font-bold hover:bg-white/10 hover:border-white transition"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ver Categorías
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Olas decorativas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,138.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="relative -mt-8 z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Productos', value: '500+', icon: '📦', color: 'text-blue-600' },
              { label: 'Clientes', value: '10K+', icon: '👥', color: 'text-green-600' },
              { label: 'Envíos', value: '98%', icon: '🚚', color: 'text-purple-600' },
              { label: 'Rating', value: '4.9/5', icon: '⭐', color: 'text-yellow-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorías Rápidas - Tarjetas modernas */}
      <section id="categorias" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full">
              <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">EXPLORA POR CATEGORÍA</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Encuentra tu{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Equipo Ideal
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Tecnología especializada para cada necesidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`relative overflow-hidden rounded-2xl ${category.gradient} ${category.color} p-1 ${category.hover} transition-all duration-500 group`}
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 h-full">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-current opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className={`mb-6 p-3 w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-current group-hover:via-current group-hover:to-current group-hover:bg-clip-text">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm font-medium bg-gradient-to-r from-current to-current bg-clip-text text-transparent">
                      Ver colección
                    </span>
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-current group-hover:to-current transition-all">
                      <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados - Layout moderno */}
      <section id="productos-destacados" className="py-20 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-900/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">LO MÁS VENDIDO</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Productos{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Destacados
                </span>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                {connectionError 
                  ? 'Conecta con el servidor para descubrir nuestra colección exclusiva'
                  : 'Selección premium de nuestros productos más populares'
                }
              </p>
            </div>
            
            {!connectionError && products.length > 0 && (
              <Link 
                href="/tienda/laptops"
                className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-6 md:mt-0 px-6 py-3 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                Ver catálogo completo
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </div>

          {/* Estados de carga */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-medium">
                Cargando productos exclusivos...
              </p>
            </div>
          )}

          {/* Error de conexión */}
          {!loading && connectionError && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 p-8 md:p-12 text-center">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 dark:bg-red-900/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="text-7xl mb-6 animate-bounce">🔌</div>
                <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">
                  Servicio Temporalmente Inactivo
                </h3>
                <p className="text-red-600 dark:text-red-400 max-w-md mx-auto mb-8 text-lg">
                  Estamos optimizando nuestro servidor para brindarte una mejor experiencia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={loadProducts}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-xl transition-all hover:scale-105"
                  >
                    Reintentar conexión
                  </button>
                  <Link
                    href="/contacto"
                    className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all"
                  >
                    Contactar soporte
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sin productos */}
          {!loading && !connectionError && products.length === 0 && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 p-8 md:p-12 text-center">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-100 dark:bg-yellow-900/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="text-7xl mb-6">✨</div>
                <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">
                  Catálogo en Desarrollo
                </h3>
                <p className="text-yellow-600 dark:text-yellow-400 max-w-md mx-auto mb-8 text-lg">
                  Estamos preparando nuestra colección exclusiva. Pronto tendrás acceso a productos increíbles.
                </p>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-xl transition-all hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  Acceder al panel
                </Link>
              </div>
            </div>
          )}

          {/* Grid de productos */}
          {!loading && !connectionError && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.slice(0, 6).map((product) => (
                  <div 
                    key={product.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Badge de estado */}
                    {product.discount && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                          -{product.discount}%
                        </span>
                      </div>
                    )}

                    {/* Imagen con overlay */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                      <Image
                        src={product.image || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop'}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ${hoveredProduct === product.id ? 'scale-110 rotate-1' : 'scale-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay de hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6`}>
                        <div className="flex gap-2">
                          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition">
                            <Heart className="w-5 h-5 text-gray-700" />
                          </button>
                          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition">
                            <Eye className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
                          <Link href={getProductUrl(product)}>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <StarRating rating={4.5} />
                      </div>

                      {/* Precio */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          S/. {product.price?.toLocaleString('es-PE') || '0.00'}
                        </span>
                        {product.discount && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            S/. {(product.price * 1.2).toLocaleString('es-PE')}
                          </span>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-3">
                        <Link 
                          href={getProductUrl(product)}
                          className="flex-1 text-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-medium"
                        >
                          Ver detalles
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product, 1)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105 font-medium"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA final */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    ¿Listo para el siguiente nivel?
                  </h3>
                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Descubre nuestra colección completa con más de {products.length} productos de alta tecnología.
                  </p>
                  <Link
                    href="/tienda/laptops"
                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    Explorar Tienda Completa
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Ventajas - Tarjetas modernas */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">GARANTÍA TECHZONE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Por qué{' '}
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                Elegirnos
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Compromiso total con la calidad y satisfacción del cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Garantía Extendida',
                description: '24 meses en hardware, 36 en laptops',
                color: 'from-blue-500 to-cyan-500',
                delay: '0'
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Envío Express',
                description: 'Entrega en 24h Lima, 72h nacional',
                color: 'from-purple-500 to-pink-500',
                delay: '100'
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Original 100%',
                description: 'Productos con certificación internacional',
                color: 'from-green-500 to-emerald-500',
                delay: '200'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Soporte 24/7',
                description: 'Asistencia técnica permanente',
                color: 'from-orange-500 to-red-500',
                delay: '300'
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${benefit.delay}ms` }}
              >
                <div className={`mb-6 p-4 w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 p-8 md:p-12 text-center">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Únete a la Comunidad Tech
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Recibe descuentos exclusivos, novedades y contenido especializado en tecnología.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  Suscribirme
                </button>
              </form>
              
              <p className="text-blue-100/70 text-sm mt-4">
                Sin spam, solo contenido de valor. Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}