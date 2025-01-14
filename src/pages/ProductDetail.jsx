import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, Chip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ProductDetail = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0); // Manage quantity for Add to Cart
  const [showSelector, setShowSelector] = useState(false); // Control Add button visibility

  // Fetch the latest product data from the server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data); // Update the product state
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
  
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }
  
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
  
    // Trigger a custom event to notify Header
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

  // Show loading text if product is not yet loaded
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
          backgroundColor: "white", // Set white background for the whole container
          borderRadius: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imageUrl} // Use `imageUrl` from product data
              alt={product.name}
              style={{
                maxWidth: "100%",
                height: "400px", // Enlarge the image
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
                    setQuantity(1); // Default quantity to 1
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetail;