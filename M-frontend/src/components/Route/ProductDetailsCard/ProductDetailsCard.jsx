import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addToCart, removeFromCart } from "../../../features/cart/cartService";
import { toast } from "react-toastify";
import {
  addToWishList,
  removeFromWishlist,
} from "../../../features/wishlist/wishlistService";
function ProductDetailsCard({ setOpen, data }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function incrementCount() {
    setCount(count + 1);
  }

  function addToCartHandler(params) {
    const isItemExists = cart && cart.find((i) => i._id === params);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart Successfully");
      }
    }
  }

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToWishListHandler = (data) => {
    dispatch(addToWishList(data));
  };
  return (
    <>
      <div className="bg-[#fff]">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50"
                onClick={() => setOpen(false)}
              />

              <div className="block w-full 800px:flex ">
                <div className="w-full 800px:w-[50%] ">
                  {/* <img src={data?.image_Url[0]?.url} alt={data?.name} /> */}
                  <div className="flex">
                    <img
                      // src={data?.shop?.shop_avatar?.url}
                      src=" https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
                      alt="product"
                      className="w-[400px] h-[500px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                        {/* {data?.name} */}
                      </h3>

                      <h5 className="pb-3 text-[15px] ">
                        {/* ({data?.ratings}) Ratings */}
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${styles?.button} bg-[#583b3b] mt-4 rounded-[4px] h-11 `}
                    // onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ({data?.sold_out}) Sold Out
                  </h5>
                </div>

                <div className="w-full 800px:w-[50%] pt-5 pl-[5px]  pr-[5px]">
                  <h1 className=" font-600 font-Roboto text-[#333] text-[20px]">
                    {data?.name}
                  </h1>
                  <p>{data?.description}</p>
                  <div className="flex pt-3">
                    <h4
                      className={`font-bold text-[18px] text-[#333] font-Roboto`}
                    >
                      {data?.discount_price} $
                    </h4>

                    <h3 className="font-[500] text-[16px] text[#d55b45] pl-3 mt-[-4px] line-through">
                      {data?.price ? data?.price + "" : null}
                    </h3>
                  </div>

                  <div className="flex items-center mt-12 justify-between pr-3 ">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px] ">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer "
                          onClick={() => removeFromWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={` w-[150px] bg-black h-[50px] my-3 flex items-center mt-6 justify-center rounded-[4px] cursor-pointer`}
                    onClick={() => addToCartHandler(data.id)}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ProductDetailsCard;
