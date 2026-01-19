// /src/utils/theme-init.js
// Este script se ejecuta antes de que React cargue para evitar flash
(function() {
    // Verificar localStorage para tema guardado
    const storedTheme = localStorage.getItem('techzone-theme');
    
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determinar tema inicial
    let theme = 'light';
    if (storedTheme) {
      theme = storedTheme;
    } else if (prefersDark) {
      theme = 'dark';
    }
    
    // Aplicar clase inmediatamente para evitar flash
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();