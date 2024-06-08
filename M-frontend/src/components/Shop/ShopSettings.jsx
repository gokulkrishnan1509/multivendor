import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop } from "../../features/products/productService";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { base_url, image_url } from "../../utilies/base_url";
import axios from "axios";
import { toast } from "react-toastify";

function ShopSettings() {
  const { shopAuthendicate } = useSelector((state) => state.shop);
  const { shopProduct } = useSelector((state) => state?.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllProductShop());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const [name, setName] = useState(shopAuthendicate && shopAuthendicate?.name);
  const [description, setDescription] = useState(
    shopAuthendicate && shopAuthendicate?.description
      ? shopAuthendicate.description
      : ""
  );
  const [address, setAddress] = useState(
    shopAuthendicate && shopAuthendicate?.address
  );
  const [phoneNumber, setPhoneNumber] = useState(
    shopAuthendicate && shopAuthendicate?.phoneNumber
  );

  const [zipCode, setZipcode] = useState(
    shopAuthendicate && shopAuthendicate?.zipCode
  );

  const [avatar, setAvatar] = useState();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .patch(`${base_url}shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getAllProductShop());
        toast.success("Avartar updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .patch(
        `${base_url}shop/update-shop`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("profile updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
          <div className="w-full flex items-center justify-center">
            <div className="relative">
              <div className="w-[150px] h-[150px] border-2 border-[#3ad132] flex items-center justify-center overflow-hidden rounded-full ">
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : `${image_url}${shopAuthendicate?.avatar}`
                  }
                  alt=""
                  className=" w-full h-full object-cover cursor-pointer"
                />
              </div>

              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px] ">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          {/* shop info */}

          <form
            aria-aria-required={true}
            className="flex flex-col items-center"
            onSubmit={updateHandler}
          >
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Name</label>
              </div>

              <input
                type="text"
                placeholder={`${shopAuthendicate?.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label htmlFor="block pb-2">Shop description</label>
              </div>

              <input
                type="text"
                placeholder={`${
                  shopAuthendicate?.description
                    ? shopAuthendicate?.description
                    : "Enter your shop description"
                } `}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`$${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Address</label>
              </div>
              <input
                type="text"
                placeholder={shopAuthendicate?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Phone Number</label>
              </div>
              <input
                type="number"
                placeholder={shopAuthendicate?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block pb-2">Shop Zip Code</label>
              </div>
              <input
                type="number"
                placeholder={shopAuthendicate?.zipCode}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className={`${styles.input} !w-[95%] mb-0 800px:mb-0`}
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <input
                type="submit"
                value="Update Shop"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShopSettings;
