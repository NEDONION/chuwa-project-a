import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {editProduct} from '../actions/productAction';
import ProductForm from '../components/ProductForm';

// If you want to edit a product, you should pass the product state from the <ProductList> component
// {state:{product}}
const EditProduct = () => {

    const dispatch = useDispatch();
    const location = useLocation(); // access the state object passed through the link
    // const navigate = useNavigate();

    const {product: currentProduct} = location.state || {}; // destructure

    const [product, setProduct] = useState(currentProduct);
    // Update the product state when changes are made in the form
    const handleProductChange = (updatedProduct) => {
        setProduct(updatedProduct);
    };

    const handleSubmit = () => dispatch(editProduct(product));

    return (
        <ProductForm
            initVals={product}
            onChange={handleProductChange}
            onSubmit={handleSubmit}
            btnLabel='Edit Product'
            title='Edit Product'
        />
    )

}

export default EditProduct;