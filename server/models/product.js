import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'], // Product name
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'], // Product description
    },
    category: {
      type: String,
      required: [true, 'Please select a category'], // Product category
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'], // Product price
      min: [0, 'Price must be greater than or equal to 0'], // Minimum price validation
    },
    inStockQuantity: {
      type: Number,
      required: [true, 'Please add the stock quantity'], // Stock quantity
      min: [0, 'Stock quantity must be greater than or equal to 0'], // Minimum stock validation
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image link'], // Product image URL
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

