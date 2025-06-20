import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const ProductCard = ({ product, onQuantityChange }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [showSelector, setShowSelector] = useState(false);

  // Access user role from Redux store
  const role = useSelector((state) => state.auth.role); // Get the role from Redux store

  const userId = localStorage.getItem('userId') || '000000000000000000000000';

  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', userId);
  }

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

  return (
    <Card
      style={{
        width: '242px',
        height: '380px',
        margin: '10px auto',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={() => navigate(`/detail/${product._id}`)}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        alt={product.name}
        style={{
          width: '100%',
          height: '240px',
          objectFit: 'contain',
          margin: 'auto',
        }}
      />
      <CardContent style={{ textAlign: 'left', padding: '10px' }}>
        <Typography variant="subtitle2" style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '5px' }}>
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary" style={{ fontSize: '16px', marginBottom: '5px' }}>
          ${product.price}
        </Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        {!showSelector ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '100%', fontSize: '12px', height: '30px' }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/detail/${product._id}`);
            }}
          >
            Add
          </Button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              const newQuantity = Math.max(quantity - 1, 0);
              setQuantity(newQuantity);
              onQuantityChange(product._id, newQuantity);
              if (newQuantity === 0) {
                setShowSelector(false);
              }
            }}>
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="body2"
              style={{
                margin: '0 10px',
                fontWeight: 'bold',
                color: '#007bff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                onQuantityChange(product._id, newQuantity);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
        {/* Show 'Edit' button only if the user is an admin */}
        {role === 'Admin' && (
          <Button
            variant="outlined"
            size="small"
            style={{ width: '48%', fontSize: '12px', height: '30px' }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-product/${product._id}`, { state: { product } });
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;