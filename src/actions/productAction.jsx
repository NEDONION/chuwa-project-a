import { actionType } from "../helper";


// Action Creators
const addProduct = (product) => {
  return {
    type: actionType.ADD_PRODUCT,
    payload: product,
  };
};

export default addProduct;
