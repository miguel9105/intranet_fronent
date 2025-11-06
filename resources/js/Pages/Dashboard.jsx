// resources/js/Pages/Dashboard/Index.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { HomeIcon, ArchiveBoxIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

// Componente de Tarjeta de Estadísticas
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
            {Icon && (
                <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                </div>
            )}
        </div>
        <p className="mt-1 text-4xl font-extrabold text-gray-900">{value}</p>
    </div>
);

// Página Principal del Dashboard
export default function Dashboard({ auth }) {
    // Los datos del usuario vienen del prop 'auth'
    const userName = auth.user.name.split(' ')[0];
    
    // Ejemplo de datos (normalmente vendrían de un prop o de una llamada API)
    const stats = [
        { title: 'Inventario Total', value: '4,500', icon: ArchiveBoxIcon, colorClass: 'text-blue-600' },
        { title: 'Tickets Abiertos', value: '12', icon: LifebuoyIcon, colorClass: 'text-red-600' },
        { title: 'Usuarios Conectados', value: '87', icon: HomeIcon, colorClass: 'text-green-600' },
    ];
    
    return (
        // El prop 'auth' es pasado automáticamente desde Laravel
        <AuthenticatedLayout
            auth={auth} 
            header={'Panel Principal'}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    ¡Hola, {userName}! Tienes el control total.
                </h2>

                {/* Grid de Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            colorClass={stat.colorClass}
                        />
                    ))}
                </div>

                {/* Contenido Adicional (Ejemplo) */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Gráfico de Tendencias
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">
                            Aquí se integraría tu componente de gráficos (ej. Chart.js o Recharts)
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}