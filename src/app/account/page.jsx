'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/models/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import BaseLayout from '@/views/layouts/BaseLayout';

export default function AccountPage() {
  const { user, loading } = useAuth();

  // Redirigir si no está autenticado
  if (!loading && !user) {
    redirect(ROUTES.LOGIN);
  }

  // Mostrar loading
  if (loading) {
    return (
      <BaseLayout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </BaseLayout>
    );
  }

  // Redirigir a perfil por defecto
  redirect(`${ROUTES.ACCOUNT}/profile`);
}