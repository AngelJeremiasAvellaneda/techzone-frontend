// src/lib/api-client.js

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // ⚠️ SOLO en cliente existe localStorage
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      method: options.method || 'GET',
      headers,
      body: options.body,
      cache: 'no-store', // 👈 CLAVE para App Router
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `Error HTTP ${response.status}`;
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      // 204 No Content
      if (response.status === 204) return null;

      return await response.json();
    } catch (error) {
      console.error('❌ API ERROR:', error.message);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
