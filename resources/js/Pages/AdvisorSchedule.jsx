// js/Pages/AdvisorSchedule.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdvisorSchedule({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Agenda de Asesor (Comercial)
                </h2>
            }
        >
            <Head title="Agenda" />

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Calendario de Citas y Reuniones
                </h3>
                <p className="text-gray-600">
                    Herramienta para que los **Asesores** organicen sus reuniones y tareas diarias.
                </p>
                <div className="mt-4 p-4 bg-green-50 border border-dashed border-green-300 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                        **Contenido:** Vista de calendario (día/semana/mes) y formulario para crear eventos.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}