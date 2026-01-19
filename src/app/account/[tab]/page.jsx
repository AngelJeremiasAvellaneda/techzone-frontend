'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BaseLayout from '@/views/layouts/BaseLayout';
import { useAuth } from '@/models/context/AuthContext';
import { useOrders } from '@/models/hooks/useOrders';
import { useFavorites } from '@/models/hooks/useFavorites';
import { useAddresses } from '@/models/hooks/useAddresses';
import { usePaymentMethods } from '@/models/hooks/usePaymentMethods';
import { useNotifications } from '@/models/hooks/useNotifications';
import { useSecurity } from '@/models/hooks/useSecurity';
import { useToast } from '@/models/hooks/useToast';
import { ROUTES } from '@/constants/routes';
import {
  User, Mail, Lock, Camera, Save, X,
  Package, Heart, MapPin, CreditCard,
  Bell, Shield, LogOut,
  Phone, Calendar, Edit2, Eye, EyeOff,
  CheckCircle, XCircle, AlertCircle, Trash2,
  ChevronRight, Eye as EyeIcon, Truck,
  Check, RefreshCw, Home, Plus, Minus,
  Building, Smartphone, Globe, DollarSign,
  MessageSquare, Download, ShoppingBag,
  Settings
} from '@/components/icons';

// Componente para Toast
const ToastContainer = ({ toasts, dismissToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg animate-in slide-in-from-right-10 min-w-[300px] ${
            toast.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
              : toast.type === 'error'
              ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
          }`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
          {toast.type === 'info' && <Bell className="w-5 h-5 text-blue-500" />}
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const AccountTabContent = ({ params }) => {
  const { tab = 'profile' } = params || {};
  const { user, profile, updateProfile, signOut } = useAuth();
  const router = useRouter();
  const { toasts, showToast, dismissToast } = useToast();

  const [activeTab, setActiveTab] = useState(tab);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Estados para formularios
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    birth_date: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Usar hooks
  const { 
    orders, 
    loading: ordersLoading, 
    refetch: refetchOrders 
  } = useOrders(user?.id);

  const {
    favorites,
    loading: favoritesLoading,
    removeFavorite,
  } = useFavorites(user?.id);

  const {
    addresses,
    loading: addressesLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses(user?.id);

  const {
    changePassword,
    loading: securityLoading
  } = useSecurity();

  // Inicializar datos del perfil
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        birth_date: profile.birth_date || '',
      });
    }
  }, [profile]);

  // Actualizar activeTab si cambia el parámetro
  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, router]);

  // Calcular estadísticas
  const totalOrders = orders?.length || 0;
  const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;
  const averageOrder = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Funciones del perfil
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('El archivo debe ser una imagen (JPG, PNG)', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('La imagen no debe superar los 5MB', 'error');
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la lógica para subir a MySQL
      // Por ahora simulamos éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Imagen de perfil actualizada correctamente', 'success');
    } catch (err) {
      console.error('Error uploading image:', err);
      showToast('Error al subir la imagen', 'error');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        showToast('Perfil actualizado correctamente', 'success');
        setEditMode(false);
      } else {
        showToast(result.error || 'Error al actualizar perfil', 'error');
      }
    } catch (err) {
      showToast('Error al actualizar perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      showToast(result.message || 'Contraseña actualizada correctamente', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      showToast(result.error || 'Error al cambiar la contraseña', 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push(ROUTES.HOME);
      showToast('Sesión cerrada correctamente', 'success');
    } catch (err) {
      showToast('Error al cerrar sesión', 'error');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'wishlist', name: 'Favoritos', icon: Heart },
    { id: 'addresses', name: 'Direcciones', icon: MapPin },
    { id: 'payment', name: 'Pagos', icon: CreditCard },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
  ];

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <BaseLayout>
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header con breadcrumb */}
          <div className="mb-8">
            <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href={ROUTES.HOME} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-1">
                <Home className="w-3 h-3" />
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-white">Mi Cuenta</span>
              {activeTab !== 'profile' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 dark:text-white capitalize">{activeTab}</span>
                </>
              )}
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Mi Cuenta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Administra tu información personal y preferencias
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                {/* Avatar y nombre */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative inline-block mb-4">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.full_name || 'Usuario'}
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/50"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-purple-500/50">
                        {getInitials(profile?.full_name)}
                      </div>
                    )}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition shadow-lg"
                      disabled={loading}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{profile?.full_name || 'Usuario'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                
                {/* Tabs */}
                <nav className="space-y-1">
                  {tabs.map((tabItem) => {
                    const Icon = tabItem.icon;
                    const isActive = activeTab === tabItem.id;
                    return (
                      <Link
                        key={tabItem.id}
                        href={`${ROUTES.ACCOUNT}/${tabItem.id}`}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tabItem.name}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </Link>
                    );
                  })}               
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-all mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Cerrar Sesión</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Tabs móviles */}
            <div className="lg:hidden mb-4">
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
                {tabs.map((tabItem) => {
                  const Icon = tabItem.icon;
                  const isActive = activeTab === tabItem.id;
                  return (
                    <Link
                      key={tabItem.id}
                      href={`${ROUTES.ACCOUNT}/${tabItem.id}`}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tabItem.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                
                {/* PERFIL */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Información Personal</h2>
                      {!editMode ? (
                        <button
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditMode(false);
                              setFormData({
                                full_name: profile?.full_name || '',
                                phone: profile?.phone || '',
                                birth_date: profile?.birth_date || '',
                              });
                            }}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            Guardar
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          <User className="w-4 h-4 inline mr-2" />
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white opacity-60 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          No se puede cambiar el email
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!editMode}
                          placeholder="+51 999 999 999"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          name="birth_date"
                          value={formData.birth_date}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    
                    {/* Estadísticas */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Estadísticas de Cuenta</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <Package className="w-6 h-6 text-purple-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pedidos</p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                          <Heart className="w-6 h-6 text-red-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{favorites?.length || 0}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Favoritos</p>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                          <MapPin className="w-6 h-6 text-green-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{addresses?.length || 0}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Direcciones</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <CreditCard className="w-6 h-6 text-blue-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Métodos de pago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* SEGURIDAD */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Seguridad y Contraseña</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cambiar Contraseña</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                              Contraseña Actual
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Ingresa tu contraseña actual"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                              Nueva Contraseña
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Ingresa tu nueva contraseña"
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              La contraseña debe tener al menos 6 caracteres
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                              Confirmar Nueva Contraseña
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Confirma tu nueva contraseña"
                              />
                            </div>
                          </div>
                          
                          <button
                            onClick={handleChangePassword}
                            disabled={securityLoading}
                            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                          >
                            {securityLoading ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Cambiando contraseña...
                              </div>
                            ) : 'Cambiar Contraseña'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mensaje para otros tabs no implementados */}
                {!['profile', 'security'].includes(activeTab) && (
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Sección en desarrollo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Esta funcionalidad está en desarrollo. Pronto estará disponible.
                    </p>
                    <Link
                      href={ROUTES.ACCOUNT}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      Volver al perfil
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </BaseLayout>
  );
};

export default function AccountTabPage({ params }) {
  return <AccountTabContent params={params} />;
}