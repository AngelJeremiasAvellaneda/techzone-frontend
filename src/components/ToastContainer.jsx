// /src/components/ToastContainer.jsx
'use client';

import React from 'react';
import { useToast } from '@/models/hooks/useToast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from '@/components/icons';
import './ToastContainer.css'; // ← Archivo CSS separado

export const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  // ... resto del código igual ...

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastBgColor(toast.type)} border rounded-lg shadow-lg p-4 transform transition-all duration-300 animate-in slide-in-from-right-10`}
        >
          {/* ... mismo contenido ... */}
          {toast.duration > 0 && (
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-400 dark:bg-gray-500 toast-progress-bar"
                style={{ animationDuration: `${toast.duration}ms` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};