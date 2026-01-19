// src/models/context/AuthContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario desde localStorage
  useEffect(() => {
    console.log("🔄 Auth: Iniciando...");
    
    const loadUser = async () => {
      try {
        // Verificar token en localStorage
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          
          if (token) {
            // Verificar token con backend
            try {
              const userData = await apiClient.get('/auth/me');
              setUser(userData);
              setProfile(userData.profile || { role: 'customer' });
            } catch (apiError) {
              console.log("❌ Token inválido, limpiando...");
              localStorage.removeItem('auth_token');
              setUser(null);
              setProfile(null);
            }
          }
        }
      } catch (err) {
        console.error("❌ Error al cargar usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔴 MÉTODOS PARA AUTENTICACIÓN VIA API REST
  const signIn = async ({ email, password }) => {
    try {
      setError(null);
      console.log("🔐 Iniciando sesión para:", email);

      const { success, token, user: userData } = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (!success) throw new Error('Error en autenticación');

      // Guardar token en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
      }

      console.log("✅ Sesión iniciada:", userData.email);
      setUser(userData);
      setProfile(userData.profile || { role: 'customer' });
      
      return { success: true, data: userData };
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signUp = async ({ email, password, fullName }) => {
    try {
      setError(null);

      const { success, message, user: userData } = await apiClient.post('/auth/register', {
        email,
        password,
        full_name: fullName,
      });

      if (!success) throw new Error(message || 'Error en registro');

      return {
        success: true,
        message: message || "Revisa tu correo para confirmar tu cuenta.",
        data: userData,
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signInWithProvider = async (provider) => {
    try {
      // Para Next.js, redirigir al backend para OAuth
      if (typeof window !== 'undefined') {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    try {
      // Llamar al endpoint de logout
      await apiClient.post('/auth/logout');
      
      // Limpiar localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }

      setUser(null);
      setProfile(null);
      console.log("✅ Sesión cerrada");
      return { success: true };
    } catch (err) {
      // Aún así limpiar el estado local
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      setUser(null);
      setProfile(null);
      return { success: true };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.id) throw new Error("No autenticado");

      const { success, profile: updatedProfile } = await apiClient.put('/auth/profile', updates);

      if (!success) throw new Error('Error al actualizar perfil');

      setProfile(updatedProfile);
      return { success: true, profile: updatedProfile };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { success, message } = await apiClient.post('/auth/reset-password', { email });

      if (!success) throw new Error(message || 'Error al resetear contraseña');
      
      return { success: true, message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Helper functions
  const getRole = () => profile?.role || "customer";
  const isAdminOrStaff = () => {
    const role = getRole();
    return role === "admin" || role === "staff";
  };
  const isAdmin = () => getRole() === "admin";
  const isStaff = () => getRole() === "staff";
  const isCustomer = () => getRole() === "customer";
  const isAuthenticated = !!user;

  const value = {
    // Estado
    user,
    profile,
    loading,
    error,
    
    // Métodos de autenticación
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    updateProfile,
    resetPassword,
    
    // Helpers
    getRole,
    isAdminOrStaff,
    isAdmin,
    isStaff,
    isCustomer,
    isAuthenticated,
    
    // Otros métodos
    refreshProfile: () => {
      if (user) {
        apiClient.get('/auth/me')
          .then(data => {
            setProfile(data.profile || { role: 'customer' });
          })
          .catch(console.error);
      }
    },
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};