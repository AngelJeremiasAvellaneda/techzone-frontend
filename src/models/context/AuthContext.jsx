'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Cargar usuario si hay token
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }

        console.log('Loading user with token:', token.substring(0, 30) + '...');
        
        const data = await apiClient.get('/auth/me');
        console.log('User data from /auth/me:', data);
        
        if (data.success && data.user) {
          setUser(data.user);
          // Si tu backend devuelve profile dentro de user
          if (data.user.profile) {
            setProfile(data.user.profile);
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('auth_token');
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔐 LOGIN
  const signIn = async ({ email, password }) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });

      const data = await apiClient.post('/auth/login', { email, password });
      console.log('Login response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Error en login');
      }

      localStorage.setItem('auth_token', data.token);
      console.log('Token saved to localStorage');

      setUser(data.user);
      if (data.user.profile) {
        setProfile(data.user.profile);
      }

      return { success: true, user: data.user };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // 📝 REGISTER
  const signUp = async ({ email, password, fullName }) => {
    try {
      setError(null);
      console.log('Attempting registration:', { email, fullName });

      const data = await apiClient.post('/auth/register', {
        email,
        password,
        fullName,
      });
      console.log('Register response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Error en registro');
      }

      // Auto-login después del registro
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        if (data.user.profile) {
          setProfile(data.user.profile);
        }
      }

      return {
        success: true,
        message: "Cuenta creada correctamente.",
        user: data.user
      };
    } catch (err) {
      console.error('Register error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // 🚪 LOGOUT
  const signOut = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setProfile(null);
  };

  // 👤 HELPERS
  const role = user?.role?.toLowerCase() || 'customer';

  const value = {
    user,
    profile,
    loading,
    error,

    signIn,
    signUp,
    signOut,

    isAuthenticated: !!user,
    isAdmin: role === 'admin',
    isStaff: role === 'staff' || role === 'support',
    isCustomer: role === 'customer',

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
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};