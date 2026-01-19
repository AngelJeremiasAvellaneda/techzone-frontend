// src/app/tienda/producto/[id]/page.jsx
'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BaseLayout from "@/views/layouts/BaseLayout";
import ImageZoomModal from "@/views/components/ImageZoomModal";
import DesktopZoomLens from "@/views/components/DesktopZoomLens";
import ProductReviews from "@/views/components/ProductReviews";
import Slider from "react-slick";
import { ShoppingCart, Heart, Share2, Expand, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCartContext } from "@/models/context/CartContext";
import { ROUTES } from "@/constants/routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flechas personalizadas del slider
const SliderArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 hover:bg-purple-600 rounded-full shadow-lg transition-all ${
      direction === 'prev' ? '-left-8 md:-left-10' : '-right-8 md:-right-10'
    }`}
    aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
  >
    {direction === 'prev' ? 
      <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" /> : 
      <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
    }
  </button>
);

// Datos de ejemplo (reemplazar con API real)
const mockProducts = [
  { 
    id: 1, 
    name: 'Laptop Gaming Pro', 
    price: 1299.99, 
    image: '/images/resources/feature1.png',
    brand: 'ASUS',
    category: 'laptops',
    subcategory: 'gaming',
    description: 'Potente laptop para gaming con RTX 4070, procesador i7-13700H y 16GB RAM. Perfecta para juegos de última generación y trabajos de edición.',
    stock: 5,
    specs: {
      'Procesador': 'Intel Core i7-13700H',
      'Memoria RAM': '16GB DDR5',
      'Almacenamiento': '1TB SSD NVMe',
      'Tarjeta gráfica': 'NVIDIA RTX 4070 8GB',
      'Pantalla': '15.6" FHD 144Hz',
      'Sistema operativo': 'Windows 11 Pro'
    },
    images: [
      '/images/resources/feature1.png',
      '/images/resources/feature2.png',
      '/images/resources/feature3.png'
    ]
  },
  { 
    id: 2, 
    name: 'Laptop Ultrabook', 
    price: 899.99, 
    image: '/images/resources/feature2.png',
    brand: 'Dell',
    category: 'laptops',
    subcategory: 'ultrabook',
    description: 'Ultrabook ligero para trabajo y estudio con pantalla táctil y gran duración de batería.',
    stock: 8,
    specs: {
      'Procesador': 'Intel Core i5-1235U',
      'Memoria RAM': '8GB LPDDR4',
      'Almacenamiento': '512GB SSD',
      'Pantalla': '14" FHD Touch',
      'Batería': '10 horas',
      'Peso': '1.2 kg'
    },
    images: [
      '/images/resources/feature2.png',
      '/images/resources/feature1.png'
    ]
  },
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  
  const { addToCart, setCartOpen } = useCartContext();

  const [product, setProduct] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [tabActivo, setTabActivo] = useState("descripcion");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Extraer ID numérico
  const numericId = params?.id ? params.id.split('-')[0] : null;

  // Detectar cambios en el tamaño de ventana
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar producto
  useEffect(() => {
    if (numericId) {
      // Buscar en datos de ejemplo (reemplazar con llamada a API)
      const found = mockProducts.find(p => String(p.id) === String(numericId));
      
      if (found) {
        setProduct(found);
        setImagenSeleccionada(found.image || found.images?.[0] || '');
      } else {
        // Redirigir a 404 si no se encuentra
        router.push('/404');
      }
    }
  }, [numericId, router]);

  // Productos relacionados
  const relacionados = useMemo(() => {
    if (!product) return [];
    return mockProducts
      .filter(p => p.id !== product.id)
      .filter(p => p.category === product.category)
      .slice(0, 8);
  }, [product]);

  const galeria = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  const handleAddToCart = (item, qty = 1) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || imagenSeleccionada,
      quantity: qty
    });
    setCartOpen(true);
  };

  let sharing = false;

  const handleShare = async () => {
    if (!navigator.share) {
      alert("Tu navegador no soporta la función de compartir.");
      return;
    }
    if (sharing) return;
    sharing = true;

    try {
      await navigator.share({
        title: product.name,
        text: product.description || "",
        url: window.location.href
      });
    } catch (err) {
      console.log("Error compartiendo:", err);
    } finally {
      sharing = false;
    }
  };

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Configuración del slider
  const getSliderSettings = () => {
    let slidesToShow = 4;
    
    if (windowWidth < 640) {
      slidesToShow = 1;
    } else if (windowWidth < 768) {
      slidesToShow = 1;
    } else if (windowWidth < 1024) {
      slidesToShow = 2;
    } else if (windowWidth < 1280) {
      slidesToShow = 3;
    } else {
      slidesToShow = 4;
    }

    return {
      dots: true,
      infinite: relacionados.length > slidesToShow,
      speed: 500,
      slidesToShow: Math.min(slidesToShow, relacionados.length),
      slidesToScroll: 1,
      arrows: true,
      prevArrow: <SliderArrow direction="prev" />,
      nextArrow: <SliderArrow direction="next" />,
      adaptiveHeight: false,
      variableWidth: false,
      centerMode: false,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: Math.min(3, relacionados.length),
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(2, relacionados.length),
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };
  };

  if (!product) {
    return (
      <BaseLayout title="Cargando... | TechZone">
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando producto...</p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title={`${product.name} | TechZone`}>
      <main className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto" ref={containerRef}>
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href={ROUTES.HOME} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/tienda/${product.category}`}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {capitalize(product.category)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* GALERÍA */}
          <div className="space-y-4">
            {/* Desktop: Zoom Lens */}
            {windowWidth >= 768 ? (
              <DesktopZoomLens
                image={imagenSeleccionada}
                alt={product.name}
                zoomLevel={2}
                lensSize={200}
              />
            ) : (
              <div className="relative">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imagenSeleccionada}
                    alt={product.name}
                    fill
                    className="object-contain bg-white dark:bg-gray-900"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <button
                  onClick={() => setShowZoomModal(true)}
                  className="absolute bottom-4 right-4 p-3 bg-purple-600/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-purple-700 transition-all"
                  aria-label="Ampliar imagen"
                >
                  <Expand className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Miniaturas */}
            {galeria.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {galeria.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagenSeleccionada(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      imagenSeleccionada === img
                        ? 'border-purple-600 ring-2 ring-purple-600/40 shadow-lg'
                        : 'border-gray-300 dark:border-gray-700 hover:border-purple-600/50'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="space-y-6">
            {/* Título y favorito */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Marca: <span className="font-medium">{product.brand}</span>
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full transition-all shadow-md ${
                  isFavorite
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-purple-600/10'
                }`}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Precio y stock */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                S/. {Number(product.price).toLocaleString('es-PE')}
              </span>
              {product.stock > 0 && product.stock < 10 && (
                <span className="block text-sm text-orange-600 dark:text-orange-400 font-medium mt-2">
                  ¡Solo quedan {product.stock} unidades!
                </span>
              )}
            </div>

            {/* Especificaciones destacadas */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Características principales
                </h3>
                {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key}:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Cantidad y botones */}
            <div className="space-y-4">
              {/* Selector de cantidad */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Cantidad:</span>
                <div className="flex items-center border-2 border-purple-600/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-purple-600/10 text-gray-900 dark:text-white transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 bg-white dark:bg-gray-800 font-semibold text-gray-900 dark:text-white min-w-[60px] text-center">
                    {cantidad}
                  </span>
                  <button
                    onClick={() => setCantidad(cantidad + 1)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-purple-600/10 text-gray-900 dark:text-white transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleAddToCart(product, cantidad)}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-medium shadow-lg ${
                    product.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-xl'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border-2 border-purple-600/30 rounded-lg hover:bg-purple-600/10 transition-colors flex items-center justify-center gap-2 text-gray-900 dark:text-white"
                  aria-label="Compartir producto"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
              </div>
            </div>

            {/* Stock info */}
            {product.stock !== undefined && (
              <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                {product.stock > 0 ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      En stock ({product.stock} disponibles)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Agotado
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* TABS DE INFORMACIÓN */}
        <div className="mt-12 border-t-2 border-gray-200 dark:border-gray-800 pt-8">
          {/* Navegación de tabs */}
          <div className="flex gap-6 border-b-2 border-gray-200 dark:border-gray-800 overflow-x-auto pb-px">
            {['descripcion', 'especificaciones', 'reseñas'].map((tab) => (
              <button
                key={tab}
                onClick={() => setTabActivo(tab)}
                className={`pb-3 px-4 font-medium transition-all whitespace-nowrap relative ${
                  tabActivo === tab
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {capitalize(tab)}
                {tabActivo === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Contenido de tabs */}
          <div className="mt-6">
            {tabActivo === 'descripcion' && (
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {tabActivo === 'especificaciones' && (
              <div className="grid md:grid-cols-2 gap-4">
                {product.specs && Object.entries(product.specs).length > 0 ? (
                  Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-600/50 transition-colors"
                    >
                      <span className="font-medium capitalize text-gray-900 dark:text-white">
                        {key}:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 col-span-2 text-center py-8">
                    No hay especificaciones disponibles.
                  </p>
                )}
              </div>
            )}

            {tabActivo === 'reseñas' && <ProductReviews productId={product.id} />}
          </div>
        </div>

        {/* PRODUCTOS RELACIONADOS */}
        {relacionados.length > 0 && (
          <section className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Productos relacionados
            </h2>
            <div className="relative px-8">
              <Slider ref={sliderRef} {...getSliderSettings()}>
                {relacionados.map((p) => {
                  // Generar slug para la URL
                  const slug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  
                  return (
                    <div key={p.id} className="px-2 md:px-3">
                      <Link 
                        href={`/tienda/producto/${p.id}-${slug}`} 
                        className="block group"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-purple-600/50">
                          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-sm line-clamp-2 mb-2 text-gray-900 dark:text-white min-h-[40px]">
                              {p.name}
                            </h3>
                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                              S/. {Number(p.price).toLocaleString('es-PE')}
                            </p>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(p, 1);
                              }}
                              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Agregar
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </section>
        )}
      </main>

      {/* Modal de Zoom */}
      <ImageZoomModal
        image={imagenSeleccionada}
        alt={product.name}
        isOpen={showZoomModal}
        onClose={() => setShowZoomModal(false)}
      />
    </BaseLayout>
  );
}