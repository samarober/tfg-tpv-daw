import pool from '../config/db.js';

/**
 * Registra una venta completa (cabecera + líneas) en la base de datos.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createSale = async (req, res) => {
    const { total, usuario_id, productos } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // 1. Iniciar transacción

        // 2. Insertar cabecera de la venta
        const ventaQuery = 'INSERT INTO ventas (total, usuario_id) VALUES ($1, $2) RETURNING id';
        const ventaRes = await client.query(ventaQuery, [total, usuario_id]);
        const ventaId = ventaRes.rows[0].id;

        // 3. Insertar líneas de venta
        for (let p of productos) {
            const lineaQuery = 'INSERT INTO lineas_venta (venta_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)';
            await client.query(lineaQuery, [ventaId, p.producto_id, p.cantidad, p.precio]);
        }

        await client.query('COMMIT'); // 4. Guardar cambios
        res.status(201).json({ message: 'Venta registrada con éxito', id: ventaId });

    } catch (err) {
        await client.query('ROLLBACK'); // 5. Deshacer si falla
        res.status(500).json({ error: 'Error al registrar la venta', details: err.message });
    } finally {
        client.release(); // Liberar conexión
    }
};