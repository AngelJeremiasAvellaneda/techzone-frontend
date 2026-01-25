'use client';

import { useEffect, useState } from 'react';
import { itemService, ItemType } from '@/models/services/itemService';
import ItemCard from '@/components/ItemCard';

export default function TiendaPage() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('PRODUCT');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        loadCategories();
    }, [selectedType]);

    useEffect(() => {
        loadItems();
    }, [selectedType, selectedCategory]);

    const loadCategories = async () => {
        try {
            const data = await itemService.getCategoriesByType(selectedType);
            setCategories(data);
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    };

    const loadItems = async () => {
        try {
            setLoading(true);
            let data;
            
            if (selectedCategory === 'ALL') {
                data = await itemService.getItemsByType(selectedType);
            } else {
                data = await itemService.getItemsByCategory(selectedCategory);
            }
            
            setItems(data);
            setError(null);
        } catch (err) {
            console.error('Error loading items:', err);
            setError('Error al cargar los productos');
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const itemTypes = [
        { value: 'PRODUCT', label: 'Productos', icon: '🖥️' },
        { value: 'SOFTWARE', label: 'Software', icon: '💿' },
        { value: 'SERVICE', label: 'Servicios', icon: '🔧' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Tienda Tech Platform
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Descubre nuestra selección de productos tecnológicos, 
                        software y servicios especializados
                    </p>
                </div>

                {/* Filtros */}
                <div className="mb-8 space-y-6">
                    {/* Tipo de Item */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Tipo de producto
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {itemTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => {
                                        setSelectedType(type.value);
                                        setSelectedCategory('ALL');
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                                        selectedType === type.value
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    <span className="text-xl">{type.icon}</span>
                                    <span>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categorías */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Categorías
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('ALL')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === 'ALL'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                Todas las categorías
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Estado de carga */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                        <p className="mt-4 text-gray-600 text-lg">
                            Cargando {selectedType === 'PRODUCT' ? 'productos' : 
                            selectedType === 'SOFTWARE' ? 'software' : 'servicios'}...
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="text-red-600 text-xl">⚠️</div>
                            <div>
                                <p className="text-red-800 font-medium">{error}</p>
                                <button
                                    onClick={loadItems}
                                    className="mt-2 text-red-700 hover:text-red-900 font-medium"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grid de Items */}
                {!loading && !error && (
                    <>
                        {items.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                                <div className="text-6xl mb-4">📭</div>
                                <p className="text-gray-500 text-lg">
                                    No hay {selectedType === 'PRODUCT' ? 'productos' : 
                                    selectedType === 'SOFTWARE' ? 'software' : 'servicios'} 
                                    disponibles en esta categoría
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedType === 'PRODUCT' ? 'Productos' : 
                                         selectedType === 'SOFTWARE' ? 'Software' : 'Servicios'}
                                        <span className="text-blue-600 ml-2">({items.length})</span>
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                        {items.filter(item => item.type === 'PRODUCT' && 
                                          item.productDetails?.stock > 0).length} disponibles
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {items.map((item) => (
                                        <ItemCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* Estadísticas */}
                {!loading && items.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Resumen de la tienda
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {items.length}
                                </div>
                                <div className="text-gray-600">Items totales</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {items.filter(item => item.type === 'PRODUCT' && 
                                      item.productDetails?.stock > 0).length}
                                </div>
                                <div className="text-gray-600">Productos en stock</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {new Set(items.map(item => item.category?.id)).size}
                                </div>
                                <div className="text-gray-600">Categorías activas</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">
                                    {items.reduce((sum, item) => sum + (item.averageRating || 0), 0).toFixed(1)}
                                </div>
                                <div className="text-gray-600">Puntuación promedio</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}