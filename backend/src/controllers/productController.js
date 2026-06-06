import pool from '../config/db.js';

/**
 * Controlador para la gestión de productos del TPV.
 * @module productController
 */

/**
 * Obtiene la lista completa de productos activos directamente desde PostgreSQL.
 *
 * @async
 * @function getProducts
 * @param {Object} req - Petición HTTP del cliente de Express.
 * @param {Object} res - Respuesta HTTP de Express para enviar al cliente.
 * @returns {Promise<void>} Promesa que resuelve enviando un JSON con los productos de la base de datos.
 */
export const getProducts = async (req, res) => {
    try {
        const query = 'SELECT * FROM productos WHERE activo = true';
        const result = await pool.query(query);
        
        // result.rows contains the array with the exact data from the DB tables
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching products from database:', error);
        res.status(500).json({ error: 'Internal server error while querying the catalog' });
    }
};