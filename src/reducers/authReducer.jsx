import { actionType} from "../helper";


const initialState = {
    signedIn: false, // Default to not signed in
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TOGGLE_SIGN_IN:
            console.log(`[reducer]TOGGLE_SIGN_IN`); 
            return {
                ...state,
                signedIn: !state.signedIn, // Toggle the signedIn state
            };
        default:
            return state;
    }
};

export default authReducer;