import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Añade un número al PIN (máximo 4 dígitos)
  const handleNumber = (num) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError(''); // Limpiamos el error si empieza a escribir de nuevo
    }
  };

  // Borra todo el PIN
  const handleClear = () => {
    setPin('');
    setError('');
  };

  // Envía la petición al backend
  const handleLogin = async () => {
    if (pin.length === 0) return;

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simulamos una sesión guardando los datos del usuario en el navegador
        localStorage.setItem('usuarioTPV', JSON.stringify(data.usuario));
        // Redirigimos a la pantalla principal (Terminal)
        navigate('/');
      } else {
        // Mostrar el error que devuelve el backend (ej. "PIN incorrecto")
        setError(data.error || 'Error al iniciar sesión');
        setPin(''); // Vaciamos el PIN para que vuelva a intentarlo
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  // Array para generar los botones del 1 al 9 fácilmente
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Acceso Caja
        </h2>

        {/* Pantalla del PIN */}
        <div className="bg-gray-100 h-16 rounded-xl mb-6 flex items-center justify-center text-3xl tracking-[1em] text-gray-700 shadow-inner">
          {/* Mostramos asteriscos en lugar del número real por seguridad */}
          {pin ? '•'.repeat(pin.length) : <span className="text-gray-400 tracking-normal text-lg">Ingrese PIN</span>}
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="text-red-500 text-center mb-4 font-semibold text-sm">
            {error}
          </div>
        )}

        {/* Teclado Numérico */}
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-50 hover:bg-blue-50 text-gray-800 font-semibold text-2xl py-4 rounded-xl shadow-sm transition-colors border border-gray-200 active:bg-blue-100"
            >
              {num}
            </button>
          ))}
          
          {/* Botón Borrar */}
          <button
            onClick={handleClear}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xl py-4 rounded-xl shadow-sm transition-colors border border-red-200 active:bg-red-200"
          >
            C
          </button>
          
          {/* Botón 0 */}
          <button
            onClick={() => handleNumber('0')}
            className="bg-gray-50 hover:bg-blue-50 text-gray-800 font-semibold text-2xl py-4 rounded-xl shadow-sm transition-colors border border-gray-200 active:bg-blue-100"
          >
            0
          </button>
          
          {/* Botón Entrar */}
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl py-4 rounded-xl shadow-sm transition-colors active:bg-blue-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}