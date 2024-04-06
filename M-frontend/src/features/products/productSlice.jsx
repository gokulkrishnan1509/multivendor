import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: null,
  success: false,
  error: null,

  shopProduct: [],
  allProducts: [],
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })

    //getAllProductShop
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.shopProduct = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrorShop", (state) => {
      state.error = null;
    })
    // *******************************

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductShopSuccess", (state, action) => {
      state.isLoading = false;
      state.productDeleted = action.payload;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrorshopDelete", (state) => {
      state.error = null;
    })
    // ***************************************

    .addCase("getAllProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload.products;
    })
    .addCase("getAllProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrorProductDelete", (state) => {
      state.error = null;
    })
    .addCase("getSellerProductDetailsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getSellerProductDetailsSuccess", (state, action) => {
      state.isLoading = false;
      state.shopProductLength = action.payload?.products;
    })
    .addCase("getSellerProductDetailsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrorProductDetailsFailed", (state, action) => {
      state.error = null;
    });
});

export default productReducer;
