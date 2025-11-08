import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function InventarioIndex({ auth }) {
    // La prop 'auth' contiene la información del usuario logeado:
    // auth.user.id, auth.user.name, auth.user.email
    
    return (
        <AuthenticatedLayout
            user={auth.user} // Pasamos el usuario al Layout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Módulo de Inventario 📦</h2>}
        >
            <Head title="Inventario" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Bienvenido al Inventario, {auth.user.name}.</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Aquí podrás gestionar el stock, agregar nuevos productos y ver el historial de movimientos.
                        </p>
                        
                        {/* Aquí iría el contenido específico del inventario: tablas, formularios, etc. */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}