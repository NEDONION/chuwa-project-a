import { actionType } from "../helper";

const initState = {
    products: [], // Initialize as an empty array
    total: 0, // Initialize the total count
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCT:
            console.log(`[reducer]FETCH_PRODUCT`, action.payload);
            return {
                products: action.payload.products || [], // Ensure `products` is assigned properly
                total: action.payload.total || 0, // Ensure `total` is assigned properly
            };

        case actionType.ADD_PRODUCT:
            console.log(`[reducer]ADD_PRODUCT`, action.payload);
            return {
                ...state,
                products: [...state.products, action.payload], // Add new product to `products` array
            };

        case actionType.EDIT_PRODUCT:
            console.log(`[reducer]EDIT_PRODUCT`, action.payload);
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                ), // Update the specific product in the `products` array
            };

        default:
            return state; // Return the unchanged state for unmatched action types
    }
};

export default productReducer;