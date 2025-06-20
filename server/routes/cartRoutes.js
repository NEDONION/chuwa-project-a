import express from "express";
import { getCart, syncCart, addItemToCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// Route to fetch the cart for a specific user
router.get("/:userId", getCart); // Fetch cart by userId

// Route to add a single item to the cart
router.post("/add", addItemToCart);

// Route to sync the entire cart
router.post("/", syncCart);

// Route to remove item from the cart
router.post("/remove", removeFromCart); // Remove item from cart

export default router;