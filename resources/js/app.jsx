// resources/js/app.jsx
import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import axios from 'axios'; // ⚠️ IMPORTANTE: Asegúrate de importar axios

// =========================================================
// 🔑 CONFIGURACIÓN GLOBAL DEL TOKEN DE AUTENTICACIÓN
// =========================================================
const token = localStorage.getItem('auth_token');

if (token) {
    // Si hay un token, se adjunta al encabezado de Autorización (Bearer Token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    // Si no hay token al cargar la app, se limpia cualquier resto (opcional)
    delete axios.defaults.headers.common['Authorization'];
}
// =========================================================

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});