// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer'; // Import your slice(s)
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    products: productReducer, // Add your reducers here
    auth: authReducer,
  }
});

export default store;
