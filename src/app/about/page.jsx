'use client';

import BaseLayout from '@/views/layouts/BaseLayout';

export default function About() {
  return (
    <BaseLayout>
      {/* Sobre TechZone */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 py-20 text-gray-900 dark:text-white bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/image/resources/fondo.jpg"
            alt="TechZone equipo"
            className="w-full max-w-[450px] mx-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
          />
          <div>
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Sobre TechZone
            </h1>
            <p className="text-lg leading-relaxed mb-4">
              En <strong className="text-purple-600 dark:text-purple-400">TechZone</strong>, somos una tienda tecnológica moderna dedicada a ofrecer productos de alta calidad,
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
        className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-gray-300/30 dark:border-white/10 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Nuestra Esencia
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/50 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <img src="/image/resources/feature1.png" alt="Misión" className="mx-auto w-16 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Misión</h3>
              <p className="text-gray-600 dark:text-gray-300">Proveer soluciones tecnológicas de vanguardia que impulsen la productividad y conectividad.</p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/50 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <img src="/image/resources/feature2.png" alt="Visión" className="mx-auto w-16 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Visión</h3>
              <p className="text-gray-600 dark:text-gray-300">Ser reconocidos como líderes en innovación tecnológica en América Latina.</p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/50 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300">
              <img src="/image/resources/feature3.png" alt="Valores" className="mx-auto w-16 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Valores</h3>
              <p className="text-gray-600 dark:text-gray-300">Innovación, compromiso, confianza y atención personalizada.</p>
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
          <img
            src="/image/resources/historia.png"
            alt="Historia TechZone"
            className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </section>

      {/* Confían en Nosotros */}
      <section
        id="trust"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-5xl text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Confían en Nosotros
          </h2>
          <p className="text-lg mb-10 text-gray-600 dark:text-gray-400">
            Colaboramos con las principales marcas tecnológicas y financieras para ofrecerte lo mejor.
          </p>
          <div className="flex justify-center items-center gap-10 flex-wrap">
            <img src="/image/resources/asus.jpg" alt="Asus" className="w-40 opacity-80 hover:opacity-100 transition-opacity duration-300" />
            <img src="/image/resources/garantia.png" alt="Garantía" className="w-20 opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-gray-900 dark:to-purple-900/20">
        <h2 className="text-4xl font-bold mb-4">¿Quieres saber más?</h2>
        <p className="text-lg mb-8 max-w-xl text-gray-600 dark:text-gray-300">
          Contáctanos y descubre cómo podemos ayudarte a encontrar la tecnología perfecta para ti.
        </p>
        <a
          href="/contact"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow hover:scale-[1.05] transition-all duration-300"
        >
          Contáctanos
        </a>
      </section>
    </BaseLayout>
  );
}