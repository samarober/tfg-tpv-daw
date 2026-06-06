import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

/**
 * Instancia principal de la aplicación Express.
 * @type {import('express').Application}
 */
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enlazamos la ruta /api/products con nuestro archivo de rutas importado
app.use('/api/products', productRoutes);

/**
 * Inicia el servidor y lo pone a escuchar peticiones en el puerto definido.
 */
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});