// resources/js/Layouts/DashboardLayout.jsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar'; // Componente Sidebar
import Topbar from '@/Components/Topbar'; // Componente Topbar (nuevo)
import FlashMessages from '@/Components/FlashMessages'; // Para mensajes de Laravel

export default function DashboardLayout({ children, title }) {
    const { auth } = usePage().props; // Para acceder a los datos de usuario de Laravel

    // Definición de las funciones disponibles para el sidebar, se pasarán a Sidebar.jsx
    // Estas son las funciones que aparecerían en el sidebar de la imagen (Inicio, Ubicacion, Cartera, etc.)
    const sidebarFunctions = [
        { id: 'home', name: 'Inicio', icon: '🏠', href: route('dashboard') },
        { id: 'location', name: 'Ubicación', icon: '📍', href: route('location.index') },
        { id: 'portfolio', name: 'Cartera', icon: '💰', href: route('portfolio.index') },
        { id: 'help', name: 'Ayuda', icon: '❓', href: route('help.index') },
        { id: 'inventory', name: 'Inventario', icon: '📦', href: route('inventory.index') },
        { id: 'logout', name: 'Cerrar Sesión', icon: '🚪', href: route('logout'), method: 'post' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Head title={title} />

            {/* Sidebar */}
            <Sidebar user={auth.user} functions={sidebarFunctions} />

            {/* Contenedor Principal de Contenido */}
            <div className="flex flex-col flex-1">
                {/* Topbar (header superior) */}
                <Topbar user={auth.user} />

                {/* Mensajes Flash de Laravel (opcional, pero recomendado) */}
                <FlashMessages />

                {/* Contenido de la Página Actual */}
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}