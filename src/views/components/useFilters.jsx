// src/views/components/useFilters.jsx
'use client';

import { useState, useMemo, useEffect } from 'react';

export function useFilters(products = [], subcategories = [], category) {
  // Estado para los filtros
  const [marca, setMarca] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [especificacion, setEspecificacion] = useState('');
  const [orden, setOrden] = useState('asc');
  const [precioMax, setPrecioMax] = useState(9999);

  // Calcular precio máximo real de los productos
  const precioMaxReal = useMemo(() => {
    if (!products.length) return 9999;
    const precios = products.map(p => p.price).filter(p => p > 0);
    return Math.max(...precios, 9999);
  }, [products]);

  // Ajustar precioMax cuando cambian los productos
  useEffect(() => {
    if (precioMax > precioMaxReal) {
      setPrecioMax(precioMaxReal);
    }
  }, [precioMaxReal, precioMax]);

  // Extraer marcas únicas
  const marcas = useMemo(() => {
    const brands = products.map(p => p.brand || p.marca).filter(Boolean);
    return [...new Set(brands)];
  }, [products]);

  // Extraer especificaciones únicas (depende de tu estructura de datos)
  const specsUnicos = useMemo(() => {
    // Esta función depende de cómo tengas las especificaciones
    // Ejemplo: extraer de un campo specs o características
    const allSpecs = [];
    products.forEach(p => {
      if (p.specs && Array.isArray(p.specs)) {
        allSpecs.push(...p.specs);
      }
    });
    return [...new Set(allSpecs)];
  }, [products]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let filtered = [...products];
    
    // Filtrar por marca
    if (marca) {
      filtered = filtered.filter(p => 
        (p.brand || p.marca || '').toLowerCase().includes(marca.toLowerCase())
      );
    }
    
    // Filtrar por subcategoría
    if (subcategoria) {
      filtered = filtered.filter(p => 
        (p.subcategory || '').toLowerCase() === subcategoria.toLowerCase()
      );
    }
    
    // Filtrar por especificación
    if (especificacion) {
      filtered = filtered.filter(p => {
        // Buscar en specs, características o descripción
        const searchable = [
          p.description || '',
          p.specs ? JSON.stringify(p.specs) : '',
          p.features ? p.features.join(' ') : ''
        ].join(' ').toLowerCase();
        
        return searchable.includes(especificacion.toLowerCase());
      });
    }
    
    // Filtrar por precio
    filtered = filtered.filter(p => (p.price || 0) <= precioMax);
    
    // Ordenar
    filtered.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      if (orden === "asc") return priceA - priceB;
      return priceB - priceA;
    });
    
    return filtered;
  }, [products, marca, subcategoria, especificacion, precioMax, orden]);

  const totalFiltrados = productosFiltrados.length;

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setMarca('');
    setSubcategoria('');
    setEspecificacion('');
    setOrden('asc');
    setPrecioMax(precioMaxReal);
  };

  return {
    productosFiltrados,
    filtrosSeleccionados: {
      marca,
      setMarca,
      subcategoria,
      setSubcategoria,
      especificacion,
      setEspecificacion,
      orden,
      setOrden,
    },
    precios: {
      precioMax,
      setPrecioMax,
      precioMaxReal,
    },
    limpiarFiltros,
    totalFiltrados,
    marcas,
    specsUnicos,
  };
}