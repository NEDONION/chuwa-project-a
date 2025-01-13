import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating a unique ID

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [quantity, setQuantity] = useState(0); // State to manage quantity
  const [showSelector, setShowSelector] = useState(false); // State to control Add button visibility

  // Get or generate a user ID (either from localStorage or a new UUID)
  const userId = localStorage.getItem('userId') || uuidv4();
  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', userId); // Save the generated userId to localStorage
  }

  // Function to handle "Add to Cart" submission
  // ProductCard.jsx

  const handleAddToCart = async () => {
    if (quantity === 0) {
      alert('Please select at least one item.');
      return;
    }
  
    const userId = "000000000000000000000000"; // 
  
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId); 
    }
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProduct = cart.find(item => item.productId === product._id);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ productId: product._id, quantity, name: product.name, price: product.price, imgLink: product.imageUrl });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    try {
      const response = await fetch('http://localhost:5001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items: cart })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      alert(`Successfully added ${quantity} item(s) to the cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      alert('Failed to add to cart. Please try again.');
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
      onClick={() => navigate(`/detail/${product._id}`)} // Navigate to detail page on card click
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
          // Initial Add button
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '48%', fontSize: '12px', height: '30px' }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              setShowSelector(true); // Show quantity selector
              setQuantity(1); // Default quantity to 1
            }}
          >
            Add
          </Button>
        ) : (
          // Quantity Selector
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                setQuantity((prev) => Math.max(prev - 1, 0)); // Decrease quantity, but not below 0
                if (quantity === 1) {
                  setShowSelector(false); // Return to Add button if quantity is 0
                }
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="body2"
              style={{
                margin: '0 10px',
                cursor: 'pointer', // Indicate it's clickable
                fontWeight: 'bold',
                color: '#007bff',
                transition: 'color 0.3s', // Smooth transition for color change
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleAddToCart(); // Call the add to cart function
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0056b3'; // Change to a darker shade on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#007bff'; // Restore original color
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                setQuantity((prev) => prev + 1); // Increase quantity
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
        {/* Edit Product Button */}
        <Button
          variant="outlined"
          size="small"
          style={{ width: '48%', fontSize: '12px', height: '30px' }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            navigate(`/edit-product/${product._id}`, { state: { product } });
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;