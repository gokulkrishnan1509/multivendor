import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../utilies/CustomInput";
import * as yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import Dropzone from "react-dropzone";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { uploadUserImage } from "../features/upload/uploadslice";
import { registerUser } from "../features/user/userSlice";
import axios from "axios";
import { base_url } from "../utilies/base_url";
import { resetState } from "../features/seller/sellerSlice";
const signupSchema = yup.object({
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email is Required"),
  name: yup.string().required("Name is Required"),
  password: yup.string().required("Password is Required"),
});

const Signup = () => {
  const [visible, setVisible] = useState(false);
  
  // const {userImage} =useSelector((state)=>state?.upload)
  // console.log(userImage)
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      // console.log(values)
      dispatch(resetState())

      handleFileInputChange(values);
    },
  });

  function handleFileInputChange(values) {
    dispatch(registerUser(values));
  }



  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a new user
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <CustomInput
                    type="name"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />

                  <div className="error">
                    {formik.touched.name && formik.errors.name ? (
                      <div> {formik.errors.name} </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <CustomInput
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div> {formik.errors.email} </div>
                    ) : null}
                  </div>
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
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
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
                    {formik.touched.password && formik.errors.password ? (
                      <div> {formik.errors.password} </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>

                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span> Upload a file</span>
                    <CustomInput
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      // onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div> */}
              {/* <Dropzone
                onDrop={(acceptedFiles) => {
                  dispatch(uploadUserImage(acceptedFiles));
                }}
                className="dropzone-container"
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="dropzone-content "
                    >
                      <input {...getInputProps()} className="border" />
                      <p className="signup-RxAvatar"><RxAvatar className=""/></p>
                    </div>
                  </section>
                )}
              </Dropzone> */}
{/* 
              <div className="d-flex ">
                {Array.isArray(userImage) && userImage.length>0 && userImage?.map((i,j)=>{
                  return(
                    <div className="position-relative" key={j}>
                      <button type="button" className="btn-close position-absolute" style={{top:"10px",right:"10px"}}></button>
                      {/* <img src={`http://localhost:1509/api/uploads/${i.userimage}`} alt="image" width={100} height={100} /> */}
                      {/* <img src={`http://localhost:1509/api/upload/user-upload/${i.userimage}`} alt={`image ${j}`} width={100} height={100} /> */}

                    {/* </div> */}
            
                  {/* ) */}
                {/* })} */}

              {/* </div> */} 

              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account ?</h4>
                <Link className="text-blue-600 pl-2" to="/">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
