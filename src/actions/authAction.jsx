import { actionType } from "../helper";

// check if user is logged in
export const isSignedIn = () => {
  console.log(`[action]SIGN_IN`);
  return {
    type: actionType.TOGGLE_SIGN_IN,
  };
};
