import { actionType } from "../helper";

const initialState = {
    signedIn: false, 
    role: null, // Default role is null
    name: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TOGGLE_SIGN_IN:
            return {
                ...state,
                signedIn: typeof action.payload === 'boolean' ? action.payload : !state.signedIn, 
            };
        case actionType.SET_ROLE:
            return {
                ...state,
                role: action.payload, // Set the user role from the payload
            };
        case actionType.SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;