import { actionType } from "../helper";

const initState = [];

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCT:
            console.log(`[reducer]FETCH_PRODUCT`, action.payload);
            return action.payload;  // replace current state with fetched data
  
        case actionType.ADD_PRODUCT:
            console.log(`[reducer]ADD_PRODUCT`, action.payload);         
            return [...state, action.payload]; // add new product to array

        case actionType.EDIT_PRODUCT:
            console.log(`[reducer]EDIT_PRODUCT`, action.payload);         
            return state.map((product) => 
                product.id === action.payload.id? action.payload : product); // update product in array
        default:
            return state;
    }
};



export default productReducer;