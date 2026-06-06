import React, { createContext, useState, useContext } from 'react';

/**
 * Contexto de React para gestionar el estado global del carrito de compras.
 * Permite acceder a los datos de la venta en curso desde cualquier componente.
 * @type {React.Context}
 */
const CartContext = createContext();

/**
 * Componente Proveedor que envuelve la aplicación para suministrar el estado y las acciones del carrito.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto.
 * @returns {JSX.Element} Proveedor del CartContext.
 */
export const CartProvider = ({ children }) => {
    /**
     * Estado que representa los artículos actuales en el ticket de venta.
     * @type {Array<Object>}
     */
    const [cart, setCart] = useState([]);

    /**
     * Añade un producto al carrito o incrementa su cantidad si ya existe.
     * Incluye validación para no superar el stock disponible en la base de datos.
     *
     * @param {Object} product - El producto a añadir.
     * @param {number} product.id - Identificador del producto.
     * @param {string} product.name - Nombre del producto.
     * @param {number} product.price - Precio unitario.
     * @param {number} product.stock - Stock disponible.
     */
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    alert('No hay suficiente stock disponible');
                    return prevCart;
                }
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    /**
     * Elimina un producto por completo del ticket de venta.
     *
     * @param {number} productId - El ID del producto a eliminar.
     */
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    /**
     * Actualiza la cantidad específica de un producto en el carrito.
     * Si la nueva cantidad es 0 o menor, el producto se elimina del ticket.
     *
     * @param {number} productId - El ID del producto a actualizar.
     * @param {number} newQuantity - La nueva cantidad deseada.
     */
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        );
    };

    /**
     * Vacía el carrito por completo (útil tras finalizar un cobro).
     */
    const clearCart = () => setCart([]);

    /**
     * Calcula el importe total de todos los artículos actualmente en el carrito.
     *
     * @returns {number} El coste total de la venta actual.
     */
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Hook personalizado para consumir fácilmente el CartContext en cualquier vista.
 *
 * @returns {Object} El estado del carrito y sus funciones modificadoras.
 */
export const useCart = () => useContext(CartContext);