'use client';

import BaseLayout from '@/views/layouts/BaseLayout';
import { useProducts } from '@/models/hooks/useProducts';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import {
  ShoppingBag, Star, Truck, Shield,
  CreditCard, Headphones, ChevronRight,
  Check, Zap, Gift
} from '@/components/icons';

export default function HomePage() {
  const { 
    getFeaturedProducts, 
    getNewProducts, 
    getBestSellers,
    loading 
  } = useProducts();

  const featuredProducts = getFeaturedProducts(4);
  const newProducts = getNewProducts(4);
  const bestSellers = getBestSellers(4);

  if (loading) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-fuchsia-900/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Tecnología
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">al Mejor Precio</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre laptops, computadoras y accesorios de última generación con garantía y soporte técnico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={ROUTES.SHOP}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-fuchsia-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Explorar Productos
              </div>
            </Link>
            <Link 
              href={ROUTES.CONTACT}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl font-bold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
            >
              Asesoría Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            ¿Por qué elegir TechZone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-gray-600 dark:text-gray-400">Entrega en 24-48 horas en Lima y principales ciudades.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Extendida</h3>
              <p className="text-gray-600 dark:text-gray-400">Todos nuestros productos tienen garantía de 1 año.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pago Seguro</h3>
              <p className="text-gray-600 dark:text-gray-400">Múltiples métodos de pago y encriptación SSL.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Headphones className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">Asistencia técnica y atención al cliente permanente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Productos Destacados
            </h2>
            <Link 
              href={ROUTES.SHOP}
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
            >
              Ver todos
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-500/50 transition-all">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={product.images?.[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-xl font-bold text-red-600 dark:text-red-400">
                            S/. {(product.price * (1 - product.discount / 100)).toLocaleString('es-PE')}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            S/. {product.price.toLocaleString('es-PE')}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          S/. {product.price.toLocaleString('es-PE')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href={`${ROUTES.SHOP}/laptops`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Laptops</h3>
                <p className="mb-4 opacity-90">Portátiles gaming, trabajo y estudio</p>
                <div className="flex items-center gap-2">
                  <span>Ver productos</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <Image
                  src="/images/laptop-icon.png"
                  alt="Laptops"
                  width={120}
                  height={120}
                  className="rotate-12"
                />
              </div>
            </Link>
            
            <Link 
              href={`${ROUTES.SHOP}/desktops`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Computadoras</h3>
                <p className="mb-4 opacity-90">PCs gaming, oficina y workstation</p>
                <div className="flex items-center gap-2">
                  <span>Ver productos</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <Image
                  src="/images/desktop-icon.png"
                  alt="Computadoras"
                  width={120}
                  height={120}
                  className="rotate-12"
                />
              </div>
            </Link>
            
            <Link 
              href={`${ROUTES.SHOP}/accesories`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Accesorios</h3>
                <p className="mb-4 opacity-90">Periféricos y componentes</p>
                <div className="flex items-center gap-2">
                  <span>Ver productos</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <Image
                  src="/images/accesories-icon.png"
                  alt="Accesorios"
                  width={120}
                  height={120}
                  className="rotate-12"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Ofertas Especiales
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Descuentos exclusivos por tiempo limitado
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
              <Zap className="w-5 h-5" />
              <span className="font-bold">LIMITADO</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Hasta 30% OFF</h3>
                <p className="mb-4 text-lg">En laptops seleccionadas</p>
                <div className="flex items-center gap-3">
                  <Link 
                    href={`${ROUTES.SHOP}/laptops`}
                    className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition"
                  >
                    Ver ofertas
                  </Link>
                  <div className="text-sm opacity-90">
                    <div className="flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      Oferta válida hasta agotar stock
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-20">
                <Image
                  src="/images/discount-icon.png"
                  alt="Descuento"
                  width={120}
                  height={120}
                  className="rotate-12"
                />
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 p-8 text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Armá tu PC Gamer</h3>
                <p className="mb-4 text-lg">Personaliza tu setup con nuestros expertos</p>
                <div className="flex items-center gap-3">
                  <Link 
                    href={ROUTES.CONTACT}
                    className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition"
                  >
                    Cotizar ahora
                  </Link>
                  <div className="text-sm opacity-90">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Asesoría gratuita incluida
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 opacity-20">
                <Image
                  src="/images/custom-pc-icon.png"
                  alt="PC Personalizado"
                  width={120}
                  height={120}
                  className="rotate-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900/20 via-transparent to-fuchsia-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            ¿Listo para mejorar tu setup?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Miles de clientes confían en nosotros. Únete a la comunidad TechZone hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={ROUTES.SHOP}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-fuchsia-700 transition shadow-lg"
            >
              Comprar ahora
            </Link>
            <Link 
              href={ROUTES.CONTACT}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl font-bold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
            >
              Contactar ventas
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}