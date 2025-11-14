import { usePage } from '@inertiajs/react';

export default function useAuth() {
    // Accede a los datos compartidos de Inertia
    const { auth } = usePage().props;
    const user = auth.user;
    
    // Función para verificar si el usuario tiene AL MENOS UNO de los roles requeridos
    const hasRole = (requiredRoles) => {
        if (!user) return false;
        
        // Convierte un solo rol a un arreglo para simplificar
        const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        
        // Verifica si la lista de roles del usuario incluye alguno de los roles requeridos
        return user.roles.some(userRole => rolesToCheck.includes(userRole));
    };

    return {
        user,
        isAuthenticated: !!user,
        hasRole,
    };
}