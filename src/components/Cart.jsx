import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// Cart Component
const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart data
  const [discountCode, setDiscountCode] = useState(""); // For handling discount code input
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });

  // Get the userId from localStorage or use a default anonymous ID
  const userId = localStorage.getItem("userId") || "000000000000000000000000";

  // Fetch cart data from backend for logged-in users, from localStorage for anonymous users
  useEffect(() => {
    const fetchCartData = async () => {
      if (userId === "000000000000000000000000") {
        // Anonymous user - get cart from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCartItems); // Set the cart items state to the stored cart items
        calculateSummary(storedCartItems); // Recalculate summary after loading from localStorage
      } else {
        // Logged-in user - fetch cart from backend
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items); // Set the cart items state to the fetched cart data
            calculateSummary(data.items); // Recalculate summary after fetching items
          } else {
            console.error("Failed to fetch cart");
          }
        } catch (error) {
          console.error("Error fetching cart:", error.message);
        }
      }
    };

    fetchCartData();
  }, [userId]);

  // Calculate the subtotal, tax, discount, and total based on cart items
  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; 
    const discount = discountCode ? Math.min(subtotal + tax, discountCode) : 0; 
    let total = subtotal + tax - discount;
    total = Math.max(0, total); // Ensure total doesn't go below 0
    
    setSummary({
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    });
  };

  // Apply discount code when user clicks Apply
  const handleApplyDiscount = () => {
    if (discountCode && !isNaN(discountCode)) {
      calculateSummary(cartItems); // Recalculate the summary after applying discount
    } else {
      alert("Invalid discount code");
    }
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCartItems);
    calculateSummary(updatedCartItems); // Recalculate summary after item removal
    localStorage.setItem("cart", JSON.stringify(updatedCartItems)); // Save updated cart in localStorage
  };

  // Handle quantity change
  const handleChangeQuantity = (productId, operation) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: operation === "increase" ? item.quantity + 1 : item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    calculateSummary(updatedCartItems); // Recalculate summary after quantity change
    localStorage.setItem("cart", JSON.stringify(updatedCartItems)); // Save updated cart in localStorage
  };

  const handleClose = () => {
    onClose();
  };

  const handleLogin = async (newUserId) => {
    if (userId === "000000000000000000000000") {
      // If user was anonymous, update the cart on the backend for the new logged-in user
      try {
        const cartData = {
          userId: newUserId,
          items: cartItems,
        };
        const response = await fetch(`http://localhost:5001/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        });

        if (response.ok) {
          localStorage.setItem("userId", newUserId); // Save new userId in localStorage
          alert("Cart transferred to your account!");
        } else {
          alert("Failed to transfer cart to your account.");
        }
      } catch (error) {
        console.error("Error transferring cart:", error.message);
        alert("Error transferring cart.");
      }
    }
  };

  return (
    <Box sx={{ position: "fixed", top: 0, right: 0, width: "400px", height: "100vh", backgroundColor: "#fff", borderLeft: "1px solid #ddd", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", overflowY: "auto", zIndex: 1200 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#6c63ff", color: "#fff", padding: "16px" }}>
        <Typography variant="h6">Cart ({cartItems.length})</Typography>
        <IconButton sx={{ color: "#fff" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Cart Items */}
      <Box sx={{ padding: "16px" }}>
        {cartItems.map((item, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", position: "relative", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "16px" }}>
              <img src={item.imgLink} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="body1" fontWeight="bold" sx={{ textAlign: "left" }}>
                  {item.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                  <IconButton size="small" onClick={() => handleChangeQuantity(item.productId, "decrease")}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ margin: "0 8px" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => handleChangeQuantity(item.productId, "increase")}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", height: "80px" }}>
                <Typography variant="body2" color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
                <Button variant="text" size="small" color="error" onClick={() => handleRemoveItem(item.productId)}>
                  Remove
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Discount Code */}
      <Divider />
      <Box sx={{ padding: "16px" }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Apply Discount Code
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <TextField
            fullWidth
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)} // Update discount code
            size="small"
            variant="outlined"
            placeholder="Enter discount code"
          />
          <Button variant="contained" size="small" onClick={handleApplyDiscount}>
            Apply
          </Button>
        </Box>
      </Box>

      {/* Summary */}
      <Divider />
      <Box sx={{ padding: "16px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <Typography>Subtotal</Typography>
          <Typography>${summary.subtotal}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <Typography>Tax</Typography>
          <Typography>${summary.tax}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <Typography>Discount</Typography>
          <Typography>-${summary.discount}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontWeight: "bold" }}>
          <Typography>Estimated total</Typography>
          <Typography>${summary.total}</Typography>
        </Box>
      </Box>

      {/* Checkout Button */}
      <Box sx={{ backgroundColor: "#6c63ff", padding: "16px", textAlign: "center" }}>
        <Button variant="contained" sx={{ width: "100%", backgroundColor: "#fff", color: "#6c63ff" }}>
          Continue to checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;