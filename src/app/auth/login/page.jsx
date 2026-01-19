'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '@/views/layouts/BaseLayout';
import { useAuth } from '@/models/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import { 
  Eye, EyeOff, Lock, Mail, User, ShoppingBag, AlertCircle,
  LogIn, UserPlus
} from '@/components/icons';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const { user, profile, signIn, signUp, loading: authLoading } = useAuth();
  const router = useRouter();

  // 🔴 REDIRECCIÓN MEJORADA
  useEffect(() => {
    if (!authLoading && user && profile) {
      // 🔐 ADMIN: Siempre redirigir a /admin
      if (profile?.role === 'admin' || profile?.role === 'staff') {
        router.push(ROUTES.ADMIN);
      } else {
        // 👤 Cliente: Redirigir a home
        router.push(ROUTES.HOME);
      }
    }
  }, [user, profile, authLoading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return false;
    }
    if (!isLogin) {
      if (!formData.fullName) {
        setError('Por favor ingresa tu nombre completo');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login email/password
        await signIn({ email: formData.email, password: formData.password });
        // La redirección se manejará en el useEffect según el rol
      } else {
        // Registro manual - POR DEFECTO CREA CLIENTES, NO ADMINS
        const result = await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: 'customer' // Forzar rol de cliente en registro
        });
        if (result.success) {
          alert('¡Cuenta creada exitosamente! Por favor verifica tu email.');
          setIsLogin(true);
          setFormData({ email: '', password: '', fullName: '', confirmPassword: '' });
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', fullName: '', confirmPassword: '' });
  };

  // Mostrar loader si todavía se verifica la sesión
  if (authLoading) return (
    <BaseLayout>
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </BaseLayout>
  );

  // Si ya está autenticado, no mostrar el formulario
  if (user && !authLoading) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Redirigiendo...</p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="min-h-screen pt-24 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo y título */}
          <div className="text-center">
            <Link href={ROUTES.HOME} className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShoppingBag className="w-10 h-10 text-purple-600" />
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  TechZone
                </span>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Bienvenido de nuevo' : 'Crear cuenta'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLogin
                ? 'Ingresa a tu cuenta para continuar'
                : 'Regístrate para disfrutar de todos nuestros beneficios'}
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-purple-600 dark:text-purple-400 hover:opacity-80 font-medium">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</span>
                )}
              </button>
            </form>

            {/* Toggle y términos */}
            <div className="mt-6">
              <button
                type="button"
                onClick={toggleMode}
                className="mt-4 w-full py-3 px-4 border-2 border-purple-600 dark:border-purple-500 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white font-semibold transition-all"
              >
                {isLogin ? (
                  <>
                    <UserPlus className="w-5 h-5 inline mr-2" />
                    Crear una cuenta
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 inline mr-2" />
                    Iniciar sesión
                  </>
                )}
              </button>
              {!isLogin && (
                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                  Al crear una cuenta, aceptas nuestros{' '}
                  <Link href="/terms" className="text-purple-600 dark:text-purple-400 hover:opacity-80">
                    Términos y Condiciones
                  </Link>{' '}
                  y nuestra{' '}
                  <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:opacity-80">
                    Política de Privacidad
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link href={ROUTES.HOME} className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;