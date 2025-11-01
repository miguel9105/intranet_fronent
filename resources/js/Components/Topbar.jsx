// resources/js/Components/Topbar.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaUserCircle, FaBell, FaCog } from 'react-icons/fa'; // Necesitas react-icons

export default function Topbar({ user }) {
    const { auth } = usePage().props;

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-30">
            {/* Sección Izquierda (vacía en la imagen, podrías poner un logo o nombre del módulo) */}
            <div>
                {/* <span className="text-xl font-bold text-gray-800">Nombre del Módulo</span> */}
            </div>

            {/* Sección Derecha: Nombre de Usuario y Acciones */}
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                    <FaUserCircle className="text-gray-500 text-2xl" />
                    <span className="font-semibold text-gray-700">{auth.user.name || 'Usuario'}</span>
                </div>

                <button className="text-gray-500 hover:text-red-600 transition">
                    <FaBell className="text-xl" />
                </button>
                
                <Link href="#" className="text-gray-500 hover:text-red-600 transition">
                    <FaCog className="text-xl" />
                </Link>
                
                {/* Menú de Usuario (similar al de Breeze, aquí simplificado) */}
                <div className="relative">
                    {/* Puedes añadir un Dropdown de React aquí para más opciones de usuario */}
                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                        {/* <img className="h-8 w-8 rounded-full object-cover" src="/path/to/avatar.jpg" alt={user.name} /> */}
                        <div className="ml-1">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}