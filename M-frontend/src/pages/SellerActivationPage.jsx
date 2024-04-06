import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  activateShopOnServer,
  resetState,
} from "../features/seller/sellerSlice";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const dispatch = useDispatch();
  const { isError } = useSelector((user) => user?.shop);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(resetState());
      dispatch(activateShopOnServer( activation_token ));
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [activation_token]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isError ? (
          <p>Your token is expired</p>
        ) : (
          <p>Your account has been created successfully</p>
        )}
      </div>
    </>
  );
};

export default SellerActivationPage;
