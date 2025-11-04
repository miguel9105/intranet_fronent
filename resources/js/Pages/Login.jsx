// resources/js/Pages/Auth/Login.jsx

import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, Link, useForm, router } from '@inertiajs/react'; 
import axios from 'axios'; 

// --- CONFIGURACIÓN CRÍTICA: URL DE TU API LOCAL ---
const API_BASE_URL = 'http://api.intranet.test'; 
const API_LOGIN_URL = `${API_BASE_URL}/api/users/login`; 

export default function Login({ status, canResetPassword }) {
    
    const { data, setData, processing, errors, reset, setError } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        // Limpia el campo de contraseña al montar el componente
        return () => {
            reset('password');
        };
    }, []);

    // ** FUNCIÓN SUBMIT: Llama a la API de Laravel Local **
    const submit = async (e) => {
        e.preventDefault();
        
        setError({});
        setData(prevData => ({ ...prevData, processing: true })); 

        try {
            // LLAMADA A LA API LOCAL CON AXIOS
            const response = await axios.post(API_LOGIN_URL, {
                email: data.email,
                password: data.password,
            });

            // MANEJO DEL ÉXITO Y DEL TOKEN 
            const token = response.data.access_token || response.data.token; 
            
           if (token) {
                localStorage.setItem('auth_token', token); 
                router.visit(route('dashboard'), { method: 'get' }); // <--- Redirección con Inertia
            } else {
                 setError('email', 'Inicio de sesión exitoso, pero el servidor no devolvió el token de autenticación.');
            }

        } catch (error) {
            // MANEJO DE ERRORES DETALLADO
            if (error.response) {
                const status = error.response.status;

                if (status === 422 && error.response.data.errors) {
                    // Errores de validación de la API
                    setError(error.response.data.errors);
                } else if (status === 401) {
                    // Credenciales incorrectas
                    setError('email', 'Las credenciales proporcionadas son incorrectas.');
                } else {
                    // Otro error del servidor
                    setError('email', `Error ${status}: Falló la comunicación con el servidor.`);
                }
            } else {
                // Error de red, CORS, o API no disponible
                console.error("Error de Conexión:", error);
                setError('email', 'Error de red. Asegúrate que la API local (8001) esté corriendo y CORS configurado.');
            }
        } finally {
             setData(prevData => ({ ...prevData, processing: false }));
        }
    };

    // Componente de Error nativo
    const FormError = ({ message }) => {
        return message ? (
            <span className="text-sm text-red-500 mt-2 block font-medium">
                {message}
            </span>
        ) : null;
    };

    return (
        // Utilizamos el GuestLayout, como lo solicitaste
        <GuestLayout> 
            <Head title="Iniciar Sesión" />

            {/* Contenedor Principal: Efecto de fondo sutil */}
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
                
                {/* --- CARD PRINCIPAL: ESTILO INNOVADOR (GLASSMORHPISM) --- */}
                <div className="relative z-10 w-full max-w-md backdrop-filter backdrop-blur-lg bg-white bg-opacity-80 p-8 md:p-10 rounded-2xl 
                                     shadow-xl border border-gray-200 transition duration-500 transform hover:shadow-2xl">

                    {/* Encabezado */}
                    <div className="text-center mb-10">
                        <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 shadow-md">
                            {/* Icono de llave o candado (simulación de icono) */}
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            Acceso Corporativo
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Tu Intranet segura, potenciada por Finansueños.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        
                        {/* Campo Email */}
                        <div className="mb-6">
                            {/* Input con estilo neumórfico suave */}
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full p-4 text-gray-700 bg-gray-50 border-none rounded-lg shadow-inner-custom placeholder-gray-400 
                                           focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                                autoComplete="username"
                                autoFocus={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Correo Electrónico Corporativo"
                                required
                            />
                            <FormError message={errors.email} />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-6">
                            {/* Input con estilo neumórfico suave */}
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full p-4 text-gray-700 bg-gray-50 border-none rounded-lg shadow-inner-custom placeholder-gray-400 
                                           focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Contraseña Segura"
                                required
                            />
                            <FormError message={errors.password} />
                        </div>

                        {/* Opciones Adicionales */}
                        <div className="flex justify-between items-center mb-8 text-sm">
                            <label className="flex items-center text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded-full border-gray-300 text-red-600 shadow-sm focus:ring-red-600 transition duration-150"
                                />
                                <span className="ml-2 text-sm">Mantenerme Conectado</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-red-600 hover:text-red-700 font-semibold transition duration-150"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        {/* Botón de Login (Estético de Contraste) */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full flex items-center justify-center bg-red-600 text-white font-bold rounded-lg py-3 shadow-red-500/50 text-lg
                                            transition duration-300 transform active:scale-[0.98] 
                                            ${processing 
                                                ? 'opacity-75 cursor-wait' 
                                                : 'hover:bg-red-700 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-300'
                                            }`} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        {/* Spinner de carga (simulación Tailwind) */}
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Procesando Acceso...
                                    </>
                                ) : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                    
                    {/* Sección de Soporte */}
                    <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                        Para soporte técnico, llama al 555-FINANSUEÑOS.
                    </div>
                </div>
            </div>
            
            {/* Clases CSS personalizadas para el efecto neumórfico sutil */}
            <style jsx>{`
                .shadow-inner-custom {
                    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.05), 
                                inset -1px -1px 3px rgba(255, 255, 255, 0.9);
                }
            `}</style>
        </GuestLayout>
    );
}