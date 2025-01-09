import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../actions/productAction';
import ProductForm from '../components/ProductForm';

const CreateProduct = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '', // Quantity to match backend field
    imageLink: '', // Image link to match backend field
  });

  // Update product state whenever form changes
  const handleProductChange = (updatedProduct) => {
    setProduct(updatedProduct);
  };

  // Dispatch action to add a new product
  const handleSubmit = () => {
    console.log("Submitting product:", product);
    dispatch(addProduct(product));
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