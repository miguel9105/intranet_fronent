// resources/js/Components/EmpresaCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function EmpresaCard({ data }) {
    // Aseguramos que data incluya: name, description, logoUrl, websiteUrl
    return (
        // La tarjeta es más ancha y con un efecto de elevación al pasar el mouse
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-md w-full md:w-[48%] flex space-x-5 transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl">
            
            {/* Logo de la Empresa */}
            <div className="flex-shrink-0 w-16 h-16 border border-gray-300 p-1 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Integra la imagen del logo aquí */}
                {data.logoUrl ? (
                    <img 
                        src={data.logoUrl} 
                        alt={`Logo de ${data.name}`} 
                        className="w-full h-full object-contain" 
                    />
                ) : (
                    // Placeholder si no hay URL de logo
                    <span className="text-xl font-bold text-gray-500">{data.name.slice(0, 1)}</span>
                )}
            </div>

            {/* Contenido (Nombre, Descripción y Botón) */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {data.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                        {data.description}
                    </p>
                </div>

                {/* Botón de Enlace a la Página */}
                <a 
                    href={data.websiteUrl}
                    target="_blank" // Abrir en una nueva pestaña
                    rel="noopener noreferrer"
                    className="self-start inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-300"
                >
                    Visitar Sitio Web &rarr;
                </a>
            </div>
        </div>
    );
}