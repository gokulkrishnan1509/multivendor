import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWish: (state, action) => {
      const item = action.payload;
      const itemExist = state.wishlist.find((i) => i._id == item._id);

      if (itemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) =>
            i._id === itemExist._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },
    removeFromWish: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i._id !== action.payload._id),
      };
    },
  },
});

export const { addToWish, removeFromWish } = wishlistSlice.actions;
export default wishlistSlice.reducer;
