// js/Pages/Clients.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Clients({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Clientes y Cartera (Comercial)
                </h2>
            }
        >
            <Head title="Clientes" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    CRM Básico y Seguimiento
                </h3>
                <p className="text-gray-600">
                    Esta vista es accesible principalmente por los **Asesores** para gestionar su cartera.
                </p>
                <div className="mt-4 p-4 bg-green-50 border border-dashed border-green-300 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                        **Contenido:** Listado de clientes, filtros por estado (activo/moroso) y ficha de contacto.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}