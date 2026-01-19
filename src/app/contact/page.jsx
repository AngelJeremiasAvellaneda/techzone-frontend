'use client';

import { useState } from "react";
import BaseLayout from '@/views/layouts/BaseLayout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulación de envío de email (reemplazar con API real)
      console.log('Enviando datos:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación de delay
      
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <section className="min-h-screen pt-24 pb-20 flex flex-col md:flex-row items-center justify-center text-gray-900 dark:text-white px-4 md:px-8 lg:px-16">
        {/* Contenedor principal */}
        <div className="w-full md:w-1/2 z-10 mb-12 md:mb-0 md:pr-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Contáctanos
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            ¿Tienes alguna pregunta, sugerencia o colaboración? Completa el formulario y te responderemos lo antes posible. 🚀
          </p>

          {/* Formulario */}
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white transition-all duration-500 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar mensaje ✉️'
              )}
            </button>

            {/* Mensaje de éxito */}
            {success && (
              <div className="mt-5 text-center text-green-800 bg-green-100 border border-green-400 rounded-lg p-3 font-semibold shadow-md transition-all duration-500">
                💚 ¡Mensaje enviado correctamente!
              </div>
            )}
          </form>
        </div>

        {/* Mapa */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-500">
            <iframe
              className="w-full h-[400px] md:h-[500px] grayscale hover:grayscale-0 transition-all duration-700"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.802115737494!2d-75.211!3d-12.066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964e2fbd3c5b%3A0x8e2cfd8a5c345b1e!2sHuancayo!5e0!3m2!1ses!2spe!4v1715989200000!5m2!1ses!2spe"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          {/* Información de contacto */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📞 Teléfono</h3>
              <p className="text-gray-600 dark:text-gray-300">+51 999 999 999</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📧 Email</h3>
              <p className="text-gray-600 dark:text-gray-300">contacto@techzone.com</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">📍 Dirección</h3>
              <p className="text-gray-600 dark:text-gray-300">Av. Tecnológica 123, Huancayo</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">⏰ Horario</h3>
              <p className="text-gray-600 dark:text-gray-300">Lun-Vie: 9AM - 6PM</p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}