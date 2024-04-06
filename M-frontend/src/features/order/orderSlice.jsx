import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  order: null,
  success: false,
  error: null,
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("orderUserGetRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("orderUserGetSuccess", (state, action) => {
      state.isLoading = false;
      state.userOrders = action.payload;
      state.success = true;
    })
    .addCase("orderUSerGetFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("orderShopGetRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("orderShopGetSuccess", (state, action) => {
      state.isLoading = false;
      state.orderShop = action.payload;
      state.success = true;
    })
    .addCase("orderShopGetFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("clearGetUsetOrder", (state, action) => {
      state.error = null;
      state.success = false;
    });
});

export default orderReducer;
