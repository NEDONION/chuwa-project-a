import Cart from "../models/cart.js";

// Fetch the cart for a specific user
export const getCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Attempt to find the cart by userId
      let cart = await Cart.findOne({ userId });
  
      // If no cart is found, initialize an empty cart
      if (!cart) {
        cart = { items: [], summary: { subtotal: 0, tax: 0, discount: 0, total: 0 } };
      }
  
      // Send the cart (empty or populated) to the front end
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
// Add items to the cart
export const addToCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
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

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cart.summary = { subtotal, tax, discount: 0, total };
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cart.summary = { subtotal, tax, discount: 0, total };
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};