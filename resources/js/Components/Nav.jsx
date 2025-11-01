// resources/js/Components/Nav.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Nav() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 transition-shadow duration-300 hover:shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Marca */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-xl font-extrabold text-red-600 tracking-wider transition-colors duration-300 hover:text-red-800">
                                INTRANET
                            </span>
                        </Link>
                    </div>

                    {/* Links de Navegación (Centrados) */}
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex items-center">
                        <NavLink href={route('home')} active={route().current('home')}>Inicio</NavLink>
                        <NavLink href="#" active={false}>Chat</NavLink>
                        <NavLink href="#" active={false}>Formularios</NavLink>
                        <NavLink href="#" active={false}>Acerca de</NavLink>
                        <NavLink href={route('contact')} active={route().current('contact')}>Contacto</NavLink>
                    </div>

                    {/* Botones de Acción (Derecha) */}
                    <div className="flex items-center space-x-4">
                        
                        <Link 
                            href={route('login')}
                            // Animación: Escala ligeramente al pasar el mouse
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Ingresar
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NavLink = ({ href, active, children }) => {
    // Estilo con animación de subrayado sutil
    const classes = active
        ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-600 text-sm font-bold leading-5 text-gray-900 transition duration-300'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-red-600 hover:border-red-300 transition duration-300';
    
    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
};