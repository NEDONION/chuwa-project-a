import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { editProduct } from '../actions/productAction';
import ProductForm from '../components/ProductForm';

// If you want to edit a product, you should pass the product state from the <ProductList> component
// {state:{product}}
const EditProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const { product: currentProduct } = location.state || {}; 
    console.log("currentProduct in EditProduct:", currentProduct);

    const [product, setProduct] = useState({
        ...currentProduct, 
        quantity: currentProduct?.inStockQuantity || '', 
        imageLink: currentProduct?.imageUrl || '', 
    });
    console.log("Initial product state:", product); 

    const handleProductChange = (updatedProduct) => {
        setProduct({
            ...product, 
            ...updatedProduct, 
        });
    };

    const handleSubmit = async () => {
        console.log("Submitting product:", product); 
        console.log("Product ID:", product._id);
    
        // Dispatch edit product action
        await dispatch(editProduct(product)); 
    
        // Navigate to ProductDetail page using product._id
        navigate(`/detail/${product._id}`);
    };

    return (
        <ProductForm
            initVals={product}
            onChange={handleProductChange}
            onSubmit={handleSubmit}
            btnLabel='Edit Product'
            title='Edit Product'
        />
    );
};

export default EditProduct;