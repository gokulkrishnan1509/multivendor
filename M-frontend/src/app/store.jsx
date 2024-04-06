import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/userSlice";
import imageSlice from "../features/upload/uploadslice";
import shopSlice from "../features/seller/sellerSlice";
import productReducer from "../features/products/productSlice";
import eventReducter from "../features/events/eventSlice";
import couponReducer from "../features/coupons/couponSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import orderReducer from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
    upload: imageSlice,
    cart: cartReducer,
    wishlist: wishlistSlice,
    product: productReducer,
    event: eventReducter,
    coupon: couponReducer,
    order:orderReducer
  },
});
