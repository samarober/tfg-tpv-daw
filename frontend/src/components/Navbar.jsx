import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de barra de navegación superior.
 * Permite moverse entre las distintas secciones del TPV.
 *
 * @component
 * @returns {JSX.Element} Barra de navegación.
 */
export default function Navbar() {
    return (
        <nav style={{ padding: '15px', backgroundColor: '#0f172a', color: 'white', display: 'flex', gap: '15px' }}>
            <h3 style={{ margin: '0 20px 0 0', color: '#38bdf8' }}>TPV System</h3>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Terminal</Link>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', marginLeft: 'auto' }}>Cerrar Sesión</Link>
        </nav>
    );
}