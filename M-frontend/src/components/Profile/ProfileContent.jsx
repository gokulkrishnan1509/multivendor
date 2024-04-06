import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import * as yup from "yup";
import CustomInput from "../../utilies/CustomInput";
import { useFormik } from "formik";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import {
  GetLoginUser,
  UpdateUserInformation,
  deleteUserAddress,
  updateUserAddress,
  updateUserPassword,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { getAllOrdersFromServer } from "../../features/order/orderAction";
import { Link } from "react-router-dom";

const profileContentSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required"),
  phoneNumber: yup.number().required("Number is Required"),

  // zipCode: yup.number().required("Zipcode is required"),
  // address1: yup.string().required("Address is Required"),
  // address2:yup.string().required("Address")
});

const ProfileContent = ({ active }) => {
  // const {}=useSelector((state)=>state.userPatch)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: profileContentSchema,
    onSubmit: (values) => {
      dispatch(UpdateUserInformation(values));
    },
  });

  return (
    <>
      <div className="w-full">
        {/* Profile page */}
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src="https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg"
                  alt="user-image"
                  className="w-[150px] h-[150px] rounded-full object-cover border-[#3ad132]"
                />

                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px]    right-[5px]">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full 800px:flex  block pb-3">
                  <div className="800px:w-[50%] w-[100%]">
                    <label htmlFor="" className="block pb-2">
                      Full Name
                    </label>

                    <CustomInput
                      type="text"
                      className="w-[95%] border p-1 rounded-[5px] mb-4 800px:mb-0 flex-1"
                      value={formik.values.name}
                      onBlur={formik.handleBlur("name")}
                      onChange={formik.handleChange("name")}
                    />
                  </div>

                  <div className="800px:w-[50%] w-[100%]">
                    <label htmlFor="" className="block pb-2">
                      Email
                    </label>

                    <CustomInput
                      type="text"
                      className="w-[95%] border p-1 rounded-[5px] mb-4 800px:mb-0"
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex block pb-3">
                  <div className="800px:w-[50%] w-[100%]">
                    <label htmlFor="" className="block pb-3">
                      Mobile
                    </label>
                    <CustomInput
                      type="number"
                      className="w-[95%] border p-1 rounded-[5px] mb-4 800px:mb-0"
                      value={formik.values.phoneNumber}
                      onBlur={formik.handleBlur("phoneNumber")}
                      onChange={formik.handleChange("phoneNumber")}
                    />
                  </div>

                  <div className="800px:w-[50%] w-[100%]">
                    <label htmlFor="" className="block pb-3">
                      Password
                    </label>

                    <CustomInput
                      type="password"
                      className="w-[95%] border p-1 rounded-[5px] mb-4 800px:mb-0"
                      value={formik.values.password}
                      onBlur={formik.handleBlur("password")}
                      onChange={formik.handleChange("password")}
                    />
                  </div>
                </div>

                <CustomInput
                  type="submit"
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-default`}
                  value="Update"
                />
              </form>
            </div>
          </>
        )}

        {active === 2 && (
          <div>
            <AllOrders />
          </div>
        )}

        {/* Refund Pages */}
        {active === 3 && (
          <div>
            <AllRefundOrders />
          </div>
        )}

        {/* Track order pages  */}
        {active === 5 && (
          <div>
            <TrackOrder />
          </div>
        )}

        {/* Payment method */}

        {active === 6 && (
          <div>
            <ChangePassword />
          </div>
        )}

        {/* user Address */}
        {active == 7 && (
          <div>
            <Address />
          </div>
        )}
      </div>
    </>
  );
};

function AllOrders() {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrdersFromServer());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue("status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  userOrders &&
    userOrders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });
  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
        ></DataGrid>
      </div>
    </>
  );
}

function AllRefundOrders() {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrdersFromServer());
  }, []);

  const eligibleOrder =
    userOrders &&
    userOrders.filter((item) => item.status === "Processing refund");
  const orders = [
    {
      _id: "684ue94hdfudsnfdsuudfsd",
      orderItems: [
        {
          name: "Iphone 15 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id,"status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrder &&
  eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });



  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
}

function TrackOrder() {

  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrdersFromServer());
  }, [])

  const orders = [
    {
      _id: "684ue94hdfudsnfdsuudfsd",
      orderItems: [
        {
          name: "Iphone 15 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue("status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
            <Button>
              <MdTrackChanges size={20} />
            </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];


  userOrders &&
  userOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
}

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const dispatch = useDispatch();
  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateUserPassword({ oldPassword, newPassword, confirmPassword })
      );
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };
  return (
    <>
      <div className="w-full px-5">
        <h1 className=" block text-[25px] font-[600] text-center text-[#000000ba] pb-2">
          Change Password
        </h1>

        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            <div className="w-[100%] 800px:w-[50%] mt-5">
              <label className="block pb-2">Enter your old password</label>

              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2">Enter your new password</label>

              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[50%] mt-2">
              <label className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}>
                Enter you confirm password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />

              <input
                className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24ab] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Address() {
  const [open, setOpen] = useState(true);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item?._id));
  };

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updateUserAddress({
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        })
      );

      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(GetLoginUser());
  }, [dispatch]);
  return (
    <>
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>

              <div className="w-full">
                <form aria-required onSubmit={handleSubmit}>
                  <div className="w-full  p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">Country</label>
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block pb-2">
                          choose your country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item, i) => (
                            <option
                              className="block pb-2"
                              key={i}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-4">
                      <label className="block pb-2">City</label>
                      <select
                        name=""
                        id=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block pb-2">
                          choose your city
                        </option>
                        {State &&
                          State.getStatesOfCountry(country).map(
                            (item, index) => (
                              <option
                                className="block pb-2"
                                key={index}
                                value={item.isoCode}
                              >
                                {item.name}
                              </option>
                            )
                          )}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2 ">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          choose your Address type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Address
          </h1>

          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>

        <br />

        {user &&
          user?.address?.map((item, index) => (
            <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5">
              <div className="flex items-center">
                <h5 className="pl-5 font-[600]">{item.addressType}</h5>
              </div>

              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800:text-[unset]">
                  {item.address1} + {item.address2}
                </h6>
              </div>

              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {user && user.phoneNumber}
                </h6>
              </div>

              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-poiner"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </div>
          ))}

        {user && user?.address?.length === 0 && (
          <h5 className="text-center pt-5 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    </>
  );
}
export default ProfileContent;
