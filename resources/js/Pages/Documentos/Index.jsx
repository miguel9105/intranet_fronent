// resources/js/Pages/Documentos/Index.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
// Importa el componente de procesamiento que ya creaste
import ReportProcessor from '@/Components/ReportProcessor'; 

export default function Documentos({ auth }) {
    
    // --- CAMBIOS: Extracción de Roles desde el prop 'auth' ---
    const userRoles = auth.user.role_names || []; 
    // Usamos el primer rol como una string de ejemplo para ReportProcessor
    const userRoleString = userRoles.length > 0 ? userRoles[0] : 'Invitado';
    // --------------------------------------------------------
    
    const headerColor = 'text-indigo-600'; 

    return (
        <AuthenticatedLayout
            auth={auth} 
            header={
                <h2 className={`font-semibold text-xl text-gray-800 leading-tight ${headerColor}`}>
                    Gestión de Documentos & Procesamiento de Reportes
                </h2>
            }
        >
            <Head title="Documentos" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        
                        {/* ℹ️ Renderiza tu componente con la string de rol */}
                        <ReportProcessor userRole={userRoleString} />

                        {/* Opcional: Mostrar la lista de roles en la página para depuración */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                             <h3 className="text-xl font-semibold text-gray-800">Archivos Recientes</h3>
                             <p className="text-gray-600 mt-2">
                                Lista de los últimos reportes generados y otros documentos importantes.
                             </p>
                            <p className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
                                **DEBUG:** Roles de Usuario: **{userRoles.join(', ')}**
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}