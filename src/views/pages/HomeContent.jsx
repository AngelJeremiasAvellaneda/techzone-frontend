// src/views/pages/HomeContent.jsx
'use client';

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import BaseLayout from "@/views/layouts/BaseLayout";
import { FiTruck, FiShield, FiTrendingUp } from "react-icons/fi";
import { Laptop, Monitor, Headphones, Star } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const slides = [
  "/images/oferta1.png",
  "/images/oferta2.png",
  "/images/oferta3.png",
];

export default function HomeContent() {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto slide cada 5 segundos
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Imágenes que deben precargarse
  useEffect(() => {
    slides.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);  

  return (
    <BaseLayout title="Inicio | TechZone">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center md:justify-start overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <NextImage
              src={slide}
              alt={`Oferta ${index + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        <div className="text-white relative z-20 flex flex-col items-center md:items-start max-w-md drop-shadow-lg px-4 md:px-0 md:ml-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">
            ¡Bienvenido a <span className="text-purple-300">TechZone</span>!
          </h1>
          <p className="text-lg md:text-xl mb-6 text-center md:text-left">
            Encuentra los mejores productos tecnológicos al mejor precio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition text-white text-center"
            >
              Conócenos
            </Link>
            <Link
              href="/tienda"
              className="inline-block px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition text-center border border-white/30"
            >
              Ver Tienda
            </Link>
          </div>
        </div>

        {/* Slide Controls */}
        {isLoaded && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 bottom-5 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 transition"
              aria-label="Imagen anterior"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 bottom-5 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 transition"
              aria-label="Siguiente imagen"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <FiTruck className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Envío Rápido</h3>
              <p className="text-gray-600 dark:text-gray-400">Recibe tus productos en tiempo récord, sin complicaciones.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <FiShield className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Garantía</h3>
              <p className="text-gray-600 dark:text-gray-400">Todos nuestros productos cuentan con garantía oficial.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <FiTrendingUp className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Mejores Ofertas</h3>
              <p className="text-gray-600 dark:text-gray-400">Aprovecha promociones y descuentos exclusivos cada semana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offers & News Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Ofertas y Novedades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Super Oferta Laptop Gamer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Solo esta semana, adquiere tu Laptop Gamer X con un 20% de descuento. ¡No te lo pierdas!
              </p>
              <Link href="/tienda/laptops" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Ver Oferta
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Auriculares Noise Canceling</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Descubre la mejor experiencia de sonido con nuestros auriculares premium. ¡Calidad garantizada!
              </p>
              <Link href="/tienda/accessories" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Ver Más
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Laptop className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Guías y Tips Tech</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aprende a optimizar tu computadora, elegir componentes y mantener tus gadgets al máximo rendimiento.
              </p>
              <Link href="/blog" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Leer Más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="/tienda/laptops" 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 text-center hover:scale-[1.02] transition-transform"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Laptop className="text-4xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Laptops</h3>
              <p className="text-gray-600 dark:text-gray-400">Portátiles de última generación</p>
            </Link>

            <Link 
              href="/tienda/desktops" 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-8 text-center hover:scale-[1.02] transition-transform"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Monitor className="text-4xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Desktops</h3>
              <p className="text-gray-600 dark:text-gray-400">Computadoras de escritorio potentes</p>
            </Link>

            <Link 
              href="/tienda/accessories" 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 text-center hover:scale-[1.02] transition-transform"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="text-4xl text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Accesorios</h3>
              <p className="text-gray-600 dark:text-gray-400">Periféricos y complementos</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Opiniones de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-400 italic">
                  "Excelente servicio y productos de alta calidad, volveré a comprar seguro!"
                </p>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Cliente {i}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Desde Lima, Perú</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}