import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Grid, Chip } from "@mui/material";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);

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
      <h2 style={{ textAlign: "left", marginTop: 0 }}>Product Detail</h2>
      <Box
        sx={{
          maxWidth: 800,
          margin: "auto",
          padding: 4,
          backgroundColor: "white", // Set white background for the whole container
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imageUrl} // Use `imageUrl` from product data
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" display="block" gutterBottom>
              {product.category}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h4" gutterBottom>
              ${product.price}{" "}
              <Chip
                label={
                  product.inStockQuantity > 0 ? "In Stock" : "Out of Stock"
                }
                color={product.inStockQuantity > 0 ? "success" : "error"}
              />
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {product.description}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              {/* Add To Cart Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                onClick={() => {
                  alert("Added to cart");
                }}
              >
                Add To Cart
              </Button>
              {/* Edit Product Button */}
              <Button
                variant="outlined"
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