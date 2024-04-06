import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { GetLoginUser } from "../../features/user/userSlice";
import axios from "axios";
import { base_url } from "../../utilies/base_url";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //   const stripe = useStripe();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(GetLoginUser());
    }, 200);
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const createOrder = (data, actions) => {};

  const onApprove = async (data, actions) => {};

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(`${base_url}order/order-routes`, order, { withCredentials: true })
      .then((res) => {
        toast.success("Order Successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload()
      });
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>

        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  //   const paymentHandler = (e) => {
  //     e.preventDefault();
  //   };
  return (
    <>
      <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center "
              onClick={() => setSelect(1)}
            >
              {select === 1 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1ab4] rounded-full"></div>
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Debit/credit card
            </h4>
          </div>

          {select === 1 ? (
            <>
              <div className="w-full flex border-b">
                <form className="w-full" onSubmit={paymentHandler}>
                  <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                      <label className="block pb-2">Name On Card</label>
                      <input
                        type="text"
                        required
                        placeholder={user && user.name}
                        className={`${styles.input} !w-[95%] text-[#444]`}
                        value={user && user.name}
                      />
                    </div>

                    <div className="w-[50%]">
                      <label className="block pb-2">Exp Date</label>
                      {/* <CardExpiryElement/> */}
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Submit"
                    className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-600`}
                  />
                </form>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const CartData = function ({ orderData }) {
  const shipping = orderData?.shipping?.toFixed(2)
  return (
    <>
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">
            ${orderData?.subTotalPrice ?orderData?.subTotalPrice:""}
          </h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">
            {orderData?.discountPrice ? "$" + orderData?.discountPrice : "-"}
          </h5>
        </div>

        <h5 className="text-[18px] font-[600] text-end pt-3">
          ${orderData?.totalPrice ?orderData?.totalPrice :""}
        </h5>
        <br />
      </div>
    </>
  );
};

export default Payment;
