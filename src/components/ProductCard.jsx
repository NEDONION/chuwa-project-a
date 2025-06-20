import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const signedIn = useSelector((state) => state.auth.signedIn);

  // Encapsulated navigation logic
  const navigateToProductDetail = () => {
    navigate(`/detail/${product._id}`);
  };

  // 点击 ADD 按钮跳转到 商品详情页
  // 如果未登录，则跳转到登录页，并提示用户先登录
  const handleAddClick = (e) => {
    e.stopPropagation();
    if (!signedIn) {
      alert("Please sign in to view product details.");
      navigate('/signin');
    } else {
      navigateToProductDetail();
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
      onClick={navigateToProductDetail}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        alt={product.name}
        style={{ width: '100%', height: '240px', objectFit: 'contain', margin: 'auto' }}
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ width: '100%', fontSize: '12px', height: '30px' }}
          onClick={handleAddClick}
        >
          Add
        </Button>
        {role === 'Admin' && (
          <Button
            variant="outlined"
            size="small"
            style={{ width: '48%', fontSize: '12px', height: '30px', marginLeft: '4%' }}
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