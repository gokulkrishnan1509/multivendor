import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateNewUser, resetState } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const ActivationPage = function () {
  const { activation_token } = useParams();
  const dispatch = useDispatch();
  const { isError } = useSelector((user) => user.auth);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(resetState());
      dispatch(activateNewUser({ activation_token }));
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
          <p>Your token is expired!</p>
        ) : (
          <p>Your account has been created successfully</p>
        )}
      </div>
    </>
  );
};

export default ActivationPage;
