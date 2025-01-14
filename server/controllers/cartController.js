import Cart from "../models/cart.js";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB


// Fetch the cart for a specific user (or anonymous user)
// Fetch the cart for a specific user (or anonymous user)
export const getCart = async (req, res) => {
    const { userId } = req.params;
    console.log("UserID:", userId); 
    try {
        const cart = await Cart.findOne({ userId }); // Directly search with userId (no need to convert)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart); // Return the cart data
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Add items to the cart
export const addToCart = async (req, res) => {
    const { userId, items } = req.body;

    try {
        let cart = await Cart.findOne({ userId }); // Search for the cart with userId
        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({ userId, items });
        } else {
            // If the cart exists, update the items
            items.forEach((item) => {
                const existingItem = cart.items.find(
                    (i) => i.productId.toString() === item.productId
                );
                if (existingItem) {
                    existingItem.quantity += item.quantity; // Update quantity
                } else {
                    cart.items.push(item); // Add new item
                }
            });
        }

        // Calculate subtotal, tax, and total
        const subtotal = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const tax = subtotal * 0.1; // Assuming 10% tax
        const total = subtotal + tax;

        cart.summary = { subtotal, tax, discount: 0, total }; // Update cart summary
        await cart.save(); // Save the cart to the database
        res.status(200).json(cart); // Return the updated cart
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};