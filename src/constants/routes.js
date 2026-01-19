// src/constants/routes.js
export const ROUTES = {
    // Páginas principales
    HOME: '/',
    SHOP: '/tienda',
    ABOUT: '/about',
    CONTACT: '/contact',
    
    // Categorías de productos
    CATEGORY_LAPTOPS: '/tienda/laptops',
    CATEGORY_DESKTOPS: '/tienda/desktops',
    CATEGORY_ACCESSORIES: '/tienda/accessories',
    
    // Productos
    PRODUCT_DETAIL: (id, slug) => slug ? `/tienda/producto/${id}-${slug}` : `/tienda/producto/${id}`,
    
    // Autenticación
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    
    // Usuario
    CART: '/carrito',
    ACCOUNT: '/mi-cuenta',
    ACCOUNT_TAB: (tab) => `/mi-cuenta/${tab}`,
    CHECKOUT: '/checkout',
    CHECKOUT_SUCCESS: '/checkout/checkout-success',
    
    // Administración
    ADMIN: '/admin',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_CUSTOMERS: '/admin/customers',
    ADMIN_CATEGORIES: '/admin/categories',
    ADMIN_INVENTORY: '/admin/inventory',
    ADMIN_REPORTS: '/admin/reports',
    ADMIN_SETTINGS: '/admin/settings',
    
    // Búsqueda
    SEARCH: '/tienda/buscar',
  };