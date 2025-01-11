import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Grid, Chip } from '@mui/material';

const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to access the passed state

    // Extract `product` from location state
    const { product } = location.state || {}; 

    // If no product is provided, show a message
    if (!product) {
        return <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>No product details available.</Typography>;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'left', marginTop: 0 }}>Product Detail</h2>
            <Box sx={{ 
                maxWidth: 800, 
                margin: 'auto', 
                padding: 4,
                backgroundColor: 'white', // Set white background for the whole container
                borderRadius: 2,
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={product.imageUrl} // Use `imageUrl` from product data
                            alt={product.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="overline" display="block" gutterBottom>
                            {product.category}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            ${product.price}{' '}
                            <Chip
                                label={product.inStockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                color={product.inStockQuantity > 0 ? 'success' : 'error'}
                            />
                        </Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            {product.description}
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                                Add To Cart
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(`/edit-product/${product._id}`, { state: { product } })}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ProductDetail;