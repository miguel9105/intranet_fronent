// js/Pages/GeneralConfig.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function GeneralConfig({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Configuración General (Admin)
                </h2>
            }
        >
            <Head title="Configuración" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Ajustes Globales del Sistema
                </h3>
                <p className="text-gray-600">
                    Esta vista es para definir parámetros y configuraciones que afectan a toda la aplicación.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border border-dashed border-yellow-300 rounded-lg">
                    <p className="text-sm text-yellow-700 font-medium">
                        **Contenido:** Formularios para cambiar logos, emails de contacto, ajustes de moneda, etc.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}