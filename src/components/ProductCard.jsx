import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleViewDetails = () => {
    navigate(`/detail/${product._id}`); // Navigate to `/detail/:id` page with product ID
  };

  const handleEditProduct = (e) => {
    e.stopPropagation(); // Prevent the card's click event from triggering
    navigate(`/edit-product/${product._id}`, { state: { product } }); // Navigate to `/edit-product/:id` with product data
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
      onClick={handleViewDetails} // Navigate to detail page on card click
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
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ width: '48%', fontSize: '12px', height: '30px' }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            alert('Added to cart');
          }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          size="small"
          style={{ width: '48%', fontSize: '12px', height: '30px' }}
          onClick={handleEditProduct} // Navigate to edit-product
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;