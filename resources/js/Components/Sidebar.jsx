// resources/js/Components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ user, functions }) {
    const [isOpen, setIsOpen] = useState(true); // Controla si el sidebar está abierto/cerrado

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside 
            className={`bg-red-700 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} 
            flex flex-col border-r border-red-800 shadow-xl relative z-40`}
        >
            {/* Botón para Abrir/Cerrar Sidebar */}
            <button 
                onClick={toggleSidebar}
                className="absolute top-4 right-[-1.5rem] bg-red-700 text-white rounded-full p-2 shadow-md z-50 transition-transform duration-300 hover:scale-110"
                aria-label={isOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
            >
                {isOpen ? '◀' : '▶'} {/* Icono simple para el toggle */}
            </button>

            {/* Logo o Título de la Aplicación */}
            <div className={`p-4 ${isOpen ? 'text-left' : 'text-center'} border-b border-red-800`}>
                <Link href={route('dashboard')}>
                    <span className={`font-extrabold text-2xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 absolute left-[-9999px]'}`}>
                        ElectroCréditos
                    </span>
                    <span className={`font-extrabold text-2xl transition-opacity duration-300 ${isOpen ? 'opacity-0 absolute left-[-9999px]' : 'opacity-100'}`}>
                        EC
                    </span>
                </Link>
            </div>

            {/* Nombre de Usuario (Solo visible si el sidebar está abierto) */}
            {user && (
                <div className={`p-4 text-center ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} transition-all duration-300 ease-in-out`}>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <small className="text-gray-300">{user.role || 'Rol no definido'}</small>
                </div>
            )}

            {/* Lista de Funciones / Navegación */}
            <nav className="flex-1 mt-4">
                <ul>
                    {functions.map((func) => (
                        <li key={func.id}>
                            <Link
                                href={func.href}
                                method={func.method || 'get'} // Para el botón de Logout
                                as="button" // Renderiza como botón para método POST
                                className={`flex items-center p-4 w-full text-left 
                                    hover:bg-red-600 transition duration-150 ease-in-out 
                                    ${route().current(func.id) ? 'bg-red-800 border-l-4 border-red-300' : ''}
                                    ${isOpen ? '' : 'justify-center'}`}
                            >
                                <span className="text-xl mr-3">{func.icon}</span> {/* Icono */}
                                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 absolute left-[-9999px]'}`}>
                                    {func.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Configuración inferior (opcional, como el icono de engranaje) */}
            <div className={`p-4 border-t border-red-800 ${isOpen ? 'text-left' : 'text-center'}`}>
                <Link href="#" className="flex items-center text-gray-300 hover:text-white transition">
                    <span className="text-xl mr-3">⚙</span>
                    <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 absolute left-[-9999px]'}`}>
                        Configuración
                    </span>
                </Link>
            </div>
        </aside>
    );
}