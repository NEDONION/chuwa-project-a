import { actionType } from "../helper";


// Action Creators


export const fetchProduct = () => async (dispatch) => {
  // Fetch data from API
  const response = await fetch('db url', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }); 

  const data = await response.json();

  // Dispatch action to update state
  dispatch({
    type: actionType.FETCH_PRODUCT,
    payload: data,
  });
}

export const addProduct = (product) => async (dispatch) =>{
  console.log(`[action]addProduct`);
  try{
    const response = await fetch('db url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    dispatch({
      type: actionType.ADD_PRODUCT,
      payload: product, // Newly added product
    });
  }catch(err){
    console.error('Error fetching products:', err);
  }
  
  
};

// export const addProduct = (product) =>{
//   console.log('addProduct action!');
//   return{
//     type: actionType.ADD_PRODUCT,
//     payload: product, // Newly added product
//   };
// };

const productActions = {
  fetchProduct,
  addProduct,
};

export default productActions;
// export default addProduct;
