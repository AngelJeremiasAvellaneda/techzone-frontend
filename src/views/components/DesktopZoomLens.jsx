// src/views/components/DesktopZoomLens.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function DesktopZoomLens({ image, alt, zoomLevel = 2, lensSize = 200 }) {
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const zoomRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !lensRef.current || !zoomRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const lens = lensRef.current;
    const zoom = zoomRef.current;

    // Calcular posición del lens
    let x = e.clientX - container.left - lensSize / 2;
    let y = e.clientY - container.top - lensSize / 2;

    // Mantener el lens dentro de la imagen
    x = Math.max(0, Math.min(x, container.width - lensSize));
    y = Math.max(0, Math.min(y, container.height - lensSize));

    setLensPosition({ x, y });

    // Calcular posición de la imagen ampliada
    const zoomX = -(x * zoomLevel) + lensSize / 2;
    const zoomY = -(y * zoomLevel) + lensSize / 2;
    setImagePosition({ x: zoomX, y: zoomY });

    // Actualizar estilos
    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    zoom.style.backgroundPosition = `${zoomX}px ${zoomY}px`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 rounded-lg overflow-hidden cursor-crosshair bg-white dark:bg-gray-900"
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Lente de zoom */}
      {showLens && (
        <>
          <div 
            ref={lensRef}
            className="absolute w-48 h-48 border-2 border-purple-600 pointer-events-none bg-white/20 backdrop-blur-sm"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
            }}
          />

          {/* Imagen ampliada */}
          <div 
            ref={zoomRef}
            className="absolute top-0 left-full ml-4 w-96 h-96 border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hidden lg:block"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundPosition: `${imagePosition.x}px ${imagePosition.y}px`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        </>
      )}
    </div>
  );
}