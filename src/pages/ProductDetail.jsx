import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Chip, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [showSelector, setShowSelector] = useState(false);

  // Access user role from Redux store
  const role = useSelector((state) => state.auth.role); // Get the role from Redux store

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (quantity === 0) {
      alert("Please select at least one item.");
      return;
    }

    const userId = localStorage.getItem("userId") || "000000000000000000000000";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.productId === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        productId: product._id,
        quantity,
        name: product.name,
        price: product.price,
        imgLink: product.imageUrl,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdate"));

    try {
      const response = await fetch("http://localhost:5001/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, items: cart }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      alert(`Successfully added ${quantity} item(s) to the cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert("Failed to add to cart. Please try again.");
    }
  };

  if (!product) {
    return (
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Loading product details...
      </Typography>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "left", marginTop: 0, fontSize: "2rem" }}>Product Detail</h2>
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "auto",
          padding: 6,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                maxWidth: "100%",
                height: "400px",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" display="block" gutterBottom style={{ fontSize: "1.2rem" }}>
              {product.category}
            </Typography>
            <Typography variant="h4" gutterBottom style={{ fontSize: "2rem" }}>
              {product.name}
            </Typography>
            <Typography variant="h3" gutterBottom style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
              ${product.price}{" "}
              <Chip
                label={product.inStockQuantity > 0 ? "In Stock" : "Out of Stock"}
                color={product.inStockQuantity > 0 ? "success" : "error"}
                style={{ fontSize: "1rem", padding: "0 10px" }}
              />
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: "1.2rem" }}>
              {product.description}
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              {!showSelector ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ fontSize: "1.2rem", padding: "10px 20px" }}
                  onClick={() => {
                    setShowSelector(true);
                    setQuantity(1);
                  }}
                >
                  Add To Cart
                </Button>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="large"
                    onClick={() => {
                      const newQuantity = Math.max(quantity - 1, 0);
                      setQuantity(newQuantity);
                      if (newQuantity === 0) {
                        setShowSelector(false);
                      }
                    }}
                  >
                    <RemoveIcon fontSize="large" />
                  </IconButton>
                  <Typography
                    variant="h4"
                    style={{ margin: "0 20px", fontWeight: "bold", fontSize: "1.8rem" }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <AddIcon fontSize="large" />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginLeft: 2, fontSize: "1.2rem" }}
                    onClick={handleAddToCart}
                  >
                    Add
                  </Button>
                </Box>
              )}
              {/* Show 'Edit' button only if the user is an admin */}
              {role === 'Admin' && (
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ marginLeft: 2, fontSize: "1.2rem" }}
                  onClick={() =>
                    navigate(`/edit-product/${product._id}`, { state: { product } })
                  }
                >
                  Edit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetail;