// /src/components/ToastContainer.jsx
'use client';

import React from 'react';
import { useToast } from '@/models/hooks/useToast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from '@/components/icons';

export const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getToastBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastBgColor(toast.type)} border rounded-lg shadow-lg p-4 transform transition-all duration-300 animate-in slide-in-from-right-10`}
        >
          <div className="flex items-start gap-3">
            {getToastIcon(toast.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => hideToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Progress bar for auto-dismiss */}
          {toast.duration > 0 && (
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-400 dark:bg-gray-500"
                style={{ 
                  animation: `shrink ${toast.duration}ms linear forwards`,
                  animationPlayState: 'running'
                }}
              />
            </div>
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};