import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../utilies/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { categoriesData } from "../../static/data";
import styles from "../../styles/styles";
import { createNewProduct } from "../../features/products/productService";

const createProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("catefory is required"),
  tags: yup.string().required("Tags is required"),
  orignalPrice: yup.string().required("price required"),
  discountPrice: yup.string(),
  stock: yup.string(),
});
const CreateProduct = function () {
  const { shopAuthendicate } = useSelector((state) => state.shop);
  //  const{product} = useSelector((state)=>state.product)

  useEffect(() => {}, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      orignalPrice: "",
      discountPrice: "",
      stock: "",
    },
    validationSchema: createProductSchema,

    onSubmit: (value) => {
      dispatch(createNewProduct(value));
    },
  });

  return (
    <>
      <div className="w-[90%]  800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>

        <form onSubmit={formik.handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>

            <CustomInput
              type="text"
              name="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleChange("name")}
              value={formik.values.name}
              autoComplete="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>

            <CustomInput
              type="text"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleChange("description")}
              value={formik.values.description}
              autoComplete="description"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <br />

          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>

            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
            >
              <option value="Choose a category">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Tags <span className="text-red-500">*</span>
            </label>

            <CustomInput
              type="text"
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleChange("tags")}
              value={formik.values.tags}
              autoComplete="tags"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <br />
          <div>
            <label className="pb-2">Original Price</label>
            <CustomInput
              type="number"
              name="orignalPrice"
              onChange={formik.handleChange("orignalPrice")}
              onBlur={formik.handleBlur("orignalPrice")}
              value={formik.values.orignalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <br />
          <div>
            <label className="pb-2"> Price (With Discount)</label>
            <CustomInput
              type="number"
              name="discountPrice"
              onChange={formik.handleChange("discountPrice")}
              onBlur={formik.handleBlur("discountPrice")}
              value={formik.values.discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="pb-2">Product Stock</label>
            <CustomInput
              type="type"
              name="stock"
              onChange={formik.handleChange("stock")}
              onBlur={formik.handleBlur("stock")}
              value={formik.values.stock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {/* <img src={URL.createObjectURL(i)} alt="" /> */}
          </div>

          <div className={`${styles.button} text-center`}>
            {/* <input type="submit"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            
            > Create</input> */}

            <button type="submit" className="text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
