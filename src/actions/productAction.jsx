import { actionType } from "../helper";


// Action Creators


export const fetchProduct = () => async (dispatch) => {
  // Fetch data from API
  const response = await fetch('fetch-url', {
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
    const response = await fetch('create-url', {
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

export const editProduct = (updatedProduct) => async (dispatch) => {
  console.log(`[action]editProduct`);
  try{
    const response = await fetch('edit-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    dispatch({
      type: actionType.EDIT_PRODUCT,
      payload: updatedProduct, // Newly added product
    });

  }catch (err) {
    console.error('Error editing product:', err);
  }
  
}
const productActions = {
  fetchProduct,
  addProduct,
  editProduct,
};

export default productActions;
// export default addProduct;
