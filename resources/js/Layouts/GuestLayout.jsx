// resources/js/Layouts/GuestLayout.jsx
import React from 'react';
import Nav from '@/Components/Nav'; // Ubicación sugerida del componente Nav
import Footer from '@/Components/Footer'; // Ubicación sugerida del componente Footer

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* 1. Navbar */}
            <Nav />

            {/* 2. Contenido de la Página (Aquí se renderizará Home.jsx) */}
            <main className="flex-grow">
                {children}
            </main>

            {/* 3. Footer */}
            <Footer />
        </div>
    );
}