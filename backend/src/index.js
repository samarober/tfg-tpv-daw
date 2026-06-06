import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';

/**
 * @typedef {Object} Application
 */

/**
 * Instancia principal de la aplicación Express.
 * @type {Application}
 */
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enlazamos la ruta /api/products con nuestro archivo de rutas importado
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

/**
 * Inicia el servidor y lo pone a escuchar peticiones en el puerto definido.
 */
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});