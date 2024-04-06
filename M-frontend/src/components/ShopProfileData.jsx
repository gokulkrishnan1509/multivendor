import React, { useEffect, useState } from "react";
import { productData } from "../static/data";
import ProductCard from "./Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop } from "../features/products/productService";
import { getAllEventFromServer } from "../features/events/eventService";
import Ratings from "./Products/Ratings";

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const { shopProduct } = useSelector((state) => state?.product);
  const { allEvents } = useSelector((state) => state.event);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllProductShop());
      dispatch(getAllEventFromServer());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  const allReviews =
    shopProduct && shopProduct.map((product) => product?.reviews).flat();

  function getTimeDifference(createdAt) {
    console.log(createdAt)
    const commentTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();

    const differenceInSeconds = Math.floor((currentTime - commentTime) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} min ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between ">
          <div className="w-full flex">
            <div className="flex items-center" onClick={() => setActive(1)}>
              <h5
                className={`font-semibold text-base ${
                  active === 1 ? "text-red-500" : "text-gray-700"
                } cursor-pointer pr-4`}
              >
                Shop Products
              </h5>
            </div>

            <div className="flex items-center " onClick={() => setActive(2)}>
              <h5
                className={`font-semibold text-base  ${
                  active === 2 ? "text-red-500" : "text-gray-700"
                } cursor-pointer pr-4`}
              >
                Running Events
              </h5>
            </div>
            <div className="flex items-center" onClick={() => setActive(3)}>
              <h5
                className={`font-semibold text-base  ${
                  active === 3 ? "text-red-500" : "text-gray-700"
                } cursor-pointer pr-4`}
              >
                Shop Reviews
              </h5>
            </div>
          </div>

          <div>
            {isOwner && (
              <div>
                <Link to="/dashboard">
                  <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                    <span className="text-[#fff]">Go Dashboard</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <br />

        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {shopProduct &&
              shopProduct.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        )}

        {active === 2 && (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
              {allEvents &&
                allEvents.map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
            </div>
            {allEvents && allEvents.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Events have for this shop!
              </h5>
            )}
          </div>
        )}

        {active === 3 && (
          <div className="w-full">
            {allReviews &&
              allReviews?.map((item, index) => (
                <div className="w-full flex my-3">
                  <img
                    src
                    alt={item?.user?.name}
                    className="w-[50px] h-[50px] rounded-full "
                  />
                  <div className="pl-2">
                    <h1 className="font-[600]">{item?.user?.name}</h1>
                    <Ratings rating={item?.rating} />
                    <p className="font-[400] text-[#000000a7]">
                      {item?.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">
                      {item?.created
                        ? getTimeDifference(item?.created)
                        : "2 min ago"} 
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShopProfileData;
