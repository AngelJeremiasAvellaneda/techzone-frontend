import { Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TechZone - Tienda de Tecnología',
  description: 'Tienda online de tecnología, laptops, computadoras y accesorios',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('techzone-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  let theme = 'light';
                  if (storedTheme) {
                    theme = storedTheme;
                  } else if (prefersDark) {
                    theme = 'dark';
                  }
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error inicializando tema:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}