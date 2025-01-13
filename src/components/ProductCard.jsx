import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleViewDetails = () => {
    navigate(`/detail/${product._id}`); // Navigate to `/detail/:id` page with product ID
  };

  return (
    <Card
      style={{
        width: '242px',
        height: '303px',
        margin: '10px auto',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
      }}
      onClick={handleViewDetails} // Add click event to navigate
    >
      <CardMedia
        component="img"
        height="70%"
        image={product.imageUrl}
        alt={product.name}
        style={{ objectFit: 'contain', padding: '5px' }}
      />
      <CardContent style={{ textAlign: 'left', padding: '10px' }}>
        <Typography variant="subtitle2" style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '5px' }}>
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary" style={{ fontSize: '16px', marginBottom: '5px' }}>
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;