'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';

export default function TestConnectionPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const data = await apiClient.post('/auth/register', {
        fullName: 'Test User',
        email: 'test@example.com',
        password: '123456'
      });
      setResult(JSON.stringify(data, null, 2));
      
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        console.log('Token guardado');
      }
    } catch (error) {
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testMe = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      console.log('Token actual:', token);
      
      const data = await apiClient.get('/auth/me');
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de Conexión Backend</h1>
      
      <div className="space-x-4 mb-6">
        <button 
          onClick={testRegister}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Test Registro'}
        </button>
        <button 
          onClick={testMe}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          Test /auth/me
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Resultado:</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">{result}</pre>
        </div>
      )}
    </div>
  );
}