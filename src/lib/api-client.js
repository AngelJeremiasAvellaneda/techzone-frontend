// src/lib/api-client.js
const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const DEFAULT_TIMEOUT = 8000;
const DEFAULT_RETRIES = 2;

class ApiClient {
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  buildHeaders(customHeaders = {}) {
    const token = this.getToken();

    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    };
  }

  buildUrl(endpoint, params) {
    if (!params) return `${API_BASE_URL}${endpoint}`;

    const query = new URLSearchParams(params).toString();
    return `${API_BASE_URL}${endpoint}?${query}`;
  }

  async request(
    endpoint,
    {
      method = 'GET',
      body,
      params,
      headers = {},
      timeout = DEFAULT_TIMEOUT,
      retries = DEFAULT_RETRIES
    } = {}
  ) {
    const url = this.buildUrl(endpoint, params);
    
    // DEBUG: Añadir logs
    console.log(`🚀 ${method} ${url}`);
    console.log('Headers:', this.buildHeaders(headers));
    if (body) console.log('Body:', body);

    for (let attempt = 1; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          method,
          headers: this.buildHeaders(headers),
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
          cache: 'no-store'
        });

        clearTimeout(timeoutId);

        // DEBUG: Log response
        console.log(`✅ ${method} ${endpoint} - Status: ${response.status}`);
        
        // ❌ No autorizado → token inválido o expirado
        if (response.status === 401) {
          localStorage.removeItem('auth_token');
          throw new Error('Sesión expirada. Inicia sesión nuevamente.');
        }

        // ❌ Prohibido → permisos
        if (response.status === 403) {
          throw new Error('No tienes permisos para realizar esta acción.');
        }

        if (!response.ok) {
          const text = await response.text();
          console.error(`❌ Error ${response.status}:`, text);
          throw new Error(text || `Error HTTP ${response.status}`);
        }

        if (response.status === 204) return null;

        const data = await response.json();
        console.log('Response data:', data); // DEBUG
        return data;
        
      } catch (error) {
        clearTimeout(timeoutId);

        const isLastAttempt = attempt === retries;
        const isAbort = error.name === 'AbortError';

        console.error(
          `❌ ${method} ${endpoint} (${attempt}/${retries})`,
          error.message
        );

        if (isLastAttempt) {
          if (isAbort) {
            throw new Error('El servidor tardó demasiado en responder.');
          }
          throw error;
        }

        // ⏳ Backoff simple
        await new Promise(res => setTimeout(res, 500 * attempt));
      }
    }
  }

  // ------------------------
  // MÉTODOS PÚBLICOS
  // ------------------------

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data
    });
  }

  put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE'
    });
  }
}

export const apiClient = new ApiClient();
