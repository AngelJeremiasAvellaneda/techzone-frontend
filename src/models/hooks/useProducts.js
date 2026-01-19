// /src/models/hooks/useProducts.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';

// Mock data para desarrollo
const mockProducts = [
  {
    id: 1,
    name: 'Laptop Gamer Asus ROG Strix G15',
    description: 'Laptop gaming de alto rendimiento con procesador Intel i7-12700H, 16GB RAM DDR5, RTX 3060 6GB, pantalla 15.6" 144Hz FHD, almacenamiento 1TB SSD NVMe.',
    price: 4599.00,
    category: 'laptops',
    subcategory: 'gaming',
    brand: 'Asus',
    stock: 8,
    discount: 10,
    rating: 4.8,
    reviews: 124,
    specs: [
      'Procesador Intel Core i7-12700H',
      '16GB RAM DDR5 4800MHz',
      'NVIDIA GeForce RTX 3060 6GB',
      'Pantalla 15.6" FHD 144Hz',
      'Almacenamiento 1TB SSD NVMe',
      'Sistema operativo Windows 11 Pro'
    ],
    images: [
      '/images/products/laptop-gaming-1.jpg',
      '/images/products/laptop-gaming-2.jpg',
      '/images/products/laptop-gaming-3.jpg'
    ],
    created_at: '2024-01-15',
    updated_at: '2024-01-15'
  },
  {
    id: 2,
    name: 'PC Gamer Intel i9 Extreme',
    description: 'Computadora de escritorio para gaming y trabajo profesional con procesador Intel i9-13900K, 32GB RAM DDR5, RTX 4070 Ti 12GB, almacenamiento 2TB NVMe + 4TB HDD.',
    price: 8999.00,
    category: 'desktops',
    subcategory: 'gaming',
    brand: 'Intel',
    stock: 3,
    discount: 15,
    rating: 4.9,
    reviews: 89,
    specs: [
      'Procesador Intel Core i9-13900K',
      '32GB RAM DDR5 5600MHz',
      'NVIDIA GeForce RTX 4070 Ti 12GB',
      'Almacenamiento 2TB NVMe + 4TB HDD',
      'Fuente de poder 850W 80+ Gold',
      'Gabinete con iluminación RGB'
    ],
    images: [
      '/images/products/pc-gaming-1.jpg',
      '/images/products/pc-gaming-2.jpg',
      '/images/products/pc-gaming-3.jpg'
    ],
    created_at: '2024-02-10',
    updated_at: '2024-02-10'
  },
  {
    id: 3,
    name: 'Mouse Gaming Logitech G502 Hero',
    description: 'Mouse gaming profesional con sensor HERO 25K, 11 botones programables, RGB Lightsync, diseño ergonómico y peso ajustable.',
    price: 299.00,
    category: 'accesories',
    subcategory: 'mouse',
    brand: 'Logitech',
    stock: 25,
    discount: 5,
    rating: 4.7,
    reviews: 456,
    specs: [
      'Sensor HERO 25K 25,600 DPI',
      '11 botones programables',
      'Iluminación RGB Lightsync',
      'Peso ajustable (hasta 16g)',
      'Cable trenzado de 2.1m',
      'Compatibilidad con G HUB'
    ],
    images: [
      '/images/products/mouse-g502-1.jpg',
      '/images/products/mouse-g502-2.jpg'
    ],
    created_at: '2024-03-05',
    updated_at: '2024-03-05'
  },
  {
    id: 4,
    name: 'Teclado Mecánico Redragon Kumara K552',
    description: 'Teclado mecánico gaming con switches Outemu Blue, retroiluminación RGB, diseño compacto 60% y construcción de aluminio.',
    price: 349.00,
    category: 'accesories',
    subcategory: 'keyboard',
    brand: 'Redragon',
    stock: 18,
    discount: 0,
    rating: 4.5,
    reviews: 312,
    specs: [
      'Switches Outemu Blue mecánicos',
      'Retroiluminación RGB personalizable',
      'Diseño compacto 60%',
      'Carcasa de aluminio',
      'Anti-ghosting N-key rollover',
      'Cable desmontable tipo C'
    ],
    images: [
      '/images/products/keyboard-k552-1.jpg',
      '/images/products/keyboard-k552-2.jpg'
    ],
    created_at: '2024-03-12',
    updated_at: '2024-03-12'
  },
  {
    id: 5,
    name: 'Monitor Gaming 27" AOC C27G2ZE',
    description: 'Monitor gaming curvo 27" Full HD, 240Hz, 0.5ms, FreeSync Premium, diseño sin bordes y ajuste de altura.',
    price: 1899.00,
    category: 'accesories',
    subcategory: 'monitor',
    brand: 'AOC',
    stock: 7,
    discount: 12,
    rating: 4.6,
    reviews: 187,
    specs: [
      'Pantalla curva VA 27" 1500R',
      'Resolución Full HD 1920x1080',
      'Tasa de refresco 240Hz',
      'Tiempo de respuesta 0.5ms MPRT',
      'AMD FreeSync Premium',
      'Ajuste de altura, inclinación y giro'
    ],
    images: [
      '/images/products/monitor-27-1.jpg',
      '/images/products/monitor-27-2.jpg'
    ],
    created_at: '2024-01-28',
    updated_at: '2024-01-28'
  },
  {
    id: 6,
    name: 'Laptop HP Pavilion 15',
    description: 'Laptop versátil para trabajo y estudio con procesador Intel i5-1240P, 8GB RAM, 512GB SSD, pantalla 15.6" FHD y diseño delgado.',
    price: 2999.00,
    category: 'laptops',
    subcategory: 'student',
    brand: 'HP',
    stock: 15,
    discount: 8,
    rating: 4.4,
    reviews: 234,
    specs: [
      'Procesador Intel Core i5-1240P',
      '8GB RAM DDR4 3200MHz',
      '512GB SSD NVMe',
      'Pantalla 15.6" FHD IPS',
      'Batería hasta 8 horas',
      'Windows 11 Home'
    ],
    images: [
      '/images/products/laptop-hp-1.jpg',
      '/images/products/laptop-hp-2.jpg'
    ],
    created_at: '2024-02-20',
    updated_at: '2024-02-20'
  },
  {
    id: 7,
    name: 'MacBook Air M2 2024',
    description: 'Laptop ultradelgada de Apple con chip M2, 8GB RAM unificada, 256GB SSD, pantalla Liquid Retina 13.6" y diseño sin ventilador.',
    price: 5999.00,
    category: 'laptops',
    subcategory: 'ultrabook',
    brand: 'Apple',
    stock: 6,
    discount: 5,
    rating: 4.9,
    reviews: 567,
    specs: [
      'Chip Apple M2 8-core',
      '8GB RAM unificada',
      '256GB SSD',
      'Pantalla Liquid Retina 13.6"',
      'Hasta 18 horas de batería',
      'macOS Ventura'
    ],
    images: [
      '/images/products/macbook-air-1.jpg',
      '/images/products/macbook-air-2.jpg'
    ],
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  },
  {
    id: 8,
    name: 'PC de Oficina Dell OptiPlex',
    description: 'Computadora de escritorio para oficina con procesador Intel i5-12500, 8GB RAM, 256GB SSD + 1TB HDD, Windows 11 Pro y diseño compacto.',
    price: 2499.00,
    category: 'desktops',
    subcategory: 'office',
    brand: 'Dell',
    stock: 12,
    discount: 5,
    rating: 4.3,
    reviews: 123,
    specs: [
      'Procesador Intel Core i5-12500',
      '8GB RAM DDR4',
      '256GB SSD + 1TB HDD',
      'Windows 11 Pro',
      'Diseño compacto (SFF)',
      'Garantía 3 años'
    ],
    images: [
      '/images/products/pc-office-1.jpg',
      '/images/products/pc-office-2.jpg'
    ],
    created_at: '2024-03-01',
    updated_at: '2024-03-01'
  }
];

// Clave para localStorage
const PRODUCTS_STORAGE_KEY = 'techzone_products';
const CATEGORIES_STORAGE_KEY = 'techzone_categories';
const SUBCATEGORIES_STORAGE_KEY = 'techzone_subcategories';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Cargar productos
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // En producción, aquí harías una llamada a tu API MySQL
      // const response = await fetch('http://tu-backend.com/api/products');
      // const data = await response.json();

      // Por ahora, usamos mock data + localStorage
      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      let productsData = [];

      if (storedProducts) {
        productsData = JSON.parse(storedProducts);
      } else {
        // Si no hay productos almacenados, usar mock data
        productsData = mockProducts;
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsData));
      }

      // Ordenar por fecha de creación (más nuevos primero)
      productsData.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setProducts(productsData);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar los productos');
      // Fallback a mock data
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicializar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Obtener producto por ID
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === parseInt(id));
  }, [products]);

  // Obtener productos por categoría
  const getProductsByCategory = useCallback((category) => {
    if (!category || category === 'all') return products;
    return products.filter(product => product.category === category);
  }, [products]);

  // Obtener productos por subcategoría
  const getProductsBySubcategory = useCallback((subcategory) => {
    return products.filter(product => product.subcategory === subcategory);
  }, [products]);

  // Buscar productos
  const searchProducts = useCallback((query) => {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }, [products]);

  // Filtrar productos
  const filterProducts = useCallback((filters) => {
    let filtered = [...products];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter(p => p.subcategory === filters.subcategory);
    }

    if (filters.brand) {
      filtered = filtered.filter(p => p.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    if (filters.onSale) {
      filtered = filtered.filter(p => p.discount > 0);
    }

    // Ordenar
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => {
            const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
            return priceA - priceB;
          });
          break;
        case 'price_desc':
          filtered.sort((a, b) => {
            const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
            return priceB - priceA;
          });
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'popular':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        default:
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
    }

    return filtered;
  }, [products]);

  // Obtener productos destacados
  const getFeaturedProducts = useCallback((limit = 4) => {
    // Productos con mayor descuento o mejor rating
    return [...products]
      .sort((a, b) => b.discount - a.discount || b.rating - a.rating)
      .slice(0, limit);
  }, [products]);

  // Obtener productos nuevos
  const getNewProducts = useCallback((limit = 4) => {
    return [...products]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
  }, [products]);

  // Obtener productos más vendidos (simulado)
  const getBestSellers = useCallback((limit = 4) => {
    // Simular productos más vendidos basados en reviews
    return [...products]
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit);
  }, [products]);

  // Obtener categorías únicas
  const getCategories = useCallback(() => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      slug: category,
      count: products.filter(p => p.category === category).length
    }));
  }, [products]);

  // Obtener subcategorías por categoría
  const getSubcategories = useCallback((category = null) => {
    let subcategories = [];
    
    if (category) {
      subcategories = [...new Set(
        products
          .filter(p => p.category === category)
          .map(p => p.subcategory)
          .filter(Boolean)
      )];
    } else {
      subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))];
    }

    return subcategories.map(subcategory => ({
      id: subcategory,
      name: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
      slug: subcategory,
      count: products.filter(p => p.subcategory === subcategory).length
    }));
  }, [products]);

  // Obtener marcas únicas
  const getBrands = useCallback(() => {
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return brands.map(brand => ({
      id: brand.toLowerCase().replace(/\s+/g, '-'),
      name: brand,
      count: products.filter(p => p.brand === brand).length
    }));
  }, [products]);

  // Actualizar stock de producto
  const updateProductStock = useCallback(async (productId, quantity) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          const newStock = Math.max(0, product.stock - quantity);
          return { ...product, stock: newStock };
        }
        return product;
      });

      setProducts(updatedProducts);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));

      return { success: true };
    } catch (err) {
      console.error('Error actualizando stock:', err);
      return { success: false, error: 'Error al actualizar stock' };
    }
  }, [products]);

  // Agregar nuevo producto (para admin)
  const addProduct = useCallback(async (productData) => {
    try {
      const newProduct = {
        id: Date.now(), // ID temporal
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));

      showToast('Producto agregado correctamente', 'success');
      return { success: true, product: newProduct };
    } catch (err) {
      console.error('Error agregando producto:', err);
      showToast('Error al agregar producto', 'error');
      return { success: false, error: 'Error al agregar producto' };
    }
  }, [products, showToast]);

  // Actualizar producto (para admin)
  const updateProduct = useCallback(async (productId, productData) => {
    try {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            ...productData,
            updated_at: new Date().toISOString()
          };
        }
        return product;
      });

      setProducts(updatedProducts);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));

      showToast('Producto actualizado correctamente', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error actualizando producto:', err);
      showToast('Error al actualizar producto', 'error');
      return { success: false, error: 'Error al actualizar producto' };
    }
  }, [products, showToast]);

  // Eliminar producto (para admin)
  const deleteProduct = useCallback(async (productId) => {
    try {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));

      showToast('Producto eliminado correctamente', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error eliminando producto:', err);
      showToast('Error al eliminar producto', 'error');
      return { success: false, error: 'Error al eliminar producto' };
    }
  }, [products, showToast]);

  // Generar datos de ejemplo para desarrollo
  const generateMockData = useCallback(() => {
    try {
      // Generar más productos de ejemplo
      const additionalProducts = [
        {
          id: 9,
          name: 'Audífonos Gaming HyperX Cloud II',
          description: 'Audífonos gaming con sonido surround 7.1 virtual, micrófono desmontable y memoria de espuma viscoelástica para mayor comodidad.',
          price: 399.00,
          category: 'accesories',
          subcategory: 'audio',
          brand: 'HyperX',
          stock: 14,
          discount: 10,
          rating: 4.8,
          reviews: 289,
          specs: [
            'Sonido surround 7.1 virtual',
            'Micrófono desmontable con cancelación de ruido',
            'Memoria de espuma viscoelástica',
            'Construcción de aluminio',
            'Compatible con PC, PS4, PS5, Xbox'
          ],
          images: [
            '/images/products/headphones-1.jpg',
            '/images/products/headphones-2.jpg'
          ],
          created_at: '2024-02-15',
          updated_at: '2024-02-15'
        },
        {
          id: 10,
          name: 'SSD Kingston NV2 2TB NVMe',
          description: 'SSD NVMe PCIe 4.0 de alto rendimiento con velocidades de lectura hasta 3500MB/s, ideal para gaming y aplicaciones profesionales.',
          price: 699.00,
          category: 'accesories',
          subcategory: 'storage',
          brand: 'Kingston',
          stock: 22,
          discount: 7,
          rating: 4.6,
          reviews: 156,
          specs: [
            'Capacidad 2TB',
            'Interfaz PCIe 4.0 NVMe',
            'Velocidad lectura: 3500MB/s',
            'Velocidad escritura: 2800MB/s',
            'Factor de forma M.2 2280'
          ],
          images: [
            '/images/products/ssd-1.jpg',
            '/images/products/ssd-2.jpg'
          ],
          created_at: '2024-03-08',
          updated_at: '2024-03-08'
        }
      ];

      const allProducts = [...mockProducts, ...additionalProducts];
      setProducts(allProducts);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(allProducts));

      showToast('Datos de ejemplo generados correctamente', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error generando datos de ejemplo:', err);
      showToast('Error al generar datos de ejemplo', 'error');
      return { success: false, error: 'Error al generar datos de ejemplo' };
    }
  }, [showToast]);

  // Estadísticas
  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > 0).length,
    outOfStock: products.filter(p => p.stock <= 0).length,
    onSale: products.filter(p => p.discount > 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    categories: getCategories().length,
    brands: getBrands().length
  };

  return {
    // Estado
    products,
    loading,
    error,
    
    // Métodos de búsqueda
    getProductById,
    getProductsByCategory,
    getProductsBySubcategory,
    searchProducts,
    filterProducts,
    
    // Métodos de obtención especializados
    getFeaturedProducts,
    getNewProducts,
    getBestSellers,
    
    // Métodos de categorización
    getCategories,
    getSubcategories,
    getBrands,
    
    // Métodos de administración
    updateProductStock,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Utilidades
    refetch: loadProducts,
    generateMockData,
    stats
  };
};