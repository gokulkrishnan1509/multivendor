import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/ProductPage";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  ProductDetailsPage,
  ProfilePage,
  ChekoutPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderSuccessPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./Router";

import {
  ShopDashBoardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./shopRoutes/shopRoutes";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw
} from "./adminRoute/superadminRoutes";
import AdminProtectRoute from "./Protect/protectedAdminRoutes";
import ProtectedRoute from "./Protect/ProdectedRoutes";
import { ShopHomePage } from "./ShopRoutes.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetLoginUser, isAunthundicatedUser } from "./features/user/userSlice";
import { loadSellerOnServer } from "./features/seller/sellerSlice";
import SellerProtected from "./Protect/SellerProctedRoutes";
import Payment from "./components/Payment/Payment.jsx";
import axios from "axios";
import { base_url } from "./utilies/base_url.jsx";

function App() {
  const dispatch = useDispatch();
  const { isLoading, userAuthorized, user } = useSelector(
    (state) => state.auth
  );
  const { isSuccess, shopAuthendicate } = useSelector((state) => state.shop);
  const [stripeApiKey, setStripeKey] = useState("");

  // async function getStripeApiKey(){
  //   const {data}  = await axios.get(`${base_url}`)
  // }

  useEffect(() => {
    // let timeOut = setInterval(() => {
    dispatch(isAunthundicatedUser());
    dispatch(loadSellerOnServer());
    dispatch(GetLoginUser());
    // }, 500);

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, []);
  return (
    <>
      {/* {isLoading ? null : ( */}
      <>
        <BrowserRouter>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Elements>
          )}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <ChekoutPage />
                </ProtectedRoute>
              }
            />

            <Route path="/payment" element={<Payment />} />
            {/* <Router path="/product/:id" element={<EventDetailsPage/>}/> */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inbox"
              element={
                <ProtectedRoute>
                  <UserInbox />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route path="/order/success/:id" element={<OrderSuccessPage />} />

            {/* shop ------routes */}

            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/seller-activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/shoplogin" element={<ShopLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                //
                // <SellerProtected>
                  <ShopHomePage />
                // </SellerProtected>
              }
            />
            <Route
              path="/dashboard"
              element={
                // <SellerProtected>
                  <ShopDashBoardPage />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-create-product"
              element={
                // <SellerProtected>
                  <ShopCreateProduct />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-products"
              element={
                // <SellerProtected>
                  <ShopAllProducts />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-create-event"
              element={
                // <SellerProtected>
                  <ShopCreateEvents />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-withdraw-money"
              element={
                // <SellerProtected>
                  <ShopWithDrawMoneyPage />
                // </SellerProtected>
              }
            />

            <Route
              path="/settings"
              element={
                // <SellerProtected>
                  <ShopSettingsPage />
                // </SellerProtected>
              }
            ></Route>

            <Route
              path="/order/:id"
              element={
                // <SellerProtected>
                  <ShopOrderDetails />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-orders"
              element={
                // <SellerProtected>
                  <ShopAllOrders />
                // </SellerProtected>
              }
            />
            <Route
              path="/dashboard-events"
              element={
                // <SellerProtected>
                  <ShopAllEvents />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-coupons"
              element={
                // <SellerProtected>
                  <ShopAllCoupons />
                // </SellerProtected>
              }
            />

            <Route
              path="/dashboard-refunds"
              element={
                // <SellerProtected>
                  <ShopAllRefunds />
                // </SellerProtected>
              }
            />

            <Route
              path="/user/track/order/:id"
              element={
                <ProtectedRoute>
                  <TrackOrderPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard-messages"
              element={
                // <SellerProtected>
                  <ShopInboxPage />
                // </SellerProtected>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectRoute>
                  <AdminDashboardPage />
                </AdminProtectRoute>
              }
            />

            <Route
              path="/admin/admin-users"
              element={
                <AdminProtectRoute>
                  <AdminDashboardUsers />
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/admin-sellers"
              element={
                <AdminProtectRoute>
                  <AdminDashboardSellers />
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/admin-orders"
              element={
                <AdminProtectRoute>
                  <AdminDashboardOrders />
                </AdminProtectRoute>
              }
            />

            <Route
              path="/admin/admin-products"
              element={
                <AdminProtectRoute>
                  <AdminDashboardProducts />
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/admin-events"
              element={
                <AdminProtectRoute>
                  <AdminDashboardEvents />
                </AdminProtectRoute>
              }
            />

            <Route
              path="/admin/admin-withdraw-request"
              element={
                <AdminProtectRoute>
                  <AdminDashboardWithdraw />
                </AdminProtectRoute>
              }
            />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      </>
      {/* )} */}
    </>
  );
}

export default App;
