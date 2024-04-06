import { addTaskToList ,removeFromCartSlice} from "./cartSlice";

export const addToCart = (data) => async (dispatch, getState) => {
  dispatch(addTaskToList(data));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch(removeFromCartSlice(data));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));


  return data;
};
