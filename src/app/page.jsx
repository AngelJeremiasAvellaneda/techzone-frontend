// src/app/page.jsx - PÁGINA PRINCIPAL
import HomeContent from '@/views/pages/HomeContent';
import { Suspense } from 'react';
import LoadingScreen from '@/views/components/LoadingScreen';

export const metadata = {
  title: 'Inicio | TechZone',
  description: 'Bienvenido a TechZone, tu tienda de tecnología de confianza',
};

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  );
}