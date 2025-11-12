// resources/js/Components/Nav.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
// Importamos iconos
import { FaHome, FaComments, FaClipboardList, FaInfoCircle, FaPhone, FaSignInAlt } from 'react-icons/fa';

// --- Sub-componente NavLink (Tamaño de texto e icono aumentado) ---
const NavLink = ({ href, active, icon: Icon, children }) => {
    // Texto ahora es 'lg' y el padding es mayor
    const classes = active
        ? 'inline-flex items-center px-4 py-3 border-b-4 border-violet-600 text-lg font-black leading-5 text-yellow-300 bg-violet-800/10 transition duration-300'
        : 'inline-flex items-center px-4 py-3 border-b-4 border-transparent text-lg font-bold leading-5 text-gray-700 hover:text-violet-700 hover:border-red-600 transition duration-300';
    
    return (
        <Link href={href} className={classes}>
            {/* Ícono más grande (text-xl) */}
            {Icon && <Icon className="mr-3 text-xl" />} 
            {children}
        </Link>
    );
};
// ------------------------------------------

export default function Nav() {
    return (
        // Aumentamos la altura del hover shadow
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 
                        transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Aumentamos la altura de la barra a h-24 */}
                <div className="flex justify-between h-24"> 
                    
                    {/* 1. Logo/Marca: Ahora solo 'INTRANET' y más grande */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span 
                                // Texto más grande (text-4xl) y fuente más audaz
                                className="text-4xl font-black text-violet-900 tracking-widest 
                                           border-l-8 border-red-600 pl-4 transition-colors duration-300 hover:text-red-600"
                            >
                                INTRANET
                            </span>
                        </Link>
                    </div>

                    {/* 2. Links de Navegación (Centrados, con iconos y texto grandes) */}
                    <div className="hidden space-x-2 sm:-my-px sm:ml-10 sm:flex items-center">
                        <NavLink href={route('home')} active={route().current('home')} icon={FaHome}>
                            Inicio
                        </NavLink>
                        <NavLink href="#" active={false} icon={FaComments}>
                            Chat
                        </NavLink>
                        <NavLink href="#" active={false} icon={FaClipboardList}>
                            Mis Documentos
                        </NavLink>
                        <NavLink href="#" active={false} icon={FaInfoCircle}>
                            Acerca de
                        </NavLink>
                        <NavLink href={route('contact')} active={route().current('contact')} icon={FaPhone}>
                            Soporte
                        </NavLink>
                    </div>

                    {/* 3. Botón de Acción (Derecha): SOLO Ingresar, más prominente */}
                    <div className="flex items-center space-x-4">
                        
                        {/* Botón de Ingreso (Primario, tamaño extra grande) */}
                        <Link 
                            href={route('login')}
                            className="inline-flex items-center px-8 py-3 border border-transparent text-xl font-black rounded-full 
                                       text-white bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/60
                                       transition duration-300 ease-in-out transform hover:scale-110 ring-4 ring-red-300/50"
                        >
                            <FaSignInAlt className="mr-3 text-yellow-300 text-2xl" />
                            INGRESAR
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}