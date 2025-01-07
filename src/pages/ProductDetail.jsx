import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Grid, Chip } from '@mui/material';

const ProductDetail = () => {

    const navigate = useNavigate()
    // const location = useLocation()

    // const { product } = location.state || {}; // destructure the productId from the location state

    // if (!product) {
    //     return <Typography variant="h6">No product details available.</Typography>;
    // }

    const product = {
        id: 1,
        name: 'Meta Quest2 VR headset',
        description:
            'Hundreds of hit games, one-of-a-kind experiences, live events, new ways to stay fit, and a growing community.',
        category: 'electric product',
        price: 299,
        quantity: 0,
        imageLink: 'https://picsum.photos/id/237/200/300'
    }

    return (
        <div>
            <h2 style={{textAlign: 'left', marginTop: 0}}>Product Detail</h2>
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
                        src={product.imageLink}
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
                        label={product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        color={product.quantity > 0 ? 'success' : 'error'}
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
                        onClick={() => navigate(`/edit-product/${product.id}`, { state: { product } })}
                        >
                        Edit
                        </Button>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
        
    )

};

export default ProductDetail;