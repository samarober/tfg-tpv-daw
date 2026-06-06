import express from 'express';
import { getProducts } from '../controllers/productController.js';

/**
/**
 * @typedef {Object} Router
 */

/**
 * Enrutador de Express para la entidad de Productos.
 * @type {Router}
 */
const router = express.Router();

/**
 * Ruta GET para obtener el catálogo completo.
 * @name get/api/products
 * @function
 * @inner
 */
router.get('/', getProducts);

export default router;