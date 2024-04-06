import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data";
import {
  CreateCoupon,
  getShopCoupon,
} from "../../features/coupons/couponService";
import { getAllProductShop } from "../../features/products/productService";
function AllCoupons() {
  const [open, setOpen] = useState(false);
  const [setCategory, setSelectCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    minAmount: "",
    maxAmount: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...formData, setCategory: setCategory };
    dispatch(CreateCoupon(data));
    const validationError = validateForm(formData);
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.value) {
      errors.value = "Value is required";
    }

    if (!data.minAmount) {
      errors.minAmount = "minAmount is required";
    }
    if (!data.maxAmount) {
      errors.maxAmount = "maxAmount is required";
    }

    return errors;
  };

  // *************************************************************
  const { getShopToken } = useSelector((state) => state?.coupon);
  const { shopProduct } = useSelector((state) => state?.product);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getShopCoupon());
      dispatch(getAllProductShop());
      return () => {
        clearTimeout(timeOut);
      };
    }, 500);
  }, [dispatch]);
  // ***************************************************************
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    {
      field: "Preview",
      headerName: "",
      flex: 0.8,
      minWidth: 100,
      type: "number",
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <button>
                <AiOutlineEye size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  getShopToken &&
    getShopToken.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        price: item?.value + "%",
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create Coupon Code</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />

        {open && (
          <>
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000]  flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end ">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon code
                </h5>

                {/* create Coupon Code */}

                <form onSubmit={handleSubmit}>
                  <br />

                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border-gray-300 rounded-[3px]"
                      placeholder="Enter name"
                    />
                    <div className="error">{errors.name}</div>
                  </div>

                  <br />

                  <div>
                    <label className="pb-2">
                      Discont Percentage
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="value"
                      onChange={handleChange}
                      value={formData.value}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    />

                    <div className="error">{errors.value}</div>
                  </div>

                  <div>
                    <label className="pb-2">
                      Max Amount <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={formData.maxAmount}
                      name="maxAmount"
                      onChange={handleChange}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    />

                    <div className="error">{errors.maxAmount}</div>
                  </div>

                  <div>
                    <label className="pb-2">
                      Min Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.minAmount}
                      name="minAmount"
                      onChange={handleChange}
                      placeholder="Min amount"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                    />
                    <div className="error">{errors.minAmount}</div>
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">
                      Selected Products <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={setCategory}
                      onChange={(e) => setSelectCategory(e.target.value)}
                    >
                      <option value="Choose your selected products"></option>
                      {categoriesData &&
                        categoriesData.map((i, j) => (
                          <option value={i.title} key={j}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button className="mt-7 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AllCoupons;
