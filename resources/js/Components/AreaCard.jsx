// resources/js/Components/AreaCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function AreaCard({ title, description, icon }) {
    return (
        // Estilo basado en la imagen: borde ligero, sombra, y un efecto al pasar el mouse.
        <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center h-full">
            
            {/* Icono (Usaremos un placeholder, reemplázalo con un SVG o un componente de icono real) */}
            <div className="text-4xl text-gray-700 mb-4 p-3 border border-gray-300 rounded-full">
                {/* Puedes pasar el icono como prop 'icon' */}
                {icon || '🗂️'} 
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
                {title}
            </h3>
            
            {/* Descripción */}
            <p className="text-sm text-gray-500 flex-grow">
                {description}
            </p>
            
            {/* CTA/Enlace (Opcional) */}
            <Link 
                href="#" 
                className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium"
            >
                Ver detalles
            </Link>
        </div>
    );
}