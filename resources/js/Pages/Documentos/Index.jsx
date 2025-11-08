import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function DocumentosIndex({ auth }) {
    // La prop 'auth' contiene la información del usuario logeado
    
    return (
        <AuthenticatedLayout
            user={auth.user} // Pasamos el usuario al Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Repositorio de Documentos 📄</h2>}
        >
            <Head title="Documentos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Bienvenido al Repositorio, {auth.user.name}.</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Encuentra aquí la documentación interna, manuales de usuario y archivos importantes.
                        </p>
                        
                        {/* Aquí iría el contenido específico: lista de archivos, opciones de subida/descarga. */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}