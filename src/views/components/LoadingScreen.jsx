// src/views/components/LoadingScreen.jsx
'use client';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Cargando TechZone...</p>
      </div>
    </div>
  );
}