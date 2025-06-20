import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../actions/productAction';
import ProductForm from '../components/ProductForm';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '', // Quantity to match backend field
    imageLink: '', // Image link to match backend field
  });

  const handleProductChange = (updatedProduct) => {
    setProduct(updatedProduct);
  };

  const handleSubmit = () => {
    console.log("Submitting product:", product);
    dispatch(addProduct(product));
    navigate('/'); 
  };

  return (
      <ProductForm
          initVals={product}
          onChange={handleProductChange}
          onSubmit={handleSubmit}
          btnLabel="Add Product"
          title="Create Product"
      />
  );
};

export default CreateProduct;
