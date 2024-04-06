import axios from "axios";
import { base_url } from "../../utilies/base_url";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/user-details`, userData);
  if (response.data) {
    return response.data;
  }
};

const activationToken = async function (userToken) {
  const response = await axios.post(
    `${base_url}user/user-activation`,
    userToken,
    { withCredentials: true }
  );
  if (response.data) {
    return response.data;
  }
};

async function userLogin(userData) {
  const response = await axios.post(`${base_url}user/user-login`, userData, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
}

const authandicateUser = async () => {
  const response = await axios.get(`${base_url}user/getuser`, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
};

const updateUserInformation = async (data) => {
  const response = await axios.patch(`${base_url}user/patch-user`, data, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};

const userLogOut = async function () {
  const response = await axios.get(`${base_url}user/logout`, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};

const getUser = async function () {
  const response = await axios.get(`${base_url}user/get-user`, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data.existUser;
  }
};

const updateUSerAddressRequest = async function (data) {
  const response = await axios.patch(`${base_url}user/update-address`, data, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};

const userDeleteAddressRequest = async function (data) {
  const response = await axios.delete(`${base_url}user/delete-user/${data}`, {
    withCredentials: true,
  });
  if (response.data) {
    return response.data;
  }
};

const updatePassword = async function(data){
  const response = await axios.patch(`${base_url}user/update-password`,data,{withCredentials:true})

  if(response.data){
    return response.data
  }
}
const userService = {
  register,
  activationToken,
  userLogin,
  authandicateUser,
  userLogOut,
  updateUserInformation,
  getUser,
  updateUSerAddressRequest,
  userDeleteAddressRequest,
  updatePassword
};

export default userService;
