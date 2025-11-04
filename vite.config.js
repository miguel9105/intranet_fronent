import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        // Establece el puerto deseado (ej. 5173 es el predeterminado de Vite, pero puedes usar 3000)
        port: 3000, 
       
    }
});
