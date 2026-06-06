import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente contenedor de rutas protegidas.
 * Verifica si el usuario (empleado) ha iniciado sesión antes de mostrar la vista.
 * Si no hay sesión activa, lo redirige a la pantalla de Login.
 *
 * @component
 * @returns {JSX.Element} La vista hija solicitada o una redirección.
 */
export default function ProtectedRoute() {
    // Simulación: En un caso real, esto leería de un Contexto de Autenticación o JWT en localStorage
    const isAuthenticated = true; 

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}