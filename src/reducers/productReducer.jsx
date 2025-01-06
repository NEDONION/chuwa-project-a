import { actionType } from "../helper";

const initState = [];

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.ADD_PRODUCT:
            console.log(`[reducer]ADD_PRODUCT`, action.payload);         
            return [...state, action.payload]; // add new product to array
        default:
            return state;
    }
};

export default productReducer;