import axios from "axios";
import { base_url } from "../../utilies/base_url";

const userUploadImg = async (data) => {
  const response = await axios.put(`${base_url}upload/user-upload`,data);
  if (response.data) {
    return response.data;
  }
};

const uploadImage = {
  userUploadImg,
};
export default uploadImage;
