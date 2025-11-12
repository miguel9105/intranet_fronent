// resources/js/Pages/Dashboard.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    HomeIcon, 
    ArchiveBoxIcon, 
    LifebuoyIcon, 
    CalendarDaysIcon, 
    ChartBarIcon,    
    ClipboardDocumentCheckIcon, 
    DocumentTextIcon, // Asegúrate de que este icono está importado
} from '@heroicons/react/24/outline';


// --- Componente de Tarjeta de Estadísticas (Se mantiene) ---
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

// --- Componente para Tarjeta de Objetivos (Se mantiene) ---
const GoalCard = ({ title, current, target, unit, colorClass }) => {
    const progress = Math.min(100, (current / target) * 100);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {current}
                        <span className="text-base font-normal text-gray-500"> / {target} {unit}</span>
                    </p>
                </div>
                <ChartBarIcon className={`w-8 h-8 ${colorClass}`} />
            </div>
            
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${colorClass}`} 
                        style={{ width: `${progress}%` }}
                        aria-valuenow={current}
                        aria-valuemin="0"
                        aria-valuemax={target}
                    ></div>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-1">{progress.toFixed(0)}% Completado</p>
            </div>
        </div>
    );
};

// --- Componente para Tareas y Anuncios (Ejemplo) ---
const TaskList = ({ tasks }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">✅ Tareas Pendientes</h3>
            <span className="text-sm font-bold text-indigo-600">{tasks.length}</span>
        </div>
        <ul className="space-y-3">
            {tasks.slice(0, 5).map((task, index) => (
                <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">Vence: {task.due}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

// --- Componente para Calendario y Cumpleaños (Ejemplo) ---
const CalendarAndBirthdays = ({ birthdays }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🗓️ Eventos y Cumpleaños</h3>
        <div className="space-y-4">
            {birthdays.map((b, index) => (
                <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                    <CalendarDaysIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.date} - ¡Cumpleaños!</p>
                    </div>
                </div>
            ))}
            <div className="text-center pt-2">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Ver Calendario Completo</a>
            </div>
        </div>
    </div>
);


export default function Dashboard({ auth }) {
    
    // Datos de ejemplo
    const stats = [
        { title: "Usuarios Activos", value: "1,200", icon: HomeIcon, colorClass: 'text-indigo-600' },
        { title: "Reportes Generados", value: "450", icon: DocumentTextIcon, colorClass: 'text-green-600' },
        { title: "Tickets Abiertos", value: "12", icon: LifebuoyIcon, colorClass: 'text-red-600' },
        { title: "Inventario Total", value: "8,900", icon: ArchiveBoxIcon, colorClass: 'text-yellow-600' },
    ];
    
    const companyGoals = [
        { title: "Reducción de Gastos", current: 5000, target: 10000, unit: 'USD', colorClass: 'bg-green-500' },
        { title: "Capacitaciones", current: 8, target: 12, unit: 'Módulos', colorClass: 'bg-blue-500' },
    ];

    const upcomingBirthdays = [
        { name: "Ana P. (Ventas)", date: "15 Nov" },
        { name: "Juan C. (IT)", date: "22 Nov" },
    ];

    const myTasks = [
        { title: "Revisar presupuesto Q4", due: "Hoy" },
        { title: "Aprobar vacaciones", due: "17 Nov" },
        { title: "Reunión de gerencia", due: "18 Nov" },
    ];

    return (
        <AuthenticatedLayout
            auth={auth} // Pasa el prop 'auth' al Layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard General</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* 1. Bienvenida */}
                <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-indigo-100">
                    <h1 className="text-3xl font-bold text-gray-800">
                        ¡Hola, {auth.user.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Tu rol actual: <span className="font-semibold text-indigo-600">
                            {/* Mostrar el array de roles unido por coma */}
                            {auth.user.role_names ? auth.user.role_names.join(', ') : 'Invitado'}
                        </span>.
                    </p>
                </div>

                {/* 2. Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* 3. Objetivos de la Empresa y Tareas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                     <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {companyGoals.map((goal, index) => (
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