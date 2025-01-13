import Cart from "../models/cart.js";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

// Fetch the cart for a specific user (or anonymous user)
export const getCart = async (req, res) => {
    const { userId } = req.params;

    // Convert userId to ObjectId if it's a valid ObjectId, otherwise leave it as is (string)
    const userIdObj = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    try {
        const cart = await Cart.findOne({ userId: userIdObj }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Add items to the cart
export const addToCart = async (req, res) => {
    const { userId, items } = req.body;

    // Ensure userId is valid (either ObjectId or string)
    const userIdObj = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    try {
        let cart = await Cart.findOne({ userId: userIdObj });
        if (!cart) {
            cart = new Cart({ userId: userIdObj, items });
        } else {
            // Update cart items
            items.forEach((item) => {
                const existingItem = cart.items.find(
                    (i) => i.productId.toString() === item.productId
                );
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    cart.items.push(item);
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
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};