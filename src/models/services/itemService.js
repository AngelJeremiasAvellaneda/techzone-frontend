// src/models/services/itemService.js
import { apiClient } from '@/lib/api-client';

export const ItemType = {
  PRODUCT: 'product',
  SOFTWARE: 'software',
  SERVICE: 'service'
};

export const itemService = {
  /**
   * 🔹 Obtener todos los items activos
   */
  async getItems() {
    try {
      const response = await apiClient.get('/items');
      return response.map(item => ({
        ...item,
        status: item.status.toUpperCase()
      })) || [];
    } catch (error) {
      console.error('❌ Error fetching items:', error);
      throw error;
    }
  },

  /**
   * 🔹 Obtener items por tipo (product, software, service)
   */
  async getItemsByType(type) {
    try {
      const response = await apiClient.get(`/items/type/${type}`);
      return response.map(item => ({
        ...item,
        status: item.status.toUpperCase()
      })) || [];
    } catch (error) {
      console.error(`❌ Error fetching items by type ${type}:`, error);
      throw error;
    }
  },

  getProducts(filters = {}) {
    return this.getItemsByType(ItemType.PRODUCT, filters);
  },

  getSoftware(filters = {}) {
    return this.getItemsByType(ItemType.SOFTWARE, filters);
  },

  getServices(filters = {}) {
    return this.getItemsByType(ItemType.SERVICE, filters);
  },

  /**
   * 🔹 Obtener items por categoría
   */
  async getByCategory(categoryId) {
    try {
      const response = await apiClient.get(`/items/category/${categoryId}`);
      return response.map(item => ({
        ...item,
        status: item.status.toUpperCase()
      })) || [];
    } catch (error) {
      console.error(`❌ Error fetching items by category ${categoryId}:`, error);
      throw error;
    }
  },

  /**
   * 🔹 MÉTODOS SEMÁNTICOS (UI friendly)
   */
  async getLaptops() {
    return await apiClient.get('/items/laptops');
  },

  async getLaptopGaming() {
    return await apiClient.get('/items/laptops/gaming');
  },

  async getLaptopsProfesionales() {
    return await apiClient.get('/items/laptops/profesionales');
  },
  async getDesktops() {
    return await apiClient.get('/items/desktops');
  },
  async getDesktopsGaming() {
    return await apiClient.get('/items/desktops/gaming');
  },
  async getDesktopsProfesionales() {
    return await apiClient.get('/items/desktops/workstation');
  },
  async getComponents() {
    return await apiClient.get('/items/components');
  },
  async getComponentsProcessors() {
    return await apiClient.get('/items/components/processors');
  },
  async getComponentsGraphicsCards() {
    return await apiClient.get('/items/components/graphics-cards');
  },
  async getComponentsRamMemory() {
    return await apiClient.get('/items/components/ram-memory');
  },
  async getPeripherals() {
    return await apiClient.get('/items/peripherals');
  },
  async getPeripheralsKeyboards() {
    return await apiClient.get('/items/peripherals/keyboards');
  },
  async getPeripheralsMices() {
    return await apiClient.get('/items/peripherals/mices');
  },
  async getPeripheralsMonitors() {
    return await apiClient.get('/items/peripherals/monitors');
  },

  /**
   * 🔹 ITEM INDIVIDUAL
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/items/${id}`);
      return { ...response, status: response.status.toUpperCase() };
    } catch (error) {
      console.error('❌ Error fetching item by id:', error);
      throw error;
    }
  },

  /**
   * 🔹 CATEGORÍAS
   */
  async getCategories() {
    try {
      return await apiClient.get('/categories');
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      return [];
    }
  }
};
