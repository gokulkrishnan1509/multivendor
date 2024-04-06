import React, { useEffect } from "react";
import { AiFillShopping, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { loadSellerOnServer } from "../../../features/seller/sellerSlice";
import { image_url } from "../../../utilies/base_url";

const DashboardHeader = function () {
  const { shopAuthendicate } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(loadSellerOnServer());
    });
  
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]); // <-- Add dispatch to the dependency array
  

  return (
    <>
      <div className="w-full h-[80px ] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <div>
          <Link to="/dashboard">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"z
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Link to="/dashboard/cupouns" className="800px:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer "
              />
            </Link>
            <Link to="/dashboard-events" className="800px:block hidden">
              <MdOutlineLocalOffer
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              ></MdOutlineLocalOffer>
            </Link>
            <Link to="/dashboard-products" className="800px:block hidden">
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              ></FiShoppingBag>
            </Link>

            <Link to="/dashboard-orders" className="800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-messages" className="800px:block hidden">
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/shop/${shopAuthendicate?._id}`}>
              <img
                src={`${image_url}${shopAuthendicate?.avatar}`}
                alt="seller-image"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
