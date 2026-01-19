// src/app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import LoadingScreen from '@/views/components/LoadingScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TechZone - La mejor experiencia tecnológica',
  description: 'Tienda de tecnología con los mejores productos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}