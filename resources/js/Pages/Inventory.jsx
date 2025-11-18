// js/Pages/Inventory.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Inventory({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Inventario de Productos (Operaciones)
                </h2>
            }
        >
            <Head title="Inventario" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Gestión de Stock y Almacén
                </h3>
                <p className="text-gray-600">
                    Esta vista es accesible por los roles de **Operaciones** (Administrativo, Gestor y Administrador).
                </p>
                <div className="mt-4 p-4 bg-blue-50 border border-dashed border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                        **Contenido:** Listado de productos, filtros de stock, y botones para movimientos de entrada/salida.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}