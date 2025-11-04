import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function MesaDeAyuda({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mesa de Ayuda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
                        
                        <h2 className="text-4xl font-extrabold text-green-800 mb-6 border-b pb-4">
                            🛠️ Tickets de Soporte
                        </h2>
                        
                        <p className="text-gray-600 mb-8 text-lg">
                            Panel de control para la gestión de incidentes y solicitudes de los usuarios.
                        </p>
                        
                        {/* Contenido Simulado de Resumen de Tickets */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card de Tickets Pendientes */}
                            <div className="p-6 bg-red-100 border-l-4 border-red-600 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl">
                                <h3 className="text-3xl font-bold text-red-700">12</h3>
                                <p className="text-gray-600 mt-2">Tickets Pendientes</p>
                            </div>
                            
                            {/* Card de Tickets en Progreso */}
                            <div className="p-6 bg-yellow-100 border-l-4 border-yellow-600 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl">
                                <h3 className="text-3xl font-bold text-yellow-700">25</h3>
                                <p className="text-gray-600 mt-2">En Progreso</p>
                            </div>
                            
                            {/* Card de Tickets Cerrados */}
                            <div className="p-6 bg-green-100 border-l-4 border-green-600 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl">
                                <h3 className="text-3xl font-bold text-green-700">345</h3>
                                <p className="text-gray-600 mt-2">Cerrados (Mes)</p>
                            </div>
                        </div>

                        <button className="mt-8 px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-[1.05]">
                            Ver Todos los Tickets
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}