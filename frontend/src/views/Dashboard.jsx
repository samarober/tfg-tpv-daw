import React from 'react';

/**
 * Vista del panel de administración (Dashboard).
 * Mostrará estadísticas de ventas, control de inventario y arqueos de caja.
 *
 * @component
 * @returns {JSX.Element} Panel de control.
 */
export default function Dashboard() {
    return (
        <div>
            <h2>Panel de Administración (Backoffice)</h2>
            <p style={{ color: '#64748b' }}>
                Aquí se implementarán los gráficos de ventas mensuales, el CRUD de gestión 
                de productos del inventario y la opción de cerrar la caja (arqueo).
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', flex: 1 }}>
                    <h3>Ventas de Hoy</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>342.50€</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', flex: 1 }}>
                    <h3>Tickets Emitidos</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>45</p>
                </div>
            </div>
        </div>
    );
}