import axios from "axios";
import { base_url } from "../../utilies/base_url";

export const getAllOrdersFromServer = () => async (dispatch) => {
  try {
    dispatch({ type: "orderUserGetRequest" });

    const { data } = await axios.get(`${base_url}order/order-users`, {
      withCredentials: true,
    });

    dispatch({ type: "orderUserGetSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "orderUSerGetFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllShopOrderFromServer = () => async (dispatch) => {
  try {
    dispatch({ type: "orderShopGetRequest" });

    const { data } = await axios.get(`${base_url}order/order-shop`, {
      withCredentials: true,
    });

    dispatch({ type: "orderShopGetSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "orderShopGetFail",
      payload: error.response.data.message,
    });
  }
};
