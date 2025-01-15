import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// Route to fetch the cart for a specific user
router.get("/:userId", getCart); // Fetch cart by userId

// Route to add items to the cart
router.post("/", addToCart); // Add items to the cart

// Route to remove item from the cart
router.post("/remove", removeFromCart); // Remove item from cart

export default router;