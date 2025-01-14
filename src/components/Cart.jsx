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

  useEffect(() => {
    const fetchCartData = async () => {
      if (userId === "000000000000000000000000") {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCartItems);
        calculateSummary(storedCartItems);
      } else {
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items);
            calculateSummary(data.items);
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

    // 触发 `cartUpdate` 事件
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems)); // 同步 localStorage
    calculateSummary(updatedItems); // 更新购物车小计和 Header
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    updateCart(updatedCartItems); // 更新购物车
  };

  const handleChangeQuantity = (productId, operation) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: operation === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 0) }
        : item
    ).filter((item) => item.quantity > 0); // 移除数量为 0 的商品

    updateCart(updatedCartItems); // 更新购物车
  };

  const handleApplyDiscount = () => {
    if (discountCode && !isNaN(discountCode)) {
      calculateSummary(cartItems); // 重新计算总计
    } else {
      alert("Invalid discount code");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleLogin = async (newUserId) => {
    if (userId === "000000000000000000000000") {
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
          localStorage.setItem("userId", newUserId);
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