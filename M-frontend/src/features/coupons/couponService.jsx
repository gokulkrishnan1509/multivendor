import axios from "axios";
import { base_url } from "../../utilies/base_url";

export const CreateCoupon = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "couponCreateRequest" });

    const { data } = await axios.post(
      `${base_url}coupon/coupon-post`,
      newForm,
      { withCredentials: true }
    );

    dispatch({ type: "couponCreateSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "couponCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const getShopCoupon = () => async (dispatch) => {
  try {
    dispatch({ type: "couponGetRequest" });
    const { data } = await axios.get(`${base_url}coupon/get-coupon`, {
      withCredentials: true,
    });
    dispatch({ type: "couponGetSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "couponGetFail", payload: error.response.data.message });
  }
};
