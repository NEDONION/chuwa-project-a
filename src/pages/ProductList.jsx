import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import ProductCard from '../components/ProductCard';
import { Button, Select, MenuItem, Grid, Pagination } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.products); // Simplified
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');
  const limit = 10;

  // Fetch products when page, sortBy, or order changes
  useEffect(() => {
    console.log("Fetching products with:", { page, sortBy, order, limit });
    dispatch(fetchProducts({ page, sortBy, order, limit }));
  }, [dispatch, page, sortBy, order]);

  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setPage(value);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort === 'price-desc' ? 'price' : selectedSort);
    setOrder(selectedSort === 'createdAt' ? 'desc' : selectedSort === 'price-desc' ? 'desc' : 'asc');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Products</h2> 
        <div style={{ display: 'flex', gap: '10px' }}>
        <Select
          value={sortBy === 'price' && order === 'desc' ? 'price-desc' : sortBy} // 显示正确的标签
          onChange={handleSortChange}
          style={{ width: '200px' }}
        >
          <MenuItem value="createdAt">Last added</MenuItem>
          <MenuItem value="price">Price: low to high</MenuItem>
          <MenuItem value="price-desc">Price: high to low</MenuItem>
        </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = '/create-product')}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        {(products || []).map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            key={product._id}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProductCard
              product={product}
              onViewDetails={() => navigate(`/detail/${product._id}`)} 
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default ProductList;