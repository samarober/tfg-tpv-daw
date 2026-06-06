import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

/**
 * @typedef {Object} Pool
 * @property {Function} query - Función para ejecutar consultas SQL.
 */

/**
 * Configuración del Pool de conexiones para PostgreSQL.
 * @module dbConfig
 * @type {Pool}
 */
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tpv_db',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 5432,
});

export default pool;