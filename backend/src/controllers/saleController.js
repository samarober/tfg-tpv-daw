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

        // 2. Comprobar y actualizar el stock de CADA producto primero
        for (let p of productos) {
            // FOR UPDATE bloquea la fila temporalmente para evitar ventas simultáneas del mismo producto
            const stockQuery = 'SELECT stock, nombre FROM productos WHERE id = $1 FOR UPDATE';
            const stockRes = await client.query(stockQuery, [p.producto_id]);

            // Validar que el producto exista
            if (stockRes.rows.length === 0) {
                throw new Error(`El producto con ID ${p.producto_id} no existe.`);
            }

            const productoDB = stockRes.rows[0];

            // Validar que haya stock suficiente
            if (productoDB.stock < p.cantidad) {
                throw new Error(`Stock insuficiente para: ${productoDB.nombre}. Stock disponible: ${productoDB.stock}`);
            }

            // 3. Restar el stock en la base de datos
            const updateStockQuery = 'UPDATE productos SET stock = stock - $1 WHERE id = $2';
            await client.query(updateStockQuery, [p.cantidad, p.producto_id]);
        }

        // 4. Insertar cabecera de la venta
        const ventaQuery = 'INSERT INTO ventas (total, usuario_id) VALUES ($1, $2) RETURNING id';
        const ventaRes = await client.query(ventaQuery, [total, usuario_id]);
        const ventaId = ventaRes.rows[0].id;

        // 5. Insertar líneas de venta
        for (let p of productos) {
            const lineaQuery = 'INSERT INTO lineas_venta (venta_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)';
            await client.query(lineaQuery, [ventaId, p.producto_id, p.cantidad, p.precio]);
        }

        await client.query('COMMIT'); // 6. Si llegamos aquí, todo salió bien. Guardamos cambios.
        res.status(201).json({ message: 'Venta registrada y stock actualizado con éxito', id: ventaId });

    } catch (err) {
        await client.query('ROLLBACK'); // 7. Si ALGO falla (incluso el stock), deshacemos todo
        // Devolvemos status 400 (Bad Request) y el mensaje de error personalizado
        res.status(400).json({ error: 'La venta no pudo procesarse', details: err.message });
    } finally {
        client.release(); // Siempre liberamos la conexión de vuelta al Pool
    }
};