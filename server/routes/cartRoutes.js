import express from "express";
import { getCart, addToCart } from "../controllers/cartController.js";

const router = express.Router();

// Route to fetch the cart for a specific user
// GET /api/cart/:userId
router.get("/:userId", getCart); // Fetch cart by userId

// Route to add items to the cart
// POST /api/cart
router.post("/", addToCart); // Add items to the cart

export default router;