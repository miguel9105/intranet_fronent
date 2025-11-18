// js/Pages/Dashboard.jsx (REVISADO)

import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // <-- Nueva importación del Layout
import { 
    CalendarDaysIcon, // Para el componente CalendarAndBirthdays
    ChartBarIcon,    // StatCard
    ClipboardDocumentCheckIcon, // TaskList
    DocumentTextIcon, // StatCard
    CubeIcon, // StatCard
    UsersIcon, // StatCard
} from '@heroicons/react/24/outline';


// StatCard (Mantenido)
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

// GoalCard (Mantenido)
const GoalCard = ({ title, current, target, unit, colorClass }) => {
    const progress = Math.min(100, (current / target) * 100);
    const progressBarStyle = { width: `${progress}%` };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h4 className="text-md font-semibold text-gray-700">{title}</h4>
            <p className="text-2xl font-bold mt-1 text-gray-900">
                {current.toLocaleString()} / {target.toLocaleString()} {unit}
            </p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${colorClass}`} 
                    style={progressBarStyle}
                ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-right">
                Progreso: {Math.round(progress)}%
            </p>
        </div>
    );
};

// TaskList SIMPLIFICADO (Mantenido)
const TaskList = ({ tasks }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Mis Tareas Pendientes</h3>
        <ul className="space-y-3">
            {tasks.slice(0, 3).map((task, index) => (
                <li key={index} className="flex items-start text-gray-700">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">Vence: {task.due}</p>
                    </div>
                </li>
            ))}
        </ul>
        {tasks.length === 0 && <p className="text-gray-500">¡No tienes tareas pendientes!</p>}
    </div>
);

// CalendarAndBirthdays SIMPLIFICADO (Mantenido)
const CalendarAndBirthdays = ({ birthdays }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Calendario & Eventos</h3>
        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-2">Próximos Cumpleaños ({birthdays.length})</h4>
                <ul className="space-y-2 text-sm">
                    {birthdays.slice(0, 2).map((b, index) => (
                        <li key={index} className="flex justify-between text-gray-600">
                            <span>🎂 {b.name}</span>
                            <span className="font-medium text-indigo-600">{b.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-sm text-gray-500">Ver Calendario Completo...</p>
        </div>
    </div>
);


// -----------------------------------------------------------
// DATOS DE EJEMPLO PARA EL DASHBOARD (Mantenidos)
// -----------------------------------------------------------

const statData = [
    { title: 'Clientes Activos', value: '1.245', icon: UsersIcon, colorClass: 'text-green-500' },
    { title: 'Documentos Pendientes', value: '42', icon: DocumentTextIcon, colorClass: 'text-red-500' },
    { title: 'Inventario Disponible', value: '256', icon: CubeIcon, colorClass: 'text-indigo-500' },
    { title: 'Metas Trimestrales', value: '85%', icon: ChartBarIcon, colorClass: 'text-yellow-500' },
];

const goalsData = [
    { title: 'Ventas del Mes', current: 15000, target: 20000, unit: 'USD', colorClass: 'bg-green-500' },
    { title: 'Tasa de Conversión', current: 12, target: 15, unit: '%', colorClass: 'bg-blue-500' },
];

const myTasks = [
    { title: 'Revisar contrato del cliente A', due: 'Mañana, 10:00 AM' },
    { title: 'Preparar informe trimestral', due: 'Viernes' },
    { title: 'Llamar al proveedor B', due: 'Hoy, 3:00 PM' },
];

const upcomingBirthdays = [
    { name: 'Ana M. Suárez (Gestor)', date: '18 Nov' },
    { name: 'Javier P. López (Asesor)', date: '2 Dic' },
];


// -----------------------------------------------------------
// COMPONENTE PRINCIPAL (Mantenido y simplificado)
// -----------------------------------------------------------

export default function Dashboard({ auth }) {
    
    // Obtener los datos del usuario para el saludo y la personalización
    const storedUserData = localStorage.getItem('user_data');
    let user = auth?.user || { name_user: 'Usuario' };

    if (storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            user = { ...user, ...userData };
        } catch (e) {
            console.error("Error al cargar user_data desde localStorage:", e);
        }
    }
    
    const userName = user.name_user || 'Usuario';
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                     Dashboard Principal
                </h2>
            }
        >
            {/* Si estás usando Inertia, esta etiqueta es importante */}
            <Head title="Dashboard" /> 

            <div className="space-y-8">
                {/* 1. Bienvenida Personalizada */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border-l-8 border-indigo-600">
                    <h1 className="text-3xl font-bold text-gray-800">
                        ¡Hola de nuevo, {userName}!
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Tu resumen de actividades y métricas clave para hoy.
                    </p>
                </div>

                {/* 2. Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statData.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            colorClass={stat.colorClass}
                        />
                    ))}
                </div>

                {/* 3. Objetivos y Tareas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     <div className="lg:col-span-2 space-y-6">
                        {goalsData.map((goal, index) => (
                            <GoalCard 
                                key={index}
                                title={goal.title}
                                current={goal.current}
                                target={goal.target}
                                unit={goal.unit}
                                colorClass={goal.colorClass}
                            />
                        ))}
                     </div>
                    <TaskList tasks={myTasks} />
                </div>

                {/* 4. Contenido Adicional: Gráficos y Calendario */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Gráfico de Tendencias */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Gráfico de Tendencias</h3>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Aquí se integraría tu componente de gráficos (ej. Chart.js o Recharts)
                            </p>
                        </div>
                    </div>

                    {/* Calendario y Cumpleaños */}
                    <CalendarAndBirthdays birthdays={upcomingBirthdays} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}