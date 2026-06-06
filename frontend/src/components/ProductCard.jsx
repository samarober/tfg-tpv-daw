import React from 'react';

/**
 * Tarjeta individual para mostrar la información de un producto en el catálogo.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Objeto con los datos del producto (id, name, price, stock).
 * @param {Function} props.onAdd - Función callback que se ejecuta al pulsar el botón de añadir.
 * @returns {JSX.Element} Elemento UI de la tarjeta.
 */
export default function ProductCard({ product, onAdd }) {
    return (
        <div style={{ border: '1px solid #cbd5e1', padding: '10px', margin: '5px 0', borderRadius: '4px' }}>
            <strong>{product.name}</strong> - {product.price.toFixed(2)}€ 
            <span style={{ fontSize: '8.5pt', color: '#64748b' }}> (Stock: {product.stock})</span>
            <button 
                onClick={() => onAdd(product)} 
                style={{ float: 'right', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}
            >
                + Añadir
            </button>
            <div style={{ clear: 'both' }}></div>
        </div>
    );
}