const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const itemService = {
    // Obtener todos los items
    async getAllItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items`);
            if (!response.ok) {
                throw new Error('Error al obtener items');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },

    // Obtener items por tipo
    async getItemsByType(type) {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items/type/${type}`);
            if (!response.ok) {
                throw new Error(`Error al obtener items de tipo ${type}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching items by type:', error);
            throw error;
        }
    },

    // Obtener item por ID
    async getItemById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener el item');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error;
        }
    },

    // Buscar items
    async searchItems(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items/search?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Error en la búsqueda de items');
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching items:', error);
            throw error;
        }
    },

    // Obtener items destacados
    async getFeaturedItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items/featured`);
            if (!response.ok) {
                throw new Error('Error al obtener items destacados');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching featured items:', error);
            throw error;
        }
    },

    // Obtener items por categoría
    async getItemsByCategory(categoryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/public/items/category/${categoryId}`);
            if (!response.ok) {
                throw new Error('Error al obtener items por categoría');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching items by category:', error);
            throw error;
        }
    },

    // Obtener categorías
    async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/public/categories`);
            if (!response.ok) {
                throw new Error('Error al obtener categorías');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Obtener categorías por tipo
    async getCategoriesByType(type) {
        try {
            const response = await fetch(`${API_BASE_URL}/public/categories/type/${type}`);
            if (!response.ok) {
                throw new Error(`Error al obtener categorías de tipo ${type}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories by type:', error);
            throw error;
        }
    }
};

// Tipos de items
export const ItemType = {
    PRODUCT: 'PRODUCT',
    SOFTWARE: 'SOFTWARE',
    SERVICE: 'SERVICE'
};

// Categorías de ejemplo (puedes obtenerlas dinámicamente)
export const defaultCategories = {
    PRODUCT: [
        { id: 1, name: 'Laptops' },
        { id: 2, name: 'Desktop PCs' },
        { id: 3, name: 'Componentes' },
        { id: 4, name: 'Periféricos' }
    ],
    SOFTWARE: [
        { id: 5, name: 'Sistemas Operativos' },
        { id: 6, name: 'Software de Oficina' },
        { id: 7, name: 'Antivirus' }
    ],
    SERVICE: [
        { id: 8, name: 'Servicios Técnicos' },
        { id: 9, name: 'Consultoría IT' }
    ]
};