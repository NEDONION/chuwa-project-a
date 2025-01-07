// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer'; // Import your slice(s)

const store = configureStore({
  reducer: {
    products: productReducer, // Add your reducers here
  }
});

export default store;
