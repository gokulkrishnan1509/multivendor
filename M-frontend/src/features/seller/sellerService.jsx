import axios from "axios";
import { base_url } from "../../utilies/base_url";

async function sellerActivation(userToken) {

  const response = await axios.post(
    `${base_url}shop/activation`,
    { activation_token: userToken },
    { withCredentials: true }
  );
  if (response.data) {
    return response.data;
  }
}

let sellerRegistration = async function (userData) {

  const response = await axios.post(`${base_url}shop/create-shop`, userData);
  if (response.data) {
    return response.data;
  }
};



const sellerLogin = async function(userData){
  const response = await axios.post(`${base_url}shop/login`,userData,{withCredentials:true})
  if(response.data){
    return response.data
  }
}

let loadSeller = async function () {
  const response = await axios.get(`${base_url}shop/load-shop`, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};
const sellerService = {
  sellerActivation,
  sellerRegistration,
  loadSeller,
  sellerLogin
};

export default sellerService;
