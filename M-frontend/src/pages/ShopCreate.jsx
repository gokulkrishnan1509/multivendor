import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../features/seller/sellerSlice";

const ShopCreatePage = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {shopAuthendicate, isSeller } = useSelector((state) => state.shop);
  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${shopAuthendicate._id}`);
      dispatch(resetState())

    }
  }, [isSeller]);
  return (
    <>
      <div>
        <ShopCreate />
      </div>
    </>
  );
};

export default ShopCreatePage;
