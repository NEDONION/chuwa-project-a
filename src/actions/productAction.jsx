import { actionType } from "../helper";


// Action Creators
// Fetch all products from the backend
export const fetchProducts = ({ page, sortBy, order, limit }) => async (dispatch) => {
  try {
    // Dynamically construct the URL with query parameters
    const url = `http://localhost:5001/api/products?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
    console.log("Fetching URL:", url); // Log the constructed URL

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    console.log("Data fetched:", data); // Log the response data

    dispatch({
      type: actionType.FETCH_PRODUCT,
      payload: data, // Pass fetched products to the reducer
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Add a new product to the backend
export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5001/api/products', {
      method: 'POST',

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(product), // Send the new product details
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const newProduct = await response.json(); // Get the newly created product from the server

    dispatch({
      type: actionType.ADD_PRODUCT,
      payload: newProduct, // Pass new product to the reducer
    });

  } catch (error) {
    console.error('Error adding product:', error);
  }
};

// Edit an existing product in the backend
export const editProduct = (updatedProduct) => async (dispatch) => {

  console.log(`[action]editProduct`);
  try {
    const response = await fetch(`http://localhost:5001/api/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedProduct), // Send updated fields
    });

    if (!response.ok) {
      throw new Error('Failed to edit product');
    }

    const updatedData = await response.json();

    dispatch({
      type: actionType.EDIT_PRODUCT,
      payload: updatedData, // Pass updated product to the reducer
    });

  } catch (error) {
    console.error('Error editing product:', error);
  }
};

const productActions = {
  fetchProducts,
  addProduct,
  editProduct,
};

export default productActions;