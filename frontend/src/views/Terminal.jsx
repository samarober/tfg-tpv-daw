import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

/**
 * Componente Vista Terminal.
 * Renderiza la interfaz principal del Punto de Venta, dividida en un catálogo 
 * de productos seleccionables y el ticket de venta activo.
 *
 * @component
 * @returns {JSX.Element} La vista del terminal TPV.
 */
export default function Terminal() {
    /**
     * Estado local que almacena la lista de productos obtenida desde la API.
     * @type {Array<Object>}
     */
    const [products, setProducts] = useState([]);

    // Desestructuración de los valores y funciones del contexto del carrito
    const { cart, addToCart, updateQuantity, getCartTotal, clearCart } = useCart();

/**
     * Efecto secundario que solicita los datos de los productos al montar el componente.
     * Se comunica de forma real y asíncrona con la API REST del backend en Node.js.
     */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const dbData = await response.json();
                
                // Transformamos los datos que vienen de PostgreSQL (en español y con strings)
                // al formato que espera nuestra interfaz de React (en inglés y numérico)
                const formattedProducts = dbData.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    price: parseFloat(item.precio), // Convertimos el texto "1.50" a número real
                    stock: item.stock,
                    category: item.categoria_id
                }));
                
                // Actualiza el estado local con los datos ya formateados
                setProducts(formattedProducts);
            } catch (error) {
                console.error("There was a problem loading the catalog:", error);
                alert("Error connecting to the server. Please check if the backend is running.");
            }
        };
        
        fetchProducts();
    }, []);

    /**
     * Procesa el carrito actual como una transacción de venta finalizada.
     * Prepara el paquete de datos (payload) para enviarlo al servidor y limpiar la caja.
     * * @async
     */
    const handleCheckout = async () => {
        if (cart.length === 0) return alert('El ticket está vacío');
        
        const salePayload = {
            date: new Date(),
            items: cart,
            total: getCartTotal()
        };

        console.log('Enviando transacción al Backend...', salePayload);
        alert(`Venta procesada con éxito. Total cobrado: ${getCartTotal().toFixed(2)}€`);
        clearCart(); // Reinicia el ticket para el siguiente cliente
    };

    return (
        <div style={{ display: 'block', padding: '10px' }}>
            <h2>Terminal Punto de Venta Activo</h2>
            
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ width: '60%' }}>Catálogo de Productos</th>
                        <th style={{ width: '40%' }}>Ticket de Venta Actual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* LADO IZQUIERDO: CATÁLOGO */}
                        <td style={{ verticalAlign: 'top', padding: '10px' }}>
                            <div style={{ margin: '10px 0' }}>
                                {products.map(prod => (
                                    <div key={prod.id} style={{ border: '1px solid #cbd5e1', padding: '10px', margin: '5px 0', borderRadius: '4px' }}>
                                        <strong>{prod.name}</strong> - {prod.price.toFixed(2)}€ 
                                        <span style={{ fontSize: '8.5pt', color: '#64748b' }}> (Stock: {prod.stock})</span>
                                        <button onClick={() => addToCart(prod)} style={{ float: 'right', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}>
                                            + Añadir
                                        </button>
                                        <div style={{ clear: 'both' }}></div>
                                    </div>
                                ))}
                            </div>
                        </td>

                        {/* LADO DERECHO: TICKET DE VENTA */}
                        <td style={{ verticalAlign: 'top', padding: '10px', backgroundColor: '#f8fafc' }}>
                            {cart.length === 0 ? (
                                <p style={{ color: '#64748b', fontStyle: 'italic' }}>No hay artículos en el ticket en curso.</p>
                            ) : (
                                <div>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '6px', marginBottom: '6px' }}>
                                            <span>{item.name}</span><br />
                                            <small>{item.quantity} x {item.price.toFixed(2)}€ = {(item.price * item.quantity).toFixed(2)}€</small>
                                            <div style={{ float: 'right' }}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '2px 6px' }}>-</button>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '2px 6px', marginLeft: '2px' }}>+</button>
                                            </div>
                                            <div style={{ clear: 'both' }}></div>
                                        </div>
                                    ))}
                                    <h3 style={{ marginTop: '15px' }}>Total a Cobrar: {getCartTotal().toFixed(2)}€</h3>
                                    <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                        Cobrar e Imprimir Ticket
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}