import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import ProductCard from '../components/ProductCard';
import { Button, Select, MenuItem, Grid, Pagination } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.products); // Get products and total from Redux store

  const [page, setPage] = useState(1); // Manage current page
  const [sortBy, setSortBy] = useState('price'); // Manage sort field
  const [order, setOrder] = useState('asc'); // Manage sort order
  const limit = 10; // Set items per page

  // Fetch products when page, sortBy, or order changes
  useEffect(() => {
    dispatch(fetchProducts({ page, sortBy, order, limit }));
  }, [dispatch, page, sortBy, order]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Update page
  };

  // Handle sort field and order change
  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort === 'price-desc' ? 'price' : selectedSort); // Update sortBy
    setOrder(selectedSort === 'price-desc' ? 'desc' : 'asc'); // Update order
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Products</h2> 
        <div style={{ display: 'flex', gap: '10px' }}>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            style={{ width: '200px' }} // Dropdown width
          >
            <MenuItem value="createdAt">Last added</MenuItem>
            <MenuItem value="price">Price: low to high</MenuItem>
            <MenuItem value="price-desc">Price: high to low</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = '/create-product')} // Redirect to create product page
          >
            Add Product
          </Button>
        </div>
      </div>
  
      {/* Product grid */}
      <Grid container spacing={2}> {/* Adjust spacing */}
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4} // Five cards in a row
            key={product._id}
            style={{ display: 'flex', justifyContent: 'center' }} // Center cards
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
  
      {/* Pagination */}
      <Pagination
        count={Math.ceil(total / limit)} // Calculate total pages
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default ProductList;