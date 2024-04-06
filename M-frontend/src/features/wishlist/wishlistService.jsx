import { addToWish, removeFromWish } from "./wishlistSlice";

export const addToWishList = (data) => async (dispatch, getState) => {
  dispatch(addToWish(data));

  localStorage.setItem(
    "wishlist",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

export const removeFromWishlist = (data) => async (dispatch, getState) => {

  dispatch(removeFromWish(data));

  localStorage.setItem(
    "wishlist",
    JSON.stringify(getState().wishlist.wishlist)
  );

  return data;
};
