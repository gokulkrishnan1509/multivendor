import React, { useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../../utilies/CustomInput";
import * as yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetState,
  sellerRegistrationOnServer,
} from "../../features/seller/sellerSlice";
const shopSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.number().required("Number is required"),
  address: yup.string().required("Address is required"),
  zipcode: yup.string().required("ZipCode required"),
  password: yup.string().required("Password is required"),
  email: yup.string().required("Email is Required"),
});

const ShopCreate = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      zipcode: "",
      password: "",
      email: "",
    },
    validationSchema: shopSchema,
    onSubmit: async (values) => {
      dispatch(resetState());

      dispatch(sellerRegistrationOnServer(values));
    },
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a seller
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg  sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <CustomInput
                    type="type"
                    name="name"
                    id="name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    value={formik.values.name}
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />

                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Email
                </label>
                <div className="mt-1">
                  <CustomInput
                    type="email"
                    id="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />

                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Phone Number
                  </label>
                </div>
                <CustomInput
                  type="number"
                  id="number"
                  onChange={formik.handleChange("phone")}
                  onBlur={formik.handleBlur("phone")}
                  value={formik.values.phone}
                  autoComplete="phone"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                />

                <div className="error">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>

              <div className="mt-1">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                </div>

                <CustomInput
                  type="text"
                  id="address"
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  value={formik.values.address}
                  autoComplete="address"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="mt-1">
                <div>
                  <label
                    htmlFor="zipnumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                </div>
                <div>
                  <CustomInput
                    type="number"
                    id="zipnumber"
                    onChange={formik.handleChange("zipcode")}
                    onBlur={formik.handleBlur("zipcode")}
                    value={formik.values.zipcode}
                    autoComplete="zipcode"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="error">
                  {formik.touched.zipcode && formik.errors.zipcode}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <CustomInput
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}

                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account ?</h4>
                <Link className="text-blue-600 pl-2" to="/shoplogin">
                  shoplogin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreate;
