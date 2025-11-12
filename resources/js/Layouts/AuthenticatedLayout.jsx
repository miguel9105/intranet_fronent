// resources/js/Layouts/AuthenticatedLayout.jsx
import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react'; // Importar router
import Sidebar from '@/Components/Sidebar'; // Asegúrate que la ruta sea correcta
import { ArrowLeftStartOnRectangleIcon, BellIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Iconos

// Componente Principal del Layout
export default function Authenticated({ auth, header, children }) {
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true); // Control de visibilidad del sidebar

    // Función para manejar el cierre de sesión: Elimina el token y redirige.
    const handleLogout = (e) => {
        e.preventDefault();
        
        // 1. Eliminar el token
        localStorage.removeItem('auth_token');

        // 2. Usar Inertia POST para llamar a la ruta de logout de Laravel
        router.post(route('logout'), {}, {
            onFinish: () => {
                // Redirigir al login después de que Laravel finalice la sesión
                router.visit(route('login'));
            }
        });
    };
    
    // --- ESTILOS DE LAYOUT ---
    const primaryColor = 'bg-indigo-700'; // Color primario del sidebar

    return (
        <div className="flex h-screen bg-gray-100 antialiased">
            <Head title={header ? header.props.children : 'Dashboard'} />

            {/* Overlay para móvil */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar (Menú Lateral) */}
            <div className={`fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-64 ${primaryColor}`}>
                <Sidebar primaryColor={primaryColor} />
            </div>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col overflow-auto">
                {/* Header (Barra Superior) */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            {/* Botón de toggle para móvil */}
                            <button
                                className="text-gray-500 focus:outline-none focus:text-gray-600 lg:hidden mr-3"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                            </button>
                            
                            {/* Título de la página */}
                            {header && (
                                <h1 className="font-semibold text-2xl text-gray-800 leading-tight">
                                    {header}
                                </h1>
                            )}
                        </div>

                        {/* Perfil y Notificaciones */}
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-gray-500 transition duration-150">
                                <BellIcon className="w-6 h-6" />
                            </button>

                            {/* Menú de Perfil (Dropdown simple) */}
                            <div className="relative group">
                                <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition duration-150">
                                    <UserCircleIcon className="w-8 h-8 text-indigo-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                                </div>

                                {/* Contenido del Dropdown */}
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 transform origin-top-right border border-gray-100">
                                    <div className="p-4">
                                        <div className="flex items-center mb-4 border-b pb-3">
                                            <UserCircleIcon className="w-10 h-10 text-indigo-600 mr-3" />
                                            <div>
                                                <p className="font-semibold text-gray-800 truncate">{user.name}</p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Contenido de la Página */}
                <div className="flex-1 overflow-auto">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}