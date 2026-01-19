// src/views/components/ImageZoomModal.jsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageZoomModal({ image, alt, isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
        {/* Controles */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            disabled={zoomLevel <= 1}
          >
            <ZoomOut className="w-6 h-6" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            disabled={zoomLevel >= 3}
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contador de zoom */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
          {Math.round(zoomLevel * 100)}%
        </div>

        {/* Imagen */}
        <div className="w-full h-full flex items-center justify-center overflow-auto">
          <div 
            className="relative"
            style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}
          >
            <Image
              src={image}
              alt={alt}
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
        </div>

        {/* Instrucciones */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
          Usa la rueda del mouse o los botones para zoom • Doble click para reset
        </div>
      </div>
    </div>
  );
}