import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    HomeIcon, 
    ArchiveBoxIcon, 
    LifebuoyIcon, 
    CalendarDaysIcon, // Nuevo icono para el calendario
    ChartBarIcon,    // Nuevo icono para objetivos
    NewspaperIcon,   // Nuevo icono para anuncios
} from '@heroicons/react/24/outline';

// --- Componente de Tarjeta de Estadísticas (Se mantiene igual) ---
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

// --- Componente para Tarjeta de Objetivos ---
const GoalCard = ({ title, current, target, unit, colorClass }) => {
    const progress = Math.min(100, (current / target) * 100);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {current.toLocaleString()} / {target.toLocaleString()} 
                        <span className="text-sm font-medium text-gray-500 ml-1">{unit}</span>
                    </p>
                </div>
                <ChartBarIcon className={`w-8 h-8 ${colorClass} opacity-75`} />
            </div>
            
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${colorClass}`} 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                    Progreso: **{progress.toFixed(1)}%**
                </p>
            </div>
        </div>
    );
};

// --- Componente para Calendario y Cumpleaños ---
const CalendarAndBirthdays = ({ birthdays }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <CalendarDaysIcon className="w-6 h-6 mr-2 text-indigo-600" /> 
            Calendario & Cumpleaños
        </h3>
        
        {/* Simulación de un Calendario (Puedes reemplazarlo con un componente real) */}
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-4">
             <p className="text-gray-500">Vista del mes actual</p>
        </div>

        <h4 className="text-lg font-medium text-gray-800 mb-2">Próximos Cumpleaños 🥳</h4>
        <ul className="space-y-2">
            {birthdays.map((bday, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-900 font-medium">{bday.name}</span>
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        {bday.date}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

// --- Componente para Carrusel de Anuncios (Simplificado para el ejemplo) ---
const AnnouncementCarousel = ({ announcements }) => {
    // Aquí se implementaría la lógica de un carrusel (ej. estado de índice, botones de navegación)
    // Para este ejemplo, solo mostramos el primer anuncio.

    if (announcements.length === 0) return null;

    const currentAnnouncement = announcements[0]; // Mostrar solo el primero por simplicidad

    return (
        <div className="bg-indigo-600 p-8 rounded-2xl shadow-lg text-white mb-12 flex items-center justify-between transition duration-300 hover:bg-indigo-700">
            <NewspaperIcon className="w-10 h-10 mr-4 opacity-75 hidden sm:block" />
            <div>
                <p className="text-sm font-light uppercase opacity-90">Anuncio Destacado ({announcements.length} en total)</p>
                <h3 className="text-2xl font-bold mt-1">{currentAnnouncement.title}</h3>
                <p className="mt-2 text-sm opacity-90">{currentAnnouncement.content.substring(0, 100)}...</p>
                <button className="mt-3 text-sm font-semibold underline hover:no-underline">
                    Ver más &rarr;
                </button>
            </div>
        </div>
    );
};


// --- Página Principal del Dashboard ---
export default function Dashboard({ auth }) {
    const userName = auth.user.name.split(' ')[0];
    
    // --- DATOS DE EJEMPLO ---
    const stats = [
        { title: 'Inventario Total', value: '4,500', icon: ArchiveBoxIcon, colorClass: 'text-blue-600' },
        { title: 'Tickets Abiertos', value: '12', icon: LifebuoyIcon, colorClass: 'text-red-600' },
        { title: 'Usuarios Conectados', value: '87', icon: HomeIcon, colorClass: 'text-green-600' },
    ];
    
    const companyGoals = [
        { title: 'Nuevos Clientes Q4', current: 45, target: 100, unit: 'Clientes', colorClass: 'bg-teal-500' },
        { title: 'Reducción de Gastos', current: 15000, target: 50000, unit: 'USD', colorClass: 'bg-orange-500' },
        { title: 'Proyectos Entregados', current: 8, target: 10, unit: 'Proyectos', colorClass: 'bg-purple-500' },
    ];

    const upcomingBirthdays = [
        { name: 'Ana M. (Marketing)', date: 'Nov 15' },
        { name: 'Carlos R. (Ventas)', date: 'Nov 28' },
        { name: 'Elena S. (Soporte)', date: 'Dic 02' },
    ];

    const announcements = [
        { title: 'Lanzamiento de la Versión 3.0', content: 'La nueva versión de nuestro producto principal se lanzará el próximo lunes. ¡Prepárense para las nuevas características!', date: 'Nov 10' },
        { title: 'Cierre Fiscal Anual', content: 'Recuerden enviar todos los reportes de gastos antes del 30 de noviembre para el cierre fiscal. ¡No demoren!', date: 'Nov 05' },
    ];
    // --- FIN DATOS DE EJEMPLO ---
    
    return (
        <AuthenticatedLayout
            auth={auth} 
            header={'Panel Principal'}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    ¡Hola, **{userName}**! Tienes el control total.
                </h2>
                
                {/* 1. Carrusel de Noticias/Anuncios */}
                <AnnouncementCarousel announcements={announcements} />

                {/* 2. Grid de Tarjetas de Estadísticas */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">📊 Resumen Operacional</h3>
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

                {/* 3. Grid de Objetivos de la Empresa */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Objetivos Trimestrales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

                {/* 4. Contenido Adicional: Gráficos y Calendario */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Gráfico de Tendencias (se mantiene) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Gráfico de Tendencias</h3>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Aquí se integraría tu componente de gráficos (ej. Chart.js o Recharts)
                            </p>
                        </div>
                    </div>

                    {/* Calendario y Cumpleaños (Nuevo) */}
                    <CalendarAndBirthdays birthdays={upcomingBirthdays} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}