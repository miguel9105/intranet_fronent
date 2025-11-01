// resources/js/Pages/Home.jsx
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import AreaCard from '@/Components/AreaCard';
import EmpresaCard from '@/Components/EmpresaCard';
import { FaChartLine, FaHandshake, FaMoneyBillWave, FaUsers, FaCalculator, FaBuilding } from 'react-icons/fa'; // Necesitas instalar react-icons (npm install react-icons)

// --- DATOS SIMULADOS ---
const areas = [
    { title: 'Analistas Financieros', description: 'Ayuda a nuestros clientes a tomar decisiones financieras clave para su futuro. Un rol esencial.', icon: <FaChartLine /> },
    { title: 'Comercial', description: 'Sé la cara de la empresa. Atrae nuevos clientes y gestiona relaciones existentes con éxito.', icon: <FaHandshake /> },
    { title: 'Cartera', description: 'Garantiza la gestión eficiente de los activos crediticios y la salud financiera del portafolio.', icon: <FaMoneyBillWave /> },
    { title: 'Tesorería', description: 'Maneja el flujo de caja, las inversiones y los recursos monetarios de la organización.', icon: <FaCalculator /> },
    { title: 'Talento Humano', description: 'Construye y desarrolla el equipo de trabajo. Fomenta el crecimiento profesional y el bienestar.', icon: <FaUsers /> },
    { title: 'Nómina', description: 'Asegura el pago correcto y a tiempo de todos nuestros colaboradores, cumpliendo la normativa legal.', icon: <FaBuilding /> },
];

const empresas = [
    { 
        name: 'Finansueños', 
        logoUrl: '/images/logos/finansueños.png', // <-- Ruta a tu logo
        websiteUrl: 'https://www.finansueños.com', // <-- URL de destino
        description: 'Unimos la tecnología financiera y la experiencia humana para ofrecer soluciones ágiles de crédito.' 
    },
    { 
        name: 'ElectroCréditos del Cauca', 
        logoUrl: '/images/logos/electrocreditos.jpg', // <-- Ruta a tu logo
        websiteUrl: 'https://www.electrocreditoscauca.com', // <-- URL de destino
        description: 'Entidad líder en la región, enfocada en microcréditos para emprendedores y pymes.' 
    },
    // Añade más empresas aquí
];
// -----------------------

export default function Home(props) {
    return (
        <GuestLayout>
            {/* 1. SECCIÓN HERO / BANNER */}
<section
    className="relative bg-violet-900 text-white flex items-center justify-center p-20 min-h-[500px] overflow-hidden"
>
    {/* Imagen de Fondo Estilizada (Placeholder) */}
    {/* Animación: La imagen de fondo aparece con un ligero zoom */}
    <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 animate-fade-in-zoom" 
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
        {/* Asegúrate de que '/images/hero-bg.jpg' exista en tu carpeta public/images */}
    </div>
    
    {/* Contenido Centrado con animaciones de entrada individuales */}
    <div className="relative z-10 text-center max-w-2xl">
        {/* Título "Intranet" con animacion de entrada: Fade-in y desplazamiento hacia arriba */}
        <h1 className="text-7xl font-extrabold leading-tight mb-6 
                       text-yellow-300 drop-shadow-lg 
                       animate-fade-in-up animate-delay-100"> 
            INTRANET
        </h1>
        {/* Subtítulo (el que antes era h2, ahora lo hacemos más sutil o lo removemos si no encaja) */}
        {/* Si quieres algo similar al "enternet" original, puedes ponerlo aquí con menos énfasis */}
        <h2 className="text-2xl font-semibold uppercase tracking-widest text-pink-400 mb-2
                       animate-fade-in-up animate-delay-200">
            Tu portal de oportunidades
        </h2>
        
        {/* Párrafo con animacion de entrada: Fade-in y un poco de retraso */}
        <p className="text-lg mb-8 font-light opacity-80 max-w-xl mx-auto
                      animate-fade-in-up animate-delay-300">
            Descubre y potencia tu camino profesional. Conecta con el equipo y accede a recursos exclusivos.
        </p>
        
        {/* Botón con animacion de entrada: Fade-in y un último retraso */}
        <button 
            className="bg-red-600 text-white py-3 px-12 text-xl font-bold rounded-full 
                       shadow-xl hover:bg-red-700 transition duration-300 transform hover:scale-105 
                       animate-fade-in-up animate-delay-400"
        >
            Explorar ahora
        </button>
    </div>
</section>

            {/* 2. SECCIÓN ÁREAS CLAVE */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 border-b-2 border-red-300 inline-block pb-2">
                        Áreas Clave de Oportunidad
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {areas.map((area, index) => (
                            // Animación al aparecer
                            <div key={index} className="transition duration-500 ease-in-out transform hover:translate-y-[-5px] hover:shadow-2xl">
                                <AreaCard 
                                    title={area.title} 
                                    description={area.description} 
                                    icon={area.icon} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

          {/* 3. SECCIÓN EMPRESAS ASOCIADAS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 border-b-2 border-red-300 inline-block pb-2">
                    Empresas Asociadas
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {empresas.map((empresa, index) => (
                        <div 
                            key={index} 
                            // Eliminamos el hover:shadow de aquí y lo ponemos en la tarjeta interna para mejor control de la animación
                            className="w-full md:w-[48%]"
                        >
                            <EmpresaCard data={empresa} />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        </GuestLayout>
    );
}