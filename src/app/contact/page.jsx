// src/app/contact/page.jsx
export const metadata = {
    title: 'Contacto | TechZone',
    description: 'Contáctanos para cualquier consulta o soporte',
  };
  
  export default function Contact() {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contáctanos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Información de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Correo Electrónico</h3>
                  <p className="text-gray-600 dark:text-gray-400">contacto@techzone.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Teléfono</h3>
                  <p className="text-gray-600 dark:text-gray-400">+51 999 999 999</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Dirección</h3>
                  <p className="text-gray-600 dark:text-gray-400">Av. Tecnología 123, Lima, Perú</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Envíanos un Mensaje</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Nombre</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Correo</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                    placeholder="tu@correo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Mensaje</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                    placeholder="Tu mensaje..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }