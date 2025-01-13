import express from 'express';
import { createProduct, getAllProducts, updateProduct, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Route to create a new product
router.post('/', createProduct);

// Route to fetch all products
router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

export default router;