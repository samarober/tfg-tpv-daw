import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Terminal from './views/Terminal.jsx';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

/**
 * Componente principal de enrutamiento.
 * Define las URLs de la aplicación y qué vista renderizar en cada caso.
 *
 * @component
 * @returns {JSX.Element} Estructura de rutas de la SPA.
 */
export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas que requieren autenticación */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Terminal />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}