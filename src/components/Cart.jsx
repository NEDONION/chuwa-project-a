import React from "react";
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

const Cart = () => {
  // this is hard code, please add redux
  const cartItems = [
    {
      id: 1,
      name: "Meta Quest2 VR",
      price: 299,
      quantity: 1,
      imgLink: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "iWatch",
      price: 100,
      quantity: 2,
      imgLink: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "PlayStation 5",
      price: 499,
      quantity: 3,
      imgLink: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed", // Makes the cart float
        top: 0,
        right: 0,
        width: "400px",
        height: "100vh", // Full height of the viewport
        backgroundColor: "#fff",
        borderLeft: "1px solid #ddd",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        overflowY: "auto", // Enables scrolling for long content
        zIndex: 1200, // Ensures it appears above other elements
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#6c63ff",
          color: "#fff",
          padding: "16px",
        }}
      >
        <Typography variant="h6">Cart ({cartItems.length})</Typography>
        <IconButton sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Cart Items */}
      <Box sx={{ padding: "16px" }}>
        {cartItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            {/* Product Info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "16px", // Adds space between elements
              }}
            >
              {/* Product Image */}
              <img
                src={item.imgLink}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />

              {/* Product Details */}
              <Box
                sx={{
                  flex: 1, // Takes up available space
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    textAlign: "left", // Explicitly set text alignment
                  }}
                >
                  {item.name}
                </Typography>

                {/* Quantity Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <IconButton size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ margin: "0 8px" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Price and Remove Button */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end", // Aligns to the right
                  height: "80px",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
                <Button variant="text" size="small" color="error">
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
            placeholder="20 DOLLAR OFF"
            size="small"
            variant="outlined"
          />
          <Button variant="contained" size="small">
            Apply
          </Button>
        </Box>
      </Box>

      {/* Summary */}
      <Divider />
      <Box sx={{ padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Typography>Subtotal</Typography>
          <Typography>$499.00</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Typography>Tax</Typography>
          <Typography>$49.90</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Typography>Discount</Typography>
          <Typography>-$20.00</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontWeight: "bold",
          }}
        >
          <Typography>Estimated total</Typography>
          <Typography>$429.10</Typography>
        </Box>
      </Box>

      {/* Checkout Button */}
      <Box
        sx={{
          backgroundColor: "#6c63ff",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "#fff", color: "#6c63ff" }}
        >
          Continue to checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
