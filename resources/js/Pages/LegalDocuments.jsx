// js/Pages/LegalDocuments.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function LegalDocuments({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Documentos Legales (Operaciones)
                </h2>
            }
        >
            <Head title="Documentos" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Repositorio y Control de Contratos
                </h3>
                <p className="text-gray-600">
                    Aquí se suben y organizan los documentos clave relacionados con las operaciones y clientes.
                </p>
                <div className="mt-4 p-4 bg-blue-50 border border-dashed border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                        **Contenido:** Subida de archivos, tabla con vencimientos de contratos y buscador.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}