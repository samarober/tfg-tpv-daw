import express from 'express';
import { createSale } from '../controllers/saleController.js';

/** @type {import('express').Router} */
const router = express.Router();

router.post('/', createSale);

export default router;