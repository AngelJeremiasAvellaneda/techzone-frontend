// src/views/pages/AboutContent.jsx
'use client';

import Image from "next/image";
import Link from "next/link";

export default function AboutContent() {
  return (
    <>
      {/* Sobre TechZone */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 py-20 text-gray-900 dark:text-white bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-[450px] mx-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500">
            <Image
              src="/images/resources/fondo.jpg"
              alt="TechZone equipo"
              width={450}
              height={300}
              className="rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Sobre TechZone
            </h1>
            <p className="text-lg leading-relaxed mb-4">
              En <strong>TechZone</strong>, somos una tienda tecnológica moderna dedicada a ofrecer productos de alta calidad,
              desde laptops y desktops hasta accesorios premium.
            </p>
            <p className="text-lg leading-relaxed">
              Nacimos con la misión de hacer que la tecnología sea accesible, confiable y emocionante para todos los usuarios.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Esencia */}
      <section
        id="essence"
        className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-gray-300/30 dark:border-white/10 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Nuestra Esencia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-white/5 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/resources/feature1.png"
                  alt="Misión"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Misión</h3>
              <p className="text-gray-700 dark:text-gray-300">Proveer soluciones tecnológicas de vanguardia que impulsen la productividad y conectividad.</p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-white/5 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/resources/feature2.png"
                  alt="Visión"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Visión</h3>
              <p className="text-gray-700 dark:text-gray-300">Ser reconocidos como líderes en innovación tecnológica en América Latina.</p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-white/5 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/images/resources/feature3.png"
                  alt="Valores"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Valores</h3>
              <p className="text-gray-700 dark:text-gray-300">Innovación, compromiso, confianza y atención personalizada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section
        id="history"
        className="min-h-screen flex items-center justify-center px-6 py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Nuestra Historia
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              Desde nuestros inicios, TechZone ha buscado conectar a las personas con la mejor tecnología disponible,
              adaptándose a los cambios del mercado y manteniendo una relación cercana con nuestros clientes.
            </p>
            <p className="text-lg leading-relaxed">
              Gracias a la confianza de miles de usuarios, seguimos creciendo día a día, ampliando nuestro catálogo
              y mejorando la experiencia de compra.
            </p>
          </div>
          <div className="relative w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500">
            <Image
              src="/images/resources/historia.png"
              alt="Historia TechZone"
              width={500}
              height={350}
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Confían en Nosotros */}
      <section
        id="trust"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-5xl text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Confían en Nosotros
          </h2>
          <p className="text-lg mb-10 text-gray-600 dark:text-gray-400">
            Colaboramos con las principales marcas tecnológicas y financieras para ofrecerte lo mejor.
          </p>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            <div className="relative w-40 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/images/resources/asus.jpg"
                alt="Asus"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-20 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/images/resources/garantia.png"
                alt="Garantía"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <h2 className="text-4xl font-bold mb-4">¿Quieres saber más?</h2>
        <p className="text-lg mb-8 max-w-xl text-purple-100">
          Contáctanos y descubre cómo podemos ayudarte a encontrar la tecnología perfecta para ti.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl shadow hover:scale-[1.05] transition-transform duration-300"
        >
          Contáctanos
        </Link>
      </section>
    </>
  );
}