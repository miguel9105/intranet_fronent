// resources/js/Components/Sidebar.jsx

import { Link, usePage } from '@inertiajs/react'; // <-- ¡usePage es CRÍTICO para leer los props de autenticación!
import React from 'react';
import { 
    ArchiveBoxIcon, 
    LifebuoyIcon, 
    DocumentTextIcon, 
    ArrowLeftEndOnRectangleIcon, 
    HomeIcon 
} from '@heroicons/react/24/outline'; // Iconos llamativos

// -----------------------------------------------------------
// Componente de Enlace de Navegación (sin cambios)
// -----------------------------------------------------------
const NavItem = ({ href, active, children, icon: Icon }) => {
    // Usamos el nombre de la ruta para verificar si está activo
    const isActive = active || route().current(href); 
    const baseClasses = "flex items-center p-3 my-2 transition-colors duration-200 rounded-lg hover:bg-indigo-600 group";
    const activeClasses = isActive ? "bg-indigo-600 shadow-md transform scale-[1.02]" : "hover:shadow-md";

    return (
        <Link 
            // Usa route(href) donde 'href' es el nombre de la ruta (ej: 'inventario')
            href={route(href)} 
            className={`${baseClasses} ${activeClasses} ${isActive ? 'text-white' : 'text-indigo-200'}`}
        >
            <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'}`} />
            <span className="font-semibold text-sm">{children}</span>
        </Link>
    );
};

// -----------------------------------------------------------
// Componente Principal Sidebar (con la lógica de roles)
// -----------------------------------------------------------
export default function Sidebar({ primaryColor = 'bg-indigo-700' }) {
    
    // --- LECTURA CRÍTICA DE ROLES ---
    // 1. Obtener los props de la página actual, incluyendo 'auth'
    const { auth } = usePage().props;
    
    // 2. Leer el array de roles. Si no existe o es null, usamos un array vacío.
    const userRoles = auth.user.role_names || [];
    
    // 3. Condición lógica: Determinar si el usuario tiene el rol requerido para ver el enlace
    const esAdministradorOGestor = userRoles.includes('Administrador') || userRoles.includes('Gestor');
    // ---------------------------------
    
    return (
        <div className={`flex flex-col h-full p-4 ${primaryColor}`}>
            {/* Logo o Título */}
            <div className="flex items-center justify-between h-16 mb-6">
                <span className="text-white text-xl font-bold tracking-wider transition-transform duration-300 hover:scale-[1.05]">
                    **🚀 App Empresarial**
                </span>
            </div>

            {/* Opciones de Navegación */}
            <nav className="flex-1 space-y-2">
                <NavItem href="dashboard" icon={HomeIcon}>Dashboard</NavItem>
                <NavItem href="inventario" icon={ArchiveBoxIcon}>Inventario</NavItem>
                <NavItem href="mesa-de-ayuda" icon={LifebuoyIcon}>Mesa de Ayuda</NavItem>
                
                {/* --- APLICAR RESTRICCIÓN DE ROL --- */}
                {esAdministradorOGestor && (
                    <NavItem href="documentos" icon={DocumentTextIcon}>Documentos</NavItem>
                )}
            </nav>

            {/* Cerrar Sesión (al final) */}
            <div className="mt-auto pt-4 border-t border-indigo-500/50">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center p-3 text-red-300 transition-colors duration-200 rounded-lg hover:bg-red-700 hover:text-white group"
                >
                    <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-3 text-red-300 group-hover:text-white" />
                    <span className="font-semibold text-sm">Cerrar Sesión</span>
                </Link>
            </div>
        </div>
    );
}