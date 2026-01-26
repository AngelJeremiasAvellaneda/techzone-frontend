'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '@/views/layouts/BaseLayout';
import { useAuth } from '@/models/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Registrar usuario
      const registerResult = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });

      if (!registerResult.success) {
        setError(registerResult.error || 'Error al registrar');
        setLoading(false);
        return;
      }

      setSuccess('✅ Cuenta creada correctamente!');
      
      // 2. Auto-login después del registro exitoso
      const loginResult = await signIn({
        email: formData.email,
        password: formData.password
      });

      if (loginResult.success) {
        setSuccess('✅ Cuenta creada y sesión iniciada correctamente!');
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push(ROUTES.HOME);
        }, 2000);
      } else {
        setSuccess('✅ Cuenta creada. Por favor inicia sesión manualmente.');
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 3000);
      }

    } catch (err) {
      setError('Error inesperado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="min-h-screen pt-24 flex justify-center items-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            Crear cuenta
          </h2>

          {error && (
            <div className="flex gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm mb-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-green-600 dark:text-green-400 text-sm mb-4">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="fullName"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </span>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Nota:</strong> Después del registro exitoso, se intentará iniciar sesión automáticamente.
              Si hay algún error, serás redirigido a la página de login.
            </p>
          </div>

          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link 
              href={ROUTES.LOGIN} 
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Register;