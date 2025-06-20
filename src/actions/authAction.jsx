import { actionType } from "../helper";

// check if user is logged in
export const isSignedIn = () => {
  console.log(`[action]SIGN_IN`);
  return {
    type: actionType.TOGGLE_SIGN_IN,
  };
};

export const setRole = (role) => {
  return {
    type: actionType.SET_ROLE,
    payload: role, // The role of the user, e.g., 'admin' or 'regular'
  };
};

export const setName = (name) => {
  return {
    type: actionType.SET_NAME,
    payload: name,
  };
};