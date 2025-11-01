// resources/js/Pages/Contact.jsx

import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Nota: Debes crear la ruta y el controlador en Laravel para manejar este POST.
        post(route('contact.submit')); 
    };

    return (
        <GuestLayout>
            <Head title="Contacto" />

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                
                {/* Título Principal */}
                <header className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b-4 border-red-600 inline-block pb-1">
                        Contáctanos
                    </h1>
                    <p className="text-lg text-gray-600 mt-3">
                        Estamos listos para ayudarte. Envíanos un mensaje o encuentra nuestros datos de contacto.
                    </p>
                </header>

                {/* Grid Principal: Formulario (Izquierda) e Info/Imágenes (Derecha) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* COLUMNA IZQUIERDA: Formulario de Contacto */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in-up animate-delay-200">
                        <h2 className="text-2xl font-bold text-violet-800 mb-6">
                            Envía tu Consulta
                        </h2>
                        
                        {recentlySuccessful && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex items-center">
                                <FaCheckCircle className="mr-3 text-green-500" />
                                <p className="font-semibold">¡Mensaje enviado con éxito! Te responderemos pronto.</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre Completo"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:ring-red-600 transition"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:ring-red-600 transition"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Asunto"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:ring-red-600 transition"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Tu Mensaje..."
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:ring-red-600 transition"
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-[1.01]"
                                disabled={processing}
                            >
                                {processing ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: Datos de Contacto e Imagen */}
                    <div className="space-y-8 animate-fade-in-up animate-delay-300">
                        
                        {/* 1. Panel de Información de Contacto */}
                        <div className="bg-violet-700 text-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Nuestros Datos</h2>
                            
                            <ContactItem icon={<FaMapMarkerAlt />} title="Oficina Principal">
                                Av. Siempre Viva 742, Popayán, Colombia
                            </ContactItem>
                            
                            <ContactItem icon={<FaPhone />} title="Línea Directa">
                                (57) 602-555-1234
                            </ContactItem>
                            
                            <ContactItem icon={<FaEnvelope />} title="Soporte y Consultas">
                                soporte@intranet-finansuenos.com
                            </ContactItem>
                            
                            <ContactItem icon={<FaClock />} title="Horario de Atención">
                                Lunes a Viernes: 8:00 AM - 5:00 PM
                            </ContactItem>
                        </div>
                        
                        {/* 2. Imagen de Marca (Intranet) */}
                        <div className="relative overflow-hidden rounded-xl shadow-lg border-t-4 border-red-600 min-h-[250px] transition duration-500 transform hover:scale-[1.02]">
                            {/* Imagen representativa del 'back office' o 'intranet' */}
                            <img 
                                src="/images/intranet-contact-visual.jpg" 
                                alt="Equipo de trabajo usando la intranet"
                                className="w-full h-full object-cover opacity-80"
                            />
                            {/*  */}
                            <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                            <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
                                #IntranetFinanciera
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

// Sub-componente para ítems de contacto
const ContactItem = ({ icon, title, children }) => (
    <div className="flex mb-4 items-start space-x-4">
        <div className="flex-shrink-0 text-red-400 mt-1">{icon}</div>
        <div>
            <p className="font-semibold text-sm mb-0.5">{title}</p>
            <p className="text-gray-200 text-base">{children}</p>
        </div>
    </div>
);