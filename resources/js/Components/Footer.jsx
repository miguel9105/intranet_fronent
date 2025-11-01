// resources/js/Components/Footer.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
// Importamos iconos para las redes sociales
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaSearch, FaCogs, FaSitemap } from 'react-icons/fa'; // Necesitas instalar react-icons

// Sub-componente simple para los enlaces en el footer
const FooterLink = ({ href, children }) => (
    <li>
        <Link 
            href={href} 
            className="text-gray-400 hover:text-red-500 transition duration-200 ease-in-out text-sm block py-1"
        >
            {children}
        </Link>
    </li>
);

// Componente para los iconos de utilidad/sociales
const IconWrapper = ({ children }) => (
    <span className="p-3 border border-gray-700 rounded-full text-lg cursor-pointer hover:bg-gray-800 hover:text-red-500 transition duration-300">
        {children}
    </span>
);

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Contenedor Superior (Iconos de Utilidad y Social) */}
                <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-gray-800 mb-8 space-y-6 md:space-y-0">
                    
                    {/* Logo/Marca */}
                    <div className="text-2xl font-extrabold text-red-600 tracking-wide">
                        ElectroCréditos
                    </div>

                    {/* Iconos de Utilidad */}
                    <div className="flex space-x-4 text-gray-400">
                        <IconWrapper><FaSearch /></IconWrapper>
                        <IconWrapper><FaCogs /></IconWrapper>
                        <IconWrapper><FaSitemap /></IconWrapper>
                    </div>

                    {/* Iconos Sociales */}
                    <div className="flex space-x-6 text-gray-400">
                        <IconWrapper><FaFacebook /></IconWrapper>
                        <IconWrapper><FaInstagram /></IconWrapper>
                        <IconWrapper><FaYoutube /></IconWrapper>
                        <IconWrapper><FaLinkedin /></IconWrapper>
                    </div>
                </div>

                {/* Grid de Enlaces de Navegación del Footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Columna 1: Utilities */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-500 pb-1 inline-block">Utilities</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Mi Cuenta</FooterLink>
                            <FooterLink href="#">Facturación</FooterLink>
                            <FooterLink href="#">Blog/Writing</FooterLink>
                            <FooterLink href="#">Online Scheduling</FooterLink>
                            <FooterLink href="#">Team Collaboration</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 2: Explore */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-500 pb-1 inline-block">Explore</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Docs</FooterLink>
                            <FooterLink href="#">Pricing</FooterLink>
                            <FooterLink href="#">Design System</FooterLink>
                            <FooterLink href="#">Integrations</FooterLink>
                            <FooterLink href="#">Teams</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-500 pb-1 inline-block">Resources</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">News</FooterLink>
                            <FooterLink href="#">Learn Code</FooterLink>
                            <FooterLink href="#">DevStream</FooterLink>
                            <FooterLink href="#">Reference Library</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 4: Legal/Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-500 pb-1 inline-block">Legal & Contacto</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Términos</FooterLink>
                            <FooterLink href="#">Privacidad</FooterLink>
                            <FooterLink href="#">Soporte</FooterLink>
                            <FooterLink href="#">Oficinas</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Copyright/Derechos */}
                <div className="mt-12 text-center text-gray-600 text-xs border-t border-gray-800 pt-6">
                    &copy; {new Date().getFullYear()} ElectroCréditos. Todos los derechos reservados. Desarrollado con Laravel & React.
                </div>
            </div>
        </footer>
    );
}