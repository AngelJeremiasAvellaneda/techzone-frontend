// /models/hooks/useNotifications.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';

// Mock data para desarrollo
const mockNotifications = [
  {
    id: '1',
    user_id: 'user_123',
    title: '¡Pedido confirmado!',
    message: 'Tu pedido #ORD-2024-00123 ha sido confirmado y está siendo procesado.',
    type: 'order',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
  },
  {
    id: '2',
    user_id: 'user_123',
    title: '¡Oferta especial!',
    message: 'Descuento del 20% en todos los accesorios. Válido hasta el 30 de diciembre.',
    type: 'promotion',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
  },
  {
    id: '3',
    user_id: 'user_123',
    title: 'Actividad sospechosa detectada',
    message: 'Se detectó un inicio de sesión desde una nueva ubicación. ¿Fuiste tú?',
    type: 'security',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 día atrás
  },
  {
    id: '4',
    user_id: 'user_123',
    title: 'Pedido enviado',
    message: 'Tu pedido #ORD-2024-00123 ha sido enviado. Número de seguimiento: TRK-789456123.',
    type: 'order',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 días atrás
    metadata: { orderId: 'ORD-2024-00123', trackingNumber: 'TRK-789456123' },
  },
  {
    id: '5',
    user_id: 'user_123',
    title: '¡Bienvenido a TechZone!',
    message: 'Gracias por registrarte. Disfruta de tu primera compra con un 10% de descuento usando el código: WELCOME10',
    type: 'promotion',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 días atrás
  },
];

// Clave para localStorage
const NOTIFICATIONS_STORAGE_KEY = 'techzone_notifications';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Cargar notificaciones del usuario
  const loadNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // En producción, aquí harías una llamada a tu API MySQL
      // const response = await fetch(`http://tu-backend.com/api/notifications?userId=${userId}`);
      // const data = await response.json();

      // Por ahora, usamos mock data + localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      let userNotifications = [];

      if (storedNotifications) {
        const allNotifications = JSON.parse(storedNotifications);
        userNotifications = allNotifications.filter((n) => n.user_id === userId);
      }

      // Si no hay notificaciones almacenadas para este usuario, usar mock data
      if (userNotifications.length === 0) {
        userNotifications = mockNotifications.filter(n => n.user_id === userId);
        // Guardar mock data en localStorage para este usuario
        const allNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
        const updatedNotifications = [...allNotifications, ...userNotifications];
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      }

      // Ordenar por fecha (más reciente primero)
      userNotifications.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setNotifications(userNotifications);
    } catch (err) {
      console.error('Error cargando notificaciones:', err);
      setError('Error al cargar las notificaciones');
      // Fallback a mock data
      setNotifications(mockNotifications.filter(n => n.user_id === userId));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Inicializar
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Marcar como leída
  const markAsRead = useCallback(async (notificationId) => {
    try {
      // Actualizar estado local
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );

      // Actualizar localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        const allNotifications = JSON.parse(storedNotifications);
        const updatedNotifications = allNotifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        );
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      }

      // En producción, aquí harías una llamada a tu API MySQL
      // await fetch(`http://tu-backend.com/api/notifications/${notificationId}/read`, { 
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      // });

      return { success: true };
    } catch (err) {
      console.error('Error marcando notificación como leída:', err);
      return { success: false, error: 'Error al marcar como leída' };
    }
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(async () => {
    try {
      if (!userId) return { success: false, error: 'Usuario no autenticado' };

      // Actualizar estado local
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );

      // Actualizar localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        const allNotifications = JSON.parse(storedNotifications);
        const updatedNotifications = allNotifications.map(notification => 
          notification.user_id === userId 
            ? { ...notification, read: true }
            : notification
        );
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      }

      // En producción, aquí harías una llamada a tu API MySQL
      // await fetch(`http://tu-backend.com/api/notifications/mark-all-read`, { 
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId })
      // });

      showToast('Todas las notificaciones marcadas como leídas', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error marcando todas las notificaciones como leídas:', err);
      showToast('Error al marcar como leídas', 'error');
      return { success: false, error: 'Error al marcar todas como leídas' };
    }
  }, [userId, showToast]);

  // Eliminar notificación
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      // Actualizar estado local
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );

      // Actualizar localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        const allNotifications = JSON.parse(storedNotifications);
        const updatedNotifications = allNotifications.filter(
          notification => notification.id !== notificationId
        );
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      }

      // En producción, aquí harías una llamada a tu API MySQL
      // await fetch(`http://tu-backend.com/api/notifications/${notificationId}`, { 
      //   method: 'DELETE',
      // });

      showToast('Notificación eliminada', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error eliminando notificación:', err);
      showToast('Error al eliminar notificación', 'error');
      return { success: false, error: 'Error al eliminar notificación' };
    }
  }, [showToast]);

  // Eliminar todas las leídas
  const deleteAllRead = useCallback(async () => {
    try {
      if (!userId) return { success: false, error: 'Usuario no autenticado' };

      // Actualizar estado local
      setNotifications(prev => 
        prev.filter(notification => !notification.read)
      );

      // Actualizar localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        const allNotifications = JSON.parse(storedNotifications);
        const updatedNotifications = allNotifications.filter(
          notification => !(notification.user_id === userId && notification.read)
        );
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      }

      // En producción, aquí harías una llamada a tu API MySQL
      // await fetch(`http://tu-backend.com/api/notifications/delete-read`, { 
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId })
      // });

      showToast('Notificaciones leídas eliminadas', 'success');
      return { success: true };
    } catch (err) {
      console.error('Error eliminando notificaciones leídas:', err);
      showToast('Error al eliminar notificaciones', 'error');
      return { success: false, error: 'Error al eliminar notificaciones leídas' };
    }
  }, [userId, showToast]);

  // Agregar nueva notificación
  const addNotification = useCallback(async (newNotification) => {
    try {
      const notification = {
        ...newNotification,
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        read: false,
        created_at: new Date().toISOString(),
      };

      // Actualizar estado local
      setNotifications(prev => [notification, ...prev]);

      // Actualizar localStorage
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      const allNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
      allNotifications.push(notification);
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(allNotifications));

      return { success: true };
    } catch (err) {
      console.error('Error agregando notificación:', err);
      return { success: false, error: 'Error al agregar notificación' };
    }
  }, []);

  // Simular notificación en tiempo real (para demo)
  const simulateNewNotification = useCallback(async (type = 'info') => {
    const titles = {
      order: '🎉 ¡Nuevo pedido!',
      promotion: '🔥 ¡Oferta especial!',
      security: '🔒 Actividad detectada',
      system: '⚙️ Actualización del sistema',
      info: '📢 Nuevo anuncio'
    };

    const messages = {
      order: 'Se ha registrado un nuevo pedido en tu cuenta.',
      promotion: 'Descuento exclusivo del 15% en productos seleccionados.',
      security: 'Se detectó un nuevo inicio de sesión en tu cuenta.',
      system: 'El sistema ha sido actualizado con nuevas funcionalidades.',
      info: 'Tenemos novedades importantes para ti.'
    };

    return await addNotification({
      user_id: userId,
      title: titles[type] || 'Nueva notificación',
      message: messages[type] || 'Tienes una nueva notificación.',
      type: type,
    });
  }, [userId, addNotification]);

  // Contar no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    refetch: loadNotifications,
    addNotification,
    simulateNewNotification, // Solo para demo
  };
};