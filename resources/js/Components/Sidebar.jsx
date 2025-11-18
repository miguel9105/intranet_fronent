// // resources/js/Components/Sidebar.jsx

// import { Link, usePage } from '@inertiajs/react'; 
// import React from 'react';
// import { 
//     ArchiveBoxIcon, 
//     LifebuoyIcon, 
//     DocumentTextIcon, 
//     ArrowLeftEndOnRectangleIcon, 
//     HomeIcon,
//     UsersIcon,         
//     ClipboardIcon,     
//     BriefcaseIcon,     
//     ChartBarIcon, 
// } from '@heroicons/react/24/outline'; 

// // -----------------------------------------------------------
// // Componente de Enlace de Navegación (sin cambios)
// // -----------------------------------------------------------
// const NavItem = ({ href, active, children, icon: Icon }) => {
//     // Usamos el nombre de la ruta para verificar si está activo
//     const isActive = active || route().current(href); 
//     const baseClasses = "flex items-center p-3 my-2 transition-colors duration-200 rounded-lg hover:bg-indigo-600 group";
//     const activeClasses = isActive ? "bg-indigo-600 shadow-md transform scale-[1.02]" : "hover:shadow-md";

//     return (
//         <Link 
//             // Usa route(href) donde 'href' es el nombre de la ruta (ej: 'inventario')
//             href={route(href)} 
//             className={`${baseClasses} ${activeClasses} ${isActive ? 'text-white' : 'text-indigo-200'}`}
//         >
//             <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'}`} />
//             <span className="font-semibold text-sm">{children}</span>
//         </Link>
//     );
// };

// // --- FUNCIÓN DE UTILIDAD PARA VERIFICACIÓN DE ROLES ---
// // Verifica si el usuario tiene AL MENOS UNO de los roles requeridos
// const hasAnyRole = (userRoles, rolesRequired) => {
//     if (!userRoles || userRoles.length === 0) return false;
//     // Asegura que rolesRequired sea un array
//     const required = Array.isArray(rolesRequired) ? rolesRequired : [rolesRequired];
//     // Comprueba si algún rol del usuario está en la lista de requeridos
//     return userRoles.some(role => required.includes(role));
// };


// // -----------------------------------------------------------
// // Componente Principal Sidebar (con la lógica de roles)
// // -----------------------------------------------------------
// export default function Sidebar({ primaryColor = 'bg-indigo-700' }) {
    
//     // --- LECTURA CRÍTICA DE ROLES ---
//     const { auth } = usePage().props;
    
//     // CORRECCIÓN: Leer la propiedad 'role_names' (como se comparte desde Laravel)
//     // El UserController.php utiliza el accessor 'role_names' que devuelve un array de nombres de roles
//     const userRoles = auth.user ? auth.user.role_names : []; 
//     console.log(userRoles);
//     // ---------------------------------
    
//     // Roles específicos del proyecto (CORREGIDOS a Mayúscula Inicial)
//     const ROL_ADMINISTRADOR = 'Administrador';
//     const ROL_GESTOR = 'Gestor'; // <-- CORREGIDO
//     const ROL_ADMINISTRATIVO = 'Administrativo'; // <-- CORREGIDO
//     const ROL_ASESOR = 'Asesor'; // <-- CORREGIDO

//     return (
//         <div className={`flex flex-col h-full p-4 ${primaryColor}`}>
//             {/* Logo o Título */}
//             <div className="flex items-center justify-between h-16 mb-6">
//                 <span className="text-white text-xl font-bold tracking-wider transition-transform duration-300 hover:scale-[1.05]">
//                     **🚀 App Empresarial**
//                 </span>
//             </div>

//             {/* Opciones de Navegación */}
//             <nav className="flex-1 space-y-2">
//                 <NavItem href="dashboard" icon={HomeIcon}>Dashboard</NavItem>
                
//                 {/* === ADMINISTRACIÓN (ROL: Administrador) === */}
//                 {hasAnyRole(userRoles, ROL_ADMINISTRADOR) && (
//                     <>
//                         <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Administración</div>
//                         <NavItem href="gestion-usuarios" icon={UsersIcon}>Usuarios</NavItem>
//                         <NavItem href="configuracion" icon={ClipboardIcon}>Configuración Sistema</NavItem>
//                     </>
//                 )}

//                 {/* === GESTIÓN (ROLES: Administrador, Gestor) === */}
//                 {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_GESTOR]) && (
//                     <>
//                         <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Gestión Empresarial</div>
//                         <NavItem href="reportes" icon={ChartBarIcon}>Reportes Gerenciales</NavItem>
//                         <NavItem href="proyectos" icon={ArchiveBoxIcon}>Gestión de Proyectos</NavItem>
//                     </>
//                 )}
                
//                 {/* === TAREAS OPERATIVAS (ROLES: Administrador, Gestor, Administrativo, Asesor) === */}
//                 {/* Nota: Se incluye Asesor aquí basándose en la necesidad común de acceder a estas rutas */}
//                 {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_GESTOR, ROL_ADMINISTRATIVO, ROL_ASESOR]) && (
//                     <>
//                         <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Operaciones</div>
//                         <NavItem href="inventario" icon={ArchiveBoxIcon}>Inventario</NavItem>
//                         <NavItem href="documentos" icon={DocumentTextIcon}>Documentos Legales</NavItem>
//                     </>
//                 )}
                
//                 {/* === COMERCIAL (ROLES: Administrador, Asesor) === */}
//                 {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_ASESOR]) && (
//                     <>
//                         <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Comercial</div>
//                         <NavItem href="clientes" icon={BriefcaseIcon}>Clientes y Cartera</NavItem>
//                         <NavItem href="agenda" icon={LifebuoyIcon}>Agenda de Asesor</NavItem>
//                     </>
//                 )}

//             </nav>

//             {/* Cerrar Sesión (al final) */}
//             <div className="mt-auto pt-4 border-t border-indigo-500/50">
//                 <Link
//                     href={route('logout')}
//                     method="post"
//                     as="button"
//                     className="w-full flex items-center p-3 text-red-300 transition-colors duration-200 rounded-lg hover:bg-red-700 hover:text-white group"
//                 >
//                     <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-3 text-red-300 group-hover:text-white" />
//                     <span className="font-semibold text-sm">Cerrar Sesión</span>
//                 </Link>
//             </div>
//         </div>
//     );
// }