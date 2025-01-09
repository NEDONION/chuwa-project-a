import Product from '../models/product.js'; 

// Create a new product
export const createProduct = async (req, res) => {
    const {
      name,
      description,
      category,
      price,
      quantity, // Frontend field
      imageLink, // Frontend field
    } = req.body;
  
    try {
      // Map frontend fields to backend schema
      const product = new Product({
        name,
        description,
        category,
        price,
        inStockQuantity: quantity, // Map `quantity` to `inStockQuantity`
        imageUrl: imageLink, // Map `imageLink` to `imageUrl`
      });
  
      // Save the product to the database
      const savedProduct = await product.save();
  
      // Respond with the saved product
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error.message);
  
      // Check if it's a validation error and respond with a detailed message
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: messages });
      }
  
      // Respond with a generic server error
      res.status(500).json({ message: 'Server error' });
    }
  };

export const getAllProducts = async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'asc', page = 1, limit = 10 } = req.query; // Extract query parameters

    const skip = (page - 1) * limit; // Calculate how many documents to skip

    const products = await Product.find({})
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 }) // Sort products
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)); // Limit documents per page

    const total = await Product.countDocuments(); // Count total number of products

    res.status(200).json({ products, total }); // Send products and total count as response
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
};
