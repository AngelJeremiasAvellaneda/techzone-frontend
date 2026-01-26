'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '@/views/layouts/BaseLayout';
import { useAuth } from '@/models/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { Eye, EyeOff, Lock, Mail, ShoppingBag, AlertCircle, UserPlus } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { user, signIn, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user && !authLoading) {
      if (user.role === 'admin' || user.role === 'staff') {
        router.push(ROUTES.ADMIN);
      } else {
        router.push(ROUTES.HOME);
      }
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signIn({
      email: formData.email,
      password: formData.password
    });

    if (!result.success) {
      setError(result.error || 'Credenciales incorrectas');
      setLoading(false);
      return;
    }

    // Redirección manejada por el useEffect
    setLoading(false);
  };

  if (authLoading) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex flex-col justify-center items-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Verificando sesión...</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="min-h-screen pt-24 flex justify-center items-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href={ROUTES.HOME}>
              <div className="flex justify-center items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <ShoppingBag className="w-10 h-10 text-purple-600" />
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 text-transparent bg-clip-text">
                  TechZone
                </span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Iniciar sesión
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
            {error && (
              <div className="flex gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm mb-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="ejemplo@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-12 w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Iniciando sesión...
                  </span>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={() => router.push(ROUTES.REGISTER)}
                className="w-full py-3 border-2 border-purple-600 rounded-lg text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2"
                disabled={loading}
              >
                <UserPlus className="w-5 h-5" />
                Crear cuenta nueva
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                ¿Problemas para iniciar sesión?{' '}
                <Link 
                  href="/contact" 
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  Contáctanos
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;