import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, router } from '@inertiajs/react';
import axios from 'axios';
import {
    ArrowLeftStartOnRectangleIcon,
    LockClosedIcon,
    AtSymbolIcon,
} from '@heroicons/react/24/outline';

// --- CONFIGURACIÓN DE API LOCAL ---
const API_BASE_URL = 'http://api.intranet.test';
const API_LOGIN_URL = `${API_BASE_URL}/api/users/login`;

export default function Login({ status }) {
    const { data, setData, processing, errors, reset, setError } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // --- FUNCIÓN SUBMIT ---
    const submit = async (e) => {
        e.preventDefault();
        setError({});
        setData((prev) => ({ ...prev, processing: true }));

        try {
            const response = await axios.post(API_LOGIN_URL, {
                email: data.email,
                password: data.password,
            });

            // Usamos el token devuelto por el UserController.php
            const token = response.data.token || response.data.access_token;

            if (token) {
                // 1. Guardar el token (necesario para futuras llamadas API)
                localStorage.setItem('auth_token', token);
                
                // 2. *** MODIFICACIÓN CLAVE: Simplificar el router.visit ***
                // Redirigir a la ruta web del dashboard. Laravel/Inertia se encarga
                // de cargar el usuario en el HandleInertiaRequests.php
                router.visit(route('dashboard'));
                
            } else {
                setError('general', 'Acceso denegado. Credenciales inválidas o token no recibido.');
                setData((prev) => ({ ...prev, processing: false }));
            }
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            if (apiErrors) {
                Object.keys(apiErrors).forEach((key) => {
                    setError(key, apiErrors[key][0]);
                });
            } else {
                setError(
                    'general',
                    error.response?.data?.message || 'Error de conexión o credenciales inválidas.'
                );
            }
            setData((prev) => ({ ...prev, processing: false }));
        }
    };

    return (
        <GuestLayout>
            <Head title="Acceso al Sistema" />

            {/* 🎥 Fondo con video colorido */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Video de fondo con color realzado */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover saturate-125 contrast-110 brightness-105"
                    src="/videos/intranet-bg.mp4" // 👈 Cambia por tu video en public/videos/
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Capa ligera para mejorar legibilidad */}
                <div className="absolute inset-0 bg-indigo-950/30 backdrop-blur-[1px]"></div>

                {/* Contenedor del formulario */}
                <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] text-white transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <ArrowLeftStartOnRectangleIcon className="w-12 h-12 text-indigo-200 mb-3" />
                        <h1 className="text-3xl font-extrabold text-white drop-shadow-md">Bienvenido</h1>
                        <p className="text-indigo-100 mt-2">Ingresa tus credenciales para continuar</p>
                    </div>

                    {/* Mensajes de error y estado */}
                    {errors.general && (
                        <div className="mb-4 font-medium text-sm text-red-200 p-3 bg-red-500/30 rounded-lg backdrop-blur-sm">
                            {errors.general}
                        </div>
                    )}
                    {status && <div className="mb-4 font-medium text-sm text-green-200">{status}</div>}

                    {/* Formulario */}
                    <form onSubmit={submit}>
                        {/* Email */}
                        <div className="mb-6">
                            <label
                                className="block text-sm font-medium text-indigo-100 mb-2"
                                htmlFor="email"
                            >
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-300" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/15 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition ${
                                        errors.email ? 'border-red-400' : 'border-white/20'
                                    }`}
                                    placeholder="tu@correo.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-200">{errors.email}</p>}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-8">
                            <label
                                className="block text-sm font-medium text-indigo-100 mb-2"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-300" />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white/15 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition ${
                                        errors.password ? 'border-red-400' : 'border-white/20'
                                    }`}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-200">{errors.password}</p>}
                        </div>

                        {/* Botón */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-xs text-indigo-200">
                        Para soporte técnico, llama al{' '}
                        <span className="font-semibold">555-FINANSUEÑOS</span>.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}