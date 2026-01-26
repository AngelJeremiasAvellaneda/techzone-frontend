// src/models/services/products.service.js
import { apiClient } from '@/lib/api-client';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(endpoint, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
    }
  }
}

export async function getLaptops() {
  try {
    const items = await fetchWithRetry('/items');
    return items.filter(item => 
      item.type === 'product' && 
      item.category?.toLowerCase().includes('laptop')
    );
  } catch (error) {
    console.error('Error loading laptops:', error);
    throw new Error('No se pudieron cargar las laptops');
  }
}

export async function getDesktops() {
  try {
    const items = await fetchWithRetry('/items');
    return items.filter(item => 
      item.type === 'product' && 
      item.category?.toLowerCase().includes('desktop')
    );
  } catch (error) {
    console.error('Error loading desktops:', error);
    throw new Error('No se pudieron cargar los desktops');
  }
}

// Función genérica para verificar conexión
export async function checkConnection() {
  try {
    await apiClient.get('/health');
    return true;
  } catch (error) {
    return false;
  }
}