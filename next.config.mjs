/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // lo que ya tenías

  // Configuración de imágenes externas (Supabase)
  images: {
    domains: [
      'tmyhfpzfbtkeywkrgans.supabase.co', // tu dominio de Supabase
    ],
  },
};

export default nextConfig;
