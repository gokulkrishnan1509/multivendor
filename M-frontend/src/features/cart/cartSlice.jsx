import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

// export const cartReducer = createReducer(initialState, {
//   addToCart: (state, action) => {
//     const item = action.payload;
//     const itemExist = state.cart.find((i) => i._id === item._id);
//     if (itemExist) {
//       return {
//         ...state,
//         cart: state.cart.map((i) => (i._id === itemExist._id ? item : i)),
//       };
//     } else {
//       return {
//         ...state,
//         cart: [...state.cart, item],
//       };
//     }
//   },

//   removeFromCart: (state, action) => {
//     return {
//       ...state,
//       cart: state.cart.filter((i) => i._id === action.payload),
//     };
//   },
// });

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const item = action.payload;
      const itemExist = state.cart.find((i) => i?._id === item?._id);
    

      if (itemExist) {

        return {
          ...state,
          cart: state.cart.map((i) => i?._id === itemExist?._id ? item : i),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },

    removeFromCartSlice: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((i) => i?._id !== action.payload?._id),
      };
    },
  },
});



export const {addTaskToList,removeFromCartSlice} = cartSlice.actions

export default cartSlice.reducer