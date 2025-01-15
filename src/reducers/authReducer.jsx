import { actionType } from "../helper";

const initialState = {
    signedIn: false, 
    role: null, // Default role is null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TOGGLE_SIGN_IN:
            return {
                ...state,
                signedIn: !state.signedIn, 
            };
        case actionType.SET_ROLE:
            return {
                ...state,
                role: action.payload, // Set the user role from the payload
            };
        default:
            return state;
    }
};

export default authReducer;