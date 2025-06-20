import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Select, MenuItem, Typography, Grid } from "@mui/material";

const ProductForm = ({ initVals, onChange, onSubmit, btnLabel, title }) => {
  // Get saved form data from localStorage or use initial values
  const getSavedFormData = () => {
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        name: parsed.name || initVals.name || "",
        description: parsed.description || initVals.description || "",
        category: parsed.category || initVals.category || "",
        price: parsed.price || initVals.price || 0,
        quantity: parsed.quantity || initVals.quantity || 0,
        imageLink: parsed.imageLink || initVals.imageLink || "",
      };
    }
    return {
      name: initVals.name || "",
      description: initVals.description || "",
      category: initVals.category || "",
      price: initVals.price || 0,
      quantity: initVals.quantity || 0,
      imageLink: initVals.imageLink || "",
    };
  };

  const [product, setProduct] = useState(getSavedFormData);
  const [previewImage, setPreviewImage] = useState(null);

  // Save form data to localStorage whenever product state changes
  useEffect(() => {
    localStorage.setItem('productFormData', JSON.stringify(product));
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const updatedProduct = product._id 
      ? { ...product, [name]: value, _id: product._id } 
      : { ...product, [name]: value };
  
    setProduct(updatedProduct);
    onChange(updatedProduct);
  };

  const handleUploadImage = () => {
    if (product.imageLink && product.imageLink.startsWith("http")) {
      setPreviewImage(product.imageLink);
    } else {
      setPreviewImage(null);
      alert("Please provide a valid image URL");
    }
  };

  // Clear saved form data when form is successfully submitted
  const handleSubmit = () => {
    localStorage.removeItem('productFormData'); // Clear saved data
    onSubmit(); // Call the original onSubmit function
  };

  return (
    <div>
      <h2 style={{ textAlign: "left" }}>{title}</h2>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              name="category"
              value={product.category}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              size="small"
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              type="number"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="In Stock Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              type="number"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Add Image Link"
              name="imageLink"
              value={product.imageLink}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "100%" }}
              onClick={handleUploadImage}
            >
              Preview
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                height: 100,
                border: "1px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                backgroundColor: previewImage ? "#f5f5f5" : "transparent",
              }}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview image"
                  onError={() => {
                    setPreviewImage(null);
                    alert("Failed to load the image. Please check the URL.");
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Image Preview
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                Object.values(product).some((val) => !val) || // Ensure no field is empty
                !product.imageLink.startsWith("https")
              }
            >
              {btnLabel}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductForm;