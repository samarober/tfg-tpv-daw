import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

/** @type {import('express').Router} */
const router = express.Router();

// Ruta para crear un nuevo cajero/administrador
router.post('/', createUser);
router.post('/login', loginUser); // Nueva ruta para el TPV

export default router;