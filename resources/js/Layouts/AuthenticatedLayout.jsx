// js/Layouts/AuthenticatedLayout.jsx (CÓDIGO CORREGIDO)

import React, { useState, useEffect, useCallback } from 'react';
// IMPORTACIÓN CORREGIDA: Se añade 'usePage' para verificar la URL actual
import { Head, Link, usePage } from '@inertiajs/react'; 
import { 
    HomeIcon, 
    ArchiveBoxIcon, 
    LifebuoyIcon, 
    ArrowLeftEndOnRectangleIcon,
    UsersIcon, 
    ClipboardIcon, 
    BriefcaseIcon, 
    DocumentTextIcon, 
} from '@heroicons/react/24/outline';


// --- Definición de Roles y Funciones de Ayuda (MANDATORIO) ---
const ROL_ADMINISTRADOR = 'Administrador';
const ROL_GESTOR = 'Gestor';
const ROL_ADMINISTRATIVO = 'Administrativo';
const ROL_ASESOR = 'Asesor';

const hasAnyRole = (userRoles, rolesRequired) => {
    if (!userRoles || userRoles.length === 0) return false;
    const required = Array.isArray(rolesRequired) ? rolesRequired : [rolesRequired];
    const lowerUserRoles = userRoles.map(role => role.toLowerCase());
    const lowerRequiredRoles = required.map(role => role.toLowerCase());
    return lowerUserRoles.some(role => lowerRequiredRoles.includes(role));
};


// --- Componente de Enlace de Navegación CORREGIDO (Ahora funciona) ---
const NavItem = ({ href, children, icon: Icon }) => {
    // USAR usePage para obtener la URL actual y determinar si el enlace es activo
    const { url } = usePage();
    // Comprueba si la URL actual comienza con el href del enlace.
    const isActive = url.startsWith(`/${href}`); 

    return (
        // CAMBIO CRÍTICO: Reemplazar <div> por <Link>
        <Link 
            href={`/${href}`} // Asegura que el href sea un path absoluto (/dashboard, /clientes, etc.)
            className={`flex items-center p-3 my-2 transition-colors duration-200 rounded-lg group ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-600 text-indigo-200'}`}
        >
            <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'}`} />
            <span className="font-semibold text-sm">{children}</span>
        </Link>
    );
};


// --- Componente Sidebar (Implementando Lógica de LocalStorage) ---
const Sidebar = ({ primaryColor = 'bg-indigo-700' }) => {
    
    // ... (El resto del código de Sidebar se mantiene igual) ...
    const [userRoles, setUserRoles] = useState([]);
    
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
            try {
                const userData = JSON.parse(storedUserData);
                setUserRoles(userData.roles || []); 
            } catch (e) {
                console.error("Error al parsear user_data de localStorage", e);
            }
        }
    }, []);
    
    const handleLogout = () => {
        // Lógica de logout simulada
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        // En una app real de Inertia, usarías Inertia.post(route('logout'))
        window.location.reload(); 
    }

    const rolesAdmin = ROL_ADMINISTRADOR;
    const rolesOperacion = [ROL_ADMINISTRATIVO, ROL_GESTOR, ROL_ADMINISTRADOR];
    const rolesAsesoria = [ROL_ASESOR, ROL_ADMINISTRADOR];

    return (
        <div className={`flex flex-col h-full p-4 ${primaryColor}`}>
            <div className="flex items-center justify-between h-16 mb-6">
                <span className="text-white text-xl font-bold tracking-wider">
                    FINANSUEÑOS
                </span>
            </div>

            <nav className="flex-1 space-y-2">
                
                {/* Dashboard (Visible para todos) */}
                {/* Se elimina el prop active={true} ya que NavItem lo calcula internamente */}
                <NavItem href="dashboard" icon={HomeIcon}>Dashboard</NavItem> 
                
                {/* === MÓDULO DE GESTIÓN (ROL: Administrador) === */}
                {hasAnyRole(userRoles, rolesAdmin) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Gestión Interna</div>
                        <NavItem href="gestion-usuarios" icon={UsersIcon}>Usuarios</NavItem> 
                        <NavItem href="configuracion" icon={ClipboardIcon}>Configuración General</NavItem>
                    </>
                )}

                {/* === MÓDULO DE OPERACIONES (ROLES: Administrativo, Gestor, Administrador) === */}
                {hasAnyRole(userRoles, rolesOperacion) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Operaciones</div>
                        <NavItem href="inventario" icon={ArchiveBoxIcon}>Inventario</NavItem>
                        <NavItem href="documentos" icon={DocumentTextIcon}>Documentos Legales</NavItem>
                    </>
                )}
                
                {/* === MÓDULO DE ASESORÍA/COMERCIAL (ROLES: Asesor, Administrador) === */}
                {hasAnyRole(userRoles, rolesAsesoria) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Comercial y Cartera</div>
                        <NavItem href="clientes" icon={BriefcaseIcon}>Clientes y Cartera</NavItem>
                        <NavItem href="agenda" icon={LifebuoyIcon}>Agenda de Asesor</NavItem>
                    </>
                )}
                
            </nav>

            {/* Cerrar Sesión */}
            <div className="mt-auto pt-4 border-t border-indigo-500/50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-red-300 transition-colors duration-200 rounded-lg hover:bg-red-700 hover:text-white group"
                >
                    <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-3 text-red-300 group-hover:text-white" />
                    <span className="font-semibold text-sm">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};

// --- Componente AuthenticatedLayout SIMPLIFICADO (Principal Exportación) ---
export default function AuthenticatedLayout({ header, children }) {
    
    // ... (El resto del código se mantiene igual) ...
    const storedUserData = localStorage.getItem('user_data');
    let user = { name_user: 'Usuario' };

    if (storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            user = { ...user, ...userData };
        } catch (e) {
            console.error("Error al cargar user_data desde localStorage:", e);
        }
    }

    const userName = user.name_user || 'Usuario';

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="hidden md:block w-64 fixed top-0 left-0 h-full">
                <Sidebar /> 
            </div>
            
            {/* Contenido Principal */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
                
                {/* Contenido */}
                <main className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};