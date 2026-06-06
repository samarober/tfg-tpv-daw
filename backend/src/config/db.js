import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuración del Pool de conexiones para PostgreSQL.
 * Gestiona múltiples conexiones simultáneas a la base de datos del TPV.
 * @module dbConfig
 * @type {import('pg').Pool}
 */
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tpv_db',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 5432,
});

export default pool;