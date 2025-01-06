import React from 'react';
import { useDispatch } from 'react-redux';
import addProduct from '../actions/productAction';


const CreateProduct = () => {
    const dispatch = useDispatch();
  
    const handleAddProduct = () => {
      const newProduct = {
        name: 'iWatch',
        price: 50,
        quantity: 100,
      };
      dispatch(addProduct(newProduct));
    };
  
    return (
      <button onClick={handleAddProduct}>Add Product</button>
    );
  };
  
  export default CreateProduct;