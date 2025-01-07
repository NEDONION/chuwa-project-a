import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {addProduct} from '../actions/productAction';
import { Box, TextField, Button, Select, MenuItem, Typography, Grid } from "@mui/material";
const ProductForm = ({initVals, onChange, onSubmit, btnLabel, title}) => {

    const [product, setProduct] = useState(initVals);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProduct = { ...product, [name]: value };
        setProduct(updatedProduct);
        onChange(updatedProduct); 
      
    };

    const handleUploadImage = (e) => {
        if (product.imageLink) {
            setPreviewImage(product.imageLink)
        }else{
            setPreviewImage(null)
            alert("Please provide a valid image URL");
        }
    }

    return (

      <div>
        <h2 style={{textAlign: 'left'}}>{title}</h2>
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
                <MenuItem value="Category1">electric product</MenuItem>
                <MenuItem value="Category2">food</MenuItem>
                <MenuItem value="Category3">clothing</MenuItem>
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
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: "100%" }}
                onClick={handleUploadImage} 
              >
                preview
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
                      src = {previewImage} 
                      alt = 'Preview image'
                      style = {{
                          width: "100%", 
                          height: "100%",
                          objectFit: "contain",
                      }}
                  />
              ):(
                  <Typography variant="body2" color="textSecondary">
                      Image Preview
                  </Typography>)}
                
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                {btnLabel}
              </Button>
            </Grid>
          </Grid>
        </Box>

      </div>
        
      );
}
export default ProductForm