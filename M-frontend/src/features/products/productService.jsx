import axios from "axios";
import { base_url } from "../../utilies/base_url";

export const createNewProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = { headers: { "content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${base_url}product/create-product`,
      newForm,
      { withCredentials: true }
    );
    dispatch({ type: "productCreateSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllProductShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(`${base_url}product/get-shop-product`, {
      withCredentials: true,
    });
    dispatch({ type: "getAllProductsShopSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

//

export const deleteProductRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${base_url}product/delete-product/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteProductShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const productRequest = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductRequest" });

    const { data } = await axios.get(`${base_url}product/get-product`);

    dispatch({
      type: "getAllProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const SellerProductRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSellerProductDetailsRequest" });
    const { data } = await axios.get(`${base_url}product/get-seller-product/${id}`);

    dispatch({
      type: "getSellerProductDetailsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getSellerProductDetailsFailed",
      payload: error.response.data.message,
    });
  }
};
