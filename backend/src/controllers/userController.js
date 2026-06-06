import pool from '../config/db.js';

// ¡Asegúrate de que este "export" esté aquí!
export const createUser = async (req, res) => {
    const { nombre, pin, rol } = req.body;
    try {
        const query = 'INSERT INTO usuarios (nombre, pin, rol) VALUES ($1, $2, $3) RETURNING id';
        const result = await pool.query(query, [nombre, pin, rol]);
        res.status(201).json({ message: 'Usuario creado', id: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear usuario', details: err.message });
    }
};

/**
 * Verifica el PIN de un usuario para el inicio de sesión en el TPV.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const loginUser = async (req, res) => {
    const { pin } = req.body;
    
    try {
        // Buscamos al usuario que coincida con ese PIN
        const query = 'SELECT id, nombre, rol FROM usuarios WHERE pin = $1';
        const result = await pool.query(query, [pin]);

        // Si no hay resultados, el PIN es inválido
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'PIN incorrecto' });
        }

        // Si es correcto, devolvemos los datos del cajero (sin el PIN por seguridad)
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            usuario: result.rows[0] 
        });

    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor', details: err.message });
    }
};