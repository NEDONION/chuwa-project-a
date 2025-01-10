import express from 'express';
import { createProduct, getAllProducts } from '../controllers/productController.js';

const router = express.Router();

// Route to create a new product
router.post('/', createProduct);

// Route to fetch all products
router.get('/', getAllProducts);

export default router;