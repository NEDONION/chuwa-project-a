import mongoose from 'mongoose';

// Define the schema for the Product collection
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'], // Product name is required
      trim: true, // Remove extra spaces
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'], // Product description is required
      trim: true, // Remove extra spaces
    },
    category: {
      type: String,
      required: [true, 'Please select a category'], // Category is required
      trim: true, // Remove extra spaces
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'], // Price is required
      min: [0, 'Price must be greater than or equal to 0'], // Minimum price validation
    },
    inStockQuantity: {
      type: Number,
      required: [true, 'Please add the stock quantity'], // Stock quantity is required
      min: [0, 'Stock quantity must be greater than or equal to 0'], // Minimum stock validation
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'], // Image URL is required
      validate: {
        validator: function (v) {
          // Validate that the string is a URL
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg|gif|bmp))$/i.test(v);
        },
        message: 'Please provide a valid image URL', // Error message for invalid URL
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model
export default Product;