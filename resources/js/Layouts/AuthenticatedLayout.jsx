// resources/js/Layouts/AuthenticatedLayout.jsx
import React from 'react';
import { Link, Head } from '@inertiajs/react';
import axios from 'axios'; 
import { HomeIcon, ArchiveBoxIcon, LifebuoyIcon, DocumentIcon, CogIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'; // Iconos

// Componente de Enlace de Navegación
const NavLink = ({ href, active, children, icon: Icon }) => {
    const baseClasses = "flex items-center p-3 rounded-xl transition duration-150 ease-in-out";
    const activeClasses = "bg-red-600 text-white shadow-md font-semibold";
    const inactiveClasses = "text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        >
            {Icon && <Icon className="w-5 h-5 mr-3" />}
            {children}
        </Link>
    );
};

// Componente Principal del Layout
export default function Authenticated({ auth, header, children }) {
    
    // Función para manejar el cierre de sesión: Elimina el token y redirige.
    const handleLogout = (e) => {
        e.preventDefault();
        
        // 1. Opcional: Llamar a la API de Laravel para revocar el token 
        // axios.post(route('api.logout_token_revocation')); 

        // 2. Eliminar el token de localStorage
        localStorage.removeItem('auth_token');
        
        // 3. Eliminar el header de Axios
        delete axios.defaults.headers.common['Authorization'];

        // 4. Redirigir al login (Inertia cargará la página pública)
        window.location.href = route('login'); 
    };

    const user = auth.user;

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, active: route().current('dashboard') },
        // ✅ Rutas nuevas integradas correctamente
        { name: 'Inventario', href: route('inventario'), icon: ArchiveBoxIcon, active: route().current('inventario') }, 
        { name: 'Mesa de Ayuda', href: route('mesa-de-ayuda'), icon: LifebuoyIcon, active: route().current('mesa-de-ayuda') }, 
        { name: 'Documentos', href: route('documentos'), icon: DocumentIcon, active: route().current('documentos') },
        { name: 'Configuración', href: '#', icon: CogIcon, active: false }, 
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex-shrink-0 flex items-center mb-10 border-b pb-4">
                    <div className="w-8 h-8 rounded-md bg-red-600 mr-3"></div>
                    <span className="ml-0 text-xl font-bold text-gray-800">Intranet App</span>
                </div>

                {/* Navegación Principal */}
                <nav className="flex-grow space-y-2">
                    {navigation.map((item) => (
                        <NavLink key={item.name} href={item.href} active={item.active} icon={item.icon}>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Sección de Usuario y Logout */}
                <div className="pt-4 mt-auto border-t">
                    <div className="flex items-center p-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                                {/* Muestra la primera letra del nombre */}
                                {user.name ? user.name.substring(0, 1) : 'U'}
                            </div>
                        </div>
                        <div className="ml-3 truncate">
                            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    
                    {/* Botón de Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 mt-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-200 transition duration-150"
                    >
                        <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-3" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                {header && (
                    <header className="bg-white shadow-sm sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                                {header}
                            </h2>
                        </div>
                    </header>
                )}

                {/* Contenido de la Página */}
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}