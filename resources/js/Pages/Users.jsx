// js/Pages/Users.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importación necesaria
import { Head } from '@inertiajs/react';

export default function Users({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Gestión de Usuarios (Admin)
                </h2>
            }
        >
            <Head title="Usuarios" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Módulo de Administración de Cuentas
                </h3>
                <p className="text-gray-600">
                    Esta vista es visible solo para el **Administrador** y permite la creación, edición y gestión de roles.
                </p>
                <div className="mt-4 p-4 bg-red-50 border border-dashed border-red-300 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">
                        **Contenido:** Aquí va la tabla con el CRUD de usuarios y la asignación de roles.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}