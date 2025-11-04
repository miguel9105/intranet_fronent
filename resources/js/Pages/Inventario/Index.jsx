import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Inventario({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inventario" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
                        
                        <h2 className="text-4xl font-extrabold text-indigo-800 mb-6 border-b pb-4">
                            📦 Gestión de Inventario
                        </h2>
                        
                        <p className="text-gray-600 mb-8 text-lg">
                            Aquí se encuentran los detalles del stock actual, la gestión de entradas y salidas, y el seguimiento de activos.
                        </p>
                        
                        {/* Contenido Simulado de la Tabla de Inventario */}
                        <div className="p-6 bg-indigo-50 rounded-lg shadow-inner">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Tabla de Activos (Ejemplo)</h3>
                            <table className="min-w-full divide-y divide-indigo-200">
                                <thead className="bg-indigo-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Producto</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Cantidad</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">Laptop Empresarial</td>
                                        <td className="px-6 py-4 whitespace-nowrap">150</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Disponible</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">Monitor 27"</td>
                                        <td className="px-6 py-4 whitespace-nowrap">220</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Bajo Stock</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05]">
                                + Agregar Nuevo Producto
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}