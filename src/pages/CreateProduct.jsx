import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {addProduct} from '../actions/productAction';
import ProductForm from '../components/ProductForm';


const CreateProduct = () => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        'name': '',
        'description': '',
        'category': '',
        'price': '',
        'quantity': '',
        'imageLink': ''
    });

    // Update the product state when changes are made in the form
    const handleProductChange = (updatedProduct) => {
        setProduct(updatedProduct);
    };

    const handleSubmit = () => dispatch(addProduct(product));

    return (
        <ProductForm
            initVals={product}
            onChange={handleProductChange}
            onSubmit={handleSubmit}
            btnLabel='Add Product'
            title='Create Product'
        />
    )
}

export default CreateProduct;