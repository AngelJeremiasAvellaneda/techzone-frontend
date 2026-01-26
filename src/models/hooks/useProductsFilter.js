// src\models\hooks\useProductsFilter.js
'use client';

import { useState, useMemo, useCallback } from 'react';

export default function useProductsFilter(initialProducts = [], initialSubcategories = []) {
  const [filters, setFilters] = useState({
    marca: "",
    subcategoria: "",
    especificacion: "",
    orden: "asc",
    precioMax: 9999,
    search: "",
    inStock: false,
    onSale: false,
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [cantidades, setCantidades] = useState({});

  // Datos derivados
  const { marcas, specsUnicos, precios, subcategories } = useMemo(() => {
    const marcasSet = new Set();
    const specsSet = new Set();
    let maxPrice = 0;
    let minPrice = Infinity;
    const subcategoriesSet = new Set(initialSubcategories || []);

    initialProducts.forEach(product => {
      if (product.brand) marcasSet.add(product.brand);
      if (product.specs?.length) {
        product.specs.forEach(spec => specsSet.add(spec));
      }
      if (product.price > maxPrice) maxPrice = product.price;
      if (product.price < minPrice) minPrice = product.price;
      if (product.subcategory) subcategoriesSet.add(product.subcategory);
    });

    return {
      marcas: Array.from(marcasSet),
      specsUnicos: Array.from(specsSet),
      precios: {
        max: maxPrice || 9999,
        min: minPrice === Infinity ? 0 : minPrice,
        precioMaxReal: maxPrice || 9999,
      },
      subcategories: Array.from(subcategoriesSet),
    };
  }, [initialProducts, initialSubcategories]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let filtered = [...initialProducts];
    
    // Búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.brand?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtros individuales
    if (filters.marca) {
      filtered = filtered.filter(p => 
        p.brand?.toLowerCase().includes(filters.marca.toLowerCase())
      );
    }
    
    if (filters.subcategoria) {
      filtered = filtered.filter(p => 
        p.subcategory?.toLowerCase() === filters.subcategoria.toLowerCase()
      );
    }
    
    if (filters.especificacion) {
      filtered = filtered.filter(p => 
        p.specs?.includes(filters.especificacion)
      );
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    
    if (filters.onSale) {
      filtered = filtered.filter(p => p.discount > 0);
    }
    
    // Precio
    filtered = filtered.filter(p => p.price <= filters.precioMax);
    
    // Ordenar
    filtered.sort((a, b) => {
      switch(filters.orden) {
        case 'asc': return a.price - b.price;
        case 'desc': return b.price - a.price;
        case 'new': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
    
    return filtered;
  }, [initialProducts, filters]);

  // Funciones
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      marca: "",
      subcategoria: "",
      especificacion: "",
      orden: "asc",
      precioMax: precios.max || 9999,
      search: "",
      inStock: false,
      onSale: false,
    });
  }, [precios.max]);

  const incrementar = useCallback((id) => {
    setCantidades(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  }, []);

  const decrementar = useCallback((id) => {
    setCantidades(prev => ({ 
      ...prev, 
      [id]: Math.max(1, (prev[id] || 1) - 1) 
    }));
  }, []);

  return {
    // Estado
    filters,
    productosFiltrados,
    marcas,
    specsUnicos,
    precios,
    subcategories,
    mobileFiltersOpen,
    viewMode,
    cantidades,
    
    // Setters
    setMobileFiltersOpen,
    setViewMode,
    
    // Acciones
    updateFilter,
    resetFilters,
    incrementar,
    decrementar,
    
    // Estadísticas
    total: initialProducts.length,
    filteredTotal: productosFiltrados.length,
  };
}