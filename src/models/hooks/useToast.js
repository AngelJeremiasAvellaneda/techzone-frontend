// src/models/hooks/useToast.js
'use client';

import { toast } from 'react-hot-toast';

export function useToast() {
  const showToast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast(message, {
          icon: '⚠️',
        });
        break;
      default:
        toast(message);
    }
  };

  return { showToast };
}