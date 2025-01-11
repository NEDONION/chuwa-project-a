import { actionType } from "../helper";

const initState = {
    products: [], // Store current page's products
    total: 0, // Total number of products across all pages
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCT:
            console.log(`[reducer]FETCH_PRODUCT`, action.payload);
            return {
                ...state, // Preserve existing state
                products: action.payload.products || [], // Replace products array with the latest data for the current page
                total: action.payload.total || 0, // Update the total count of products
            };

        case actionType.ADD_PRODUCT:
            console.log(`[reducer]ADD_PRODUCT`, action.payload);
            return {
                ...state,
                products: [...state.products, action.payload], // Add the new product to the current page's products
                total: state.total + 1, // Increment total count
            };

        case actionType.EDIT_PRODUCT:
            console.log(`[reducer]EDIT_PRODUCT`, action.payload);
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                ), // Update the specific product in the products array
            };

        default:
            return state; // Return the unchanged state for unmatched action types
    }
};

export default productReducer;