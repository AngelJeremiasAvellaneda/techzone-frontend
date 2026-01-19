// src/views/components/Footer.jsx
'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const products = [
  { name: "Laptops", href: "/tienda/laptops" },
  { name: "Desktops", href: "/tienda/desktops" },
  { name: "Accesorios", href: "/tienda/accessories" },
];

export default function Footer() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const submenuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setSubmenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <footer className="bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-200 border-t border-gray-300 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">TechZone</Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tu tienda tecnológica de confianza. Equipos, accesorios y mucho más.</p>
        </div>

        <div className="flex flex-col space-y-2 relative">
          <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Navegación</h3>
          <Link href="/" className="nav-link hover:text-purple-600 dark:hover:text-purple-400 transition">Inicio</Link>
          <button 
            ref={buttonRef} 
            type="button" 
            className="flex items-center gap-1 mt-1 nav-link hover:text-purple-600 dark:hover:text-purple-400 transition text-left" 
            aria-expanded={submenuOpen} 
            onClick={() => setSubmenuOpen(!submenuOpen)}
          >
            Productos
            <svg className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${submenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul 
            ref={submenuRef} 
            className={`absolute left-0 top-full mt-2 w-44 rounded-lg shadow-xl transform transition-all duration-300 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
              submenuOpen 
                ? "opacity-100 scale-100 pointer-events-auto" 
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {products.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="block px-4 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
                  onClick={() => setSubmenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/about" className="nav-link hover:text-purple-600 dark:hover:text-purple-400 transition">Sobre Nosotros</Link>
          <Link href="/contact" className="nav-link hover:text-purple-600 dark:hover:text-purple-400 transition">Contacto</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition">GitHub</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} TechZone. Todos los derechos reservados.
      </div>
    </footer>
  );
}