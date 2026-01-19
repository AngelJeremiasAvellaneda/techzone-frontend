// src/views/pages/HomeContent.jsx
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [mobileSrc, setMobileSrc] = useState(slides[0]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    setMobileSrc(slides[current]);
  }, [current]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center md:justify-start mt-16 pt-16 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide}
              alt={`Oferta ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}

        <div className="text-white relative z-20 flex flex-col items-center md:items-start max-w-md text-gray-900 dark:text-white drop-shadow-lg px-4 md:px-0 md:ml-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">¡Bienvenido a TechZone!</h1>
          <p className="text-lg md:text-xl mb-6">
            Encuentra los mejores productos tecnológicos al mejor precio.
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition text-white"
          >
            Nosotros
          </Link>
        </div>

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 bottom-5 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 bottom-5 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center z-30 transition"
        >
          &#10095;
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 flex justify-around flex-wrap gap-8">
        <div className="flex flex-col items-center text-center max-w-xs">
          <FiTruck className="text-5xl text-purple-600 mb-3" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Envío Rápido</h3>
          <p className="text-gray-700 dark:text-gray-300">Recibe tus productos en tiempo récord, sin complicaciones.</p>
        </div>
        <div className="flex flex-col items-center text-center max-w-xs">
          <FiShield className="text-5xl text-purple-600 mb-3" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Garantía</h3>
          <p className="text-gray-700 dark:text-gray-300">Todos nuestros productos cuentan con garantía oficial.</p>
        </div>
        <div className="flex flex-col items-center text-center max-w-xs">
          <FiTrendingUp className="text-5xl text-purple-600 mb-3" />
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Mejores Ofertas</h3>
          <p className="text-gray-700 dark:text-gray-300">Aprovecha promociones y descuentos exclusivos cada semana.</p>
        </div>
      </section>

      {/* Offers & News Section */}
      <section className="py-16 px-4 md:px-16 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Ofertas y Novedades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <FiTrendingUp className="text-4xl text-purple-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Super Oferta Laptop Gamer</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Solo esta semana, adquiere tu Laptop Gamer X con un 20% de descuento. ¡No te lo pierdas!
            </p>
            <Link href="/tienda/laptops" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Ver Oferta
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <Headphones className="text-4xl text-purple-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Auriculares Noise Canceling</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Descubre la mejor experiencia de sonido con nuestros auriculares premium. ¡Calidad garantizada!
            </p>
            <Link href="/tienda/accessories" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Ver Más
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <Laptop className="text-4xl text-purple-600 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Guías y Tips Tech</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Aprende a optimizar tu computadora, elegir componentes y mantener tus gadgets al máximo rendimiento.
            </p>
            <Link href="/blog" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Leer Más
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900 px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Categorías</h2>
        <div className="flex justify-around flex-wrap gap-8">
          <Link href="/tienda/laptops" className="flex flex-col items-center gap-2 hover:scale-105 transform transition">
            <Laptop className="text-6xl text-purple-600" />
            <span className="text-gray-900 dark:text-white font-medium">Laptops</span>
          </Link>
          <Link href="/tienda/desktops" className="flex flex-col items-center gap-2 hover:scale-105 transform transition">
            <Monitor className="text-6xl text-purple-600" />
            <span className="text-gray-900 dark:text-white font-medium">Desktops</span>
          </Link>
          <Link href="/tienda/accessories" className="flex flex-col items-center gap-2 hover:scale-105 transform transition">
            <Headphones className="text-6xl text-purple-600" />
            <span className="text-gray-900 dark:text-white font-medium">Accesorios</span>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Opiniones de Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
              <Star className="text-yellow-400 text-3xl mb-3 mx-auto" />
              <p className="mb-4 text-gray-700 dark:text-gray-300">"Excelente servicio y productos de alta calidad, volveré a comprar seguro!"</p>
              <span className="font-semibold text-gray-900 dark:text-white">Cliente {i}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}