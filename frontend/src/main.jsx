import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

/**
 * Punto de entrada principal de la aplicación React.
 * Envuelve toda la app con el proveedor del carrito para que el estado
 * sea accesible desde cualquier vista.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);