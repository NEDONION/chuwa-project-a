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

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart data
  const [discountCode, setDiscountCode] = useState(""); // For handling discount code input
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });

  const userId = localStorage.getItem("userId") || "000000000000000000000000";

  // Fetch cart data from localStorage or Backend
  useEffect(() => {
    const fetchCartData = async () => {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems); // Update local state from localStorage
      calculateSummary(storedCartItems); // Calculate summary from localStorage data

      // Fetch from backend if user is logged in
      if (userId && userId !== "000000000000000000000000") {
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items); // Set backend cart items
            calculateSummary(data.items); // Calculate summary from backend data
          } else {
            console.error("Failed to fetch cart from backend");
          }
        } catch (error) {
          console.error("Error fetching cart:", error.message);
        }
      }
    };

    fetchCartData();
  }, [userId]);

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const discount = discountCode ? Math.min(subtotal + tax, discountCode) : 0;
    let total = subtotal + tax - discount;
    total = Math.max(0, total);

    setSummary({
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    });

    // Update localStorage immediately
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const updateCart = async (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems)); // Update localStorage

    const userId = localStorage.getItem("userId");

    if (userId !== "000000000000000000000000") {
      try {
        const response = await fetch(`http://localhost:5001/api/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, items: updatedItems }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCartItems(updatedCart.items); // Update cart data from backend
          calculateSummary(updatedCart.items); // Update summary
        } else {
          console.error("Failed to update cart on backend");
        }
      } catch (error) {
        console.error("Error syncing cart with backend:", error.message);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    updateCart(updatedCartItems); // Remove from state and localStorage

    const userId = localStorage.getItem("userId");

    if (userId !== "000000000000000000000000") {
      try {
        const response = await fetch(`http://localhost:5001/api/cart/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCartItems(updatedCart.items);
          calculateSummary(updatedCart.items); // Update summary
        }
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }
  };

  const handleChangeQuantity = async (productId, operation) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: operation === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 0) }
        : item
    ).filter((item) => item.quantity > 0); // Remove items with quantity 0

    updateCart(updatedCartItems); // Update state and localStorage

    const userId = localStorage.getItem("userId");

    if (userId !== "000000000000000000000000") {
      try {
        const response = await fetch(`http://localhost:5001/api/cart/updateQuantity`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, items: updatedCartItems }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCartItems(updatedCart.items);
          calculateSummary(updatedCart.items); // Update summary
        }
      } catch (error) {
        console.error("Error syncing cart with backend:", error);
      }
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode && !isNaN(discountCode)) {
      calculateSummary(cartItems);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload(); // 整个页面刷新
  };

  return (
    <Box sx={{ position: "fixed", top: 0, right: 0, width: "400px", height: "100vh", backgroundColor: "#fff", borderLeft: "1px solid #ddd", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", overflowY: "auto", zIndex: 1200 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#6c63ff", color: "#fff", padding: "16px" }}>
        <Typography variant="h6">Cart ({cartItems.length})</Typography>
        <IconButton sx={{ color: "#fff" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

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

      <Divider />
      <Box sx={{ padding: "16px" }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Apply Discount Code
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <TextField
            fullWidth
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            size="small"
            variant="outlined"
            placeholder="Enter discount code"
          />
          <Button variant="contained" size="small" onClick={handleApplyDiscount}>
            Apply
          </Button>
        </Box>
      </Box>

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

      <Box sx={{ backgroundColor: "#6c63ff", padding: "16px", textAlign: "center" }}>
        <Button variant="contained" sx={{ width: "100%", backgroundColor: "#fff", color: "#6c63ff" }}>
          Continue to checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;