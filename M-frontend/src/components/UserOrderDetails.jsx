import { BsFillBagFill } from "react-icons/bs";
import styles from "../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersFromServer } from "../features/order/orderAction";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { base_url } from "../utilies/base_url";
import { toast } from "react-toastify";

const UserOrderDetails = function () {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllOrdersFromServer());
  }, []);

  const reviewHanlder = async () => {
    await axios
      .patch(
        `${base_url}product/rating-product`,
        {
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        setRating("");
        dispatch(getAllOrdersFromServer());

        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .patch(`${base_url}order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersFromServer());

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const data = userOrders && userOrders.find((item) => item._id === id);

  return (
    <>
      <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
          </div>

          {/* <Link to="">
            <div
              className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] font-[600] !h-[45px] text-[18px] text-white`}
            >
              Order List
            </div>
          </Link> */}
        </div>

        <div className="w-full flex items-center justify-between pt-6">
          <h5>
            Order ID: <span>#{data?._id.slice(0, 8)}</span>
          </h5>

          <h5 className="text-[#00000084]">
            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>
        <br />
        <br />

        {data &&
          data?.cart.map((item, index) => (
            <div className="w-full flex items-start mb-5">
              {/* <img src="" alt="" /> */}

              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item?.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  US${item?.discountPrice} × {item?.qty}
                </h5>
              </div>

              {!item.isReviewed && data?.status === "Delivered" ? (
                <div
                  className={`${styles.button} text-[#fff]`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </div>
              ) : null}
            </div>
          ))}

        {open && (
          <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
            <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <h2 className="text-[30px] font-[500] font-Poppins text-center">
                Give a Review
              </h2>
              <br />
              <div className="w-full flex">
                <img src="" alt="" />

                <div>
                  <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                  <h4 className="pl-3 text-[20px]">
                    US${selectedItem?.discountPrice} *{selectedItem?.qty}
                  </h4>
                </div>
              </div>
              <br />
              <br />
              <h5 className="pl-3 text-[20px] font-[500]">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgba(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    ></AiFillStar>
                  ) : (
                    <>
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    </>
                  )
                )}
              </div>
              <br />
              <div className="w-full ml-3">
                <label className="block text-[20px] font-[500]">
                  write a comment
                  <span className="font-[400] text-[16px] text-[#00000052] ml-2">
                    (optional)
                  </span>
                </label>
                <textarea
                  cols="20"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your product? write your expresion about it !"
                  className="mt-2 w-[95%] border p-2 outline-none"
                ></textarea>
              </div>
              <div
                className={`${styles.button} text-white text-[20px] ml-3`}
                onClick={rating >= 1 ? reviewHanlder : null}
              >
                Submit
              </div>
            </div>
          </div>
        )}

        <div className="border-t w-full text-right">
          <h5 className="pt-3 text-[18px]">
            Total Price: <strong>US${data?.totalPrice}</strong>
          </h5>
        </div>

        <br />
        <br />

        <div className="w-full 800px:flex items-center">
          <div className="w-full 800px:w-[60%]">
            <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>

            <h4 className="pt-3 text-[20px]">
              {data?.shippingAddress?.address1 +
                " " +
                data?.shippingAddress.address2}
            </h4>

            <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
            <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
            <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Payment Info:</h4>
            <h4>
              Status:
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid "}
            </h4>
            <br />
            {/* <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white">
              Give a Refund
            </div> */}

            {data?.status === "Delivered" && (
              <div
                className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-white"
                onClick={refundHandler}
              >
                Giva a Refund
              </div>
            )}
          </div>
        </div>
        <br />
        <Link to="/">
          <div className={`${styles.button} text-white`}>Send Message</div>
        </Link>

        <br />
        <br />
      </div>
    </>
  );
};

export default UserOrderDetails;
