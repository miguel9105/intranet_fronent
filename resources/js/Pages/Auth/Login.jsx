// resources/js/Pages/Auth/Login.jsx

import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/* Contenedor Principal: Fondo sutil con el logo de Finansueños */}
            <div className="min-h-screen flex items-center justify-center p-4">
                
                {/* Fondo Sutil del Logo */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-5 animate-fade-in-slow"
                    style={{ backgroundImage: "url('/images/logos/finansueños.png')" }} // <-- Reemplaza por la ruta de tu logo
                ></div>
                
                {/* Card de Login Centrada */}
                <div className="relative z-10 w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-red-600 
                                transition duration-500 transform hover:scale-[1.01] animate-fade-in-up animate-delay-200">

                    {/* Encabezado Empresarial */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Acceso Corporativo
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Ingresa tus credenciales para acceder a la Intranet.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Campo Email */}
                        <div className="mb-4 animate-fade-in-up animate-delay-300">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 focus:border-red-600 focus:ring-red-600 transition duration-150"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Correo Electrónico"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-6 animate-fade-in-up animate-delay-400">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 focus:border-red-600 focus:ring-red-600 transition duration-150"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Contraseña"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Opciones Adicionales */}
                        <div className="flex justify-between items-center mb-6 text-sm">
                            <label className="flex items-center text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-600"
                                />
                                <span className="ml-2 text-sm">Recordarme</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-red-600 hover:text-red-800 transition duration-150 ease-in-out font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        {/* Botón de Login */}
                        <div className="animate-fade-in-up animate-delay-500">
                            <PrimaryButton 
                                className="w-full justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500 py-2.5 transition duration-300 transform hover:scale-[1.01]" 
                                disabled={processing}
                            >
                                Iniciar Sesión
                            </PrimaryButton>
                        </div>
                    </form>
                    
                    {/* Sección de Soporte (Toque Empresarial) */}
                    <div className="mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
                        ¿Problemas para ingresar? Contacta a Soporte Técnico.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}