// resources/js/Components/Sidebar.jsx
import { Link } from '@inertiajs/react';
import React from 'react';
import { ArchiveBoxIcon, LifebuoyIcon, DocumentTextIcon, ArrowLeftEndOnRectangleIcon, ChevronDoubleLeftIcon, HomeIcon } from '@heroicons/react/24/outline'; // Iconos llamativos

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

export default function Sidebar({ primaryColor }) {
    return (
        <div className={`flex flex-col h-full p-4 ${primaryColor}`}>
            {/* Logo o Título */}
            <div className="text-2xl font-bold text-white mb-8 border-b border-indigo-500/50 pb-4">
                <span className="block transition-transform duration-300 hover:scale-[1.05]">
                    **🚀 App Empresarial**
                </span>
            </div>

            {/* Opciones de Navegación */}
            <nav className="flex-1 space-y-2">
                {/* Estas rutas coinciden con los nombres definidos en web.php: 
                    'dashboard', 'inventario', 'mesa-de-ayuda', 'documentos' */}
                <NavItem href="dashboard" icon={HomeIcon}>Dashboard</NavItem>
                <NavItem href="inventario" icon={ArchiveBoxIcon}>Inventario</NavItem>
                <NavItem href="mesa-de-ayuda" icon={LifebuoyIcon}>Mesa de Ayuda</NavItem>
                <NavItem href="documentos" icon={DocumentTextIcon}>Documentos</NavItem>
            </nav>

            {/* Cerrar Sesión (al final) */}
            <div className="mt-auto pt-4 border-t border-indigo-500/50">
                <Link
                    // Usa el nombre de la ruta de cierre de sesión
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