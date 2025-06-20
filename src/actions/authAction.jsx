import { actionType } from "../helper";

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const response = await fetch('http://localhost:5001/api/users/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        dispatch(setName(user.name));
        dispatch(setRole(user.role));
        dispatch({ type: actionType.TOGGLE_SIGN_IN, payload: true });
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      localStorage.removeItem('authToken');
    }
  }
};

// check if user is logged in
export const isSignedIn = () => {
  return {
    type: actionType.TOGGLE_SIGN_IN,
  };
};

export const setRole = (role) => {
  return {
    type: actionType.SET_ROLE,
    payload: role,
  };
};

export const setName = (name) => {
  return {
    type: actionType.SET_NAME,
    payload: name,
  };
};