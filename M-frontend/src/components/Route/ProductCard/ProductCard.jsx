import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishList,
  removeFromWishlist,
} from "../../../features/wishlist/wishlistService";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cart/cartService";
import Ratings from "../../Products/Ratings";

function ProductCard({ data,isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
   const {wishlist} =useSelector((state)=>state.wishlist)      
   const {cart} =useSelector((state)=>state.cart)
  useEffect(()=>{
    if(wishlist && wishlist.find((i)=>i._id ===data._id)){
      setClick(true)
    }else{
      setClick(false)
    }
  },[wishlist])

  const name = data?.name;
  const product_name = name?.replace(/\s+/g, "-");
  const dispatch = useDispatch();
  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };
  const addToWishListHandler = function (data) {
    setClick(!click);
    dispatch(addToWishList(data));
  };

const addToCartHandler =(id)=>{
  const isItemExists = cart && cart.find((i)=>i?._id ==id);

  if(isItemExists){
    toast.error("Item already in cart!")
  }else{
    if(data.stock <1){
      toast.error("Product stock limited")
    }else{
      const cartData ={...data,qty:1};
      dispatch(addToCart(cartData))
      toast.success("Item added to cart successfully")
    }
  }
}


  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={` ${data?.images && data?.images[0]}`}
            // src=""
            alt="product"
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to={`/product/${data._id}`}>
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">{data?.name}</h5>
        </Link>

        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>

          <h4 className="pb-3 font-[500]">
            {data?.name?.length > 40
              ? data.name.slice(0, 40) + "..."
              : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings}/>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
                ${data?.price === 0 ? data?.price : data?.discountPrice}
              </h5>
              <h4 className="font-[500] text-[16px] text-[#d55b45]  pl-3 mt-[-4px] line-through ">
                {data?.discountPrice? data?.discountPrice + "$" : null}
              </h4>
            </div>

            <span className="font-[400] text-[17px]  text-[#68d284]">
              ({data?.sold_out})&nbsp;sold
            </span>
          </div>
        </Link>

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? "red" : "#333"}
              onClick={() => addToWishListHandler(data)}
              title="Add to wislist"
            />
          )}

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view "
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#333"
            title="Add to cart"
          />

          {open ? (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
