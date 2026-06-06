import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Vista de inicio de sesión para los empleados del TPV.
 *
 * @component
 * @returns {JSX.Element} Formulario de acceso.
 */
export default function Login() {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de acceso.
     * @param {React.FormEvent} e - Evento del formulario.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Autenticando empleado con PIN:', pin);
        // Redirigir al terminal tras "validar"
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Acceso Empleados</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="password" 
                    placeholder="Introduzca su PIN" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', textAlign: 'center' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#0f172a', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}