'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ItemCard({ item }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const getItemTypeIcon = (type) => {
        const icons = {
            PRODUCT: '🖥️',
            SOFTWARE: '💿',
            SERVICE: '🔧'
        };
        return icons[type] || '📦';
    };

    const getItemTypeColor = (type) => {
        const colors = {
            PRODUCT: 'bg-blue-100 text-blue-800',
            SOFTWARE: 'bg-green-100 text-green-800',
            SERVICE: 'bg-purple-100 text-purple-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const getStockStatus = (item) => {
        if (item.type === 'PRODUCT') {
            if (item.productDetails?.stock > 10) {
                return { text: 'Disponible', color: 'text-green-600' };
            } else if (item.productDetails?.stock > 0) {
                return { text: 'Últimas unidades', color: 'text-orange-600' };
            } else {
                return { text: 'Agotado', color: 'text-red-600' };
            }
        } else if (item.type === 'SOFTWARE') {
            return { text: 'Descarga inmediata', color: 'text-blue-600' };
        } else {
            return { text: 'Disponible', color: 'text-purple-600' };
        }
    };

    const stockStatus = getStockStatus(item);

    return (
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <Link href={`/tienda/${item.id}`}>
                {/* Imagen */}
                <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100">
                    {item.images && item.images.length > 0 ? (
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <span className="text-4xl">{getItemTypeIcon(item.type)}</span>
                                <span className="block text-gray-400 mt-2">Sin imagen</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getItemTypeColor(item.type)}`}>
                            {getItemTypeIcon(item.type)} {item.type}
                        </span>
                        {item.averageRating > 0 && (
                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                                ⭐ {item.averageRating.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Contenido */}
                <div className="p-5">
                    {/* Categoría */}
                    {item.category && (
                        <div className="text-sm text-gray-500 mb-2">
                            {item.category.name}
                        </div>
                    )}
                    
                    {/* Nombre */}
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                        {item.name}
                    </h3>
                    
                    {/* Descripción */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                    </p>
                    
                    {/* Detalles específicos */}
                    {item.type === 'PRODUCT' && item.productDetails && (
                        <div className="mb-4 space-y-1">
                            {item.productDetails.brand && (
                                <div className="text-sm text-gray-500">
                                    Marca: <span className="font-medium">{item.productDetails.brand}</span>
                                </div>
                            )}
                            {item.productDetails.sku && (
                                <div className="text-sm text-gray-500">
                                    SKU: {item.productDetails.sku}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {item.type === 'SOFTWARE' && item.softwareDetails && (
                        <div className="mb-4 space-y-1">
                            <div className="text-sm text-gray-500">
                                Licencia: <span className="font-medium">{item.softwareDetails.licenseType}</span>
                            </div>
                            {item.softwareDetails.platform && (
                                <div className="text-sm text-gray-500">
                                    Plataforma: {item.softwareDetails.platform}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {item.type === 'SERVICE' && item.serviceDetails && (
                        <div className="mb-4 space-y-1">
                            <div className="text-sm text-gray-500">
                                Modalidad: <span className="font-medium">{item.serviceDetails.serviceMode}</span>
                            </div>
                            {item.serviceDetails.durationMinutes && (
                                <div className="text-sm text-gray-500">
                                    Duración: {item.serviceDetails.durationMinutes} min
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Precio y acciones */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {formatPrice(item.price)}
                            </div>
                            <div className={`text-sm font-medium ${stockStatus.color}`}>
                                {stockStatus.text}
                                {item.type === 'PRODUCT' && item.productDetails?.stock > 0 && (
                                    <span className="ml-2">({item.productDetails.stock} unidades)</span>
                                )}
                            </div>
                        </div>
                        
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                            Ver detalles
                        </button>
                    </div>
                    
                    {/* Info adicional */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                        {item.reviewCount > 0 ? (
                            <span>{item.reviewCount} reseñas</span>
                        ) : (
                            <span>Sin reseñas aún</span>
                        )}
                        {item.favoriteCount > 0 && (
                            <span>❤️ {item.favoriteCount}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}