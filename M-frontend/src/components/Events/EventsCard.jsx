import React, { useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "../CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToList } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cart/cartService";
const EventCard = ({ active }) => {
const {cart} = useSelector((state)=>state.cart)
const dispatch = useDispatch()
  // const addToCartHandler =(data)=>{

  //   const isItemExists = cart && cart.find((i)=>i._id ===id);

  //   if(isItemExists){
  //     toast.error("Item already in cart!")
  //   }else{
  //     if(data.stock<1){
  //       toast.error("Product stock limited!")
  //     }else{
  //       const cartData ={...data,qty:count};
  //       dispatch(addToCart(cartData))
  //     }
  //   }
  // }


  useEffect(()=>{
    dispatch(addTaskToList())
  },[])

  return (
    <>
      <div
        className={`w-full block bg-white ${
          active ? "unset" : "mb-12"
        }  rounded-lg  lg:flex p-2 `}
      >
        <div className="w-full lg:w-[50%] m-auto">
          <img
            src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
            alt="product"
          />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
          <h2
            className={`text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}
          >
            Iphone 14pro max 8/234gb
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ad
            totam porro quidem aut hic voluptatibus, labore fugiat ex! Debitis
            facilis earum eius accusantium velit animi itaque ipsam officia et!
          </p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                10995
              </h5>

              <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
                999$
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
              120 sold
            </span>
          </div>
          <CountDown />
          <br />
          <div className="flex items-center gap-4">
            <Link to="/product/:id?isEvent=true">
              <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff]">
                See Details
              </div>
            </Link>

            {/* <Link> */}
              <div className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff]">
                Add to Cart
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
