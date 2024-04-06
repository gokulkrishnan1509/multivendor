import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllProductShop } from "../../features/products/productService";
import { Link } from "react-router-dom";
import { base_url, image_url } from "../../utilies/base_url";

const ShopInfo = ({ isOwner }) => {
  const { shopAuthendicate } = useSelector((state) => state.shop);
  const logOutHandler = () => {};
  const { shopProduct } = useSelector((state) => state?.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllProductShop());
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  const totalReviewsLength =
    shopProduct &&
    shopProduct.reduce((acc, product) => acc + product?.reviews?.length, 0);

  const totalRatings =
    shopProduct &&
    shopProduct.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review?.rating, 0),
      0
    );

    const averageRating =(totalRatings/ totalReviewsLength ||0)

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={`${image_url}${shopAuthendicate?.avatar}`}
            alt="shop-profile"
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>

        <h3 className="text-center py-2 text-[20px]">
          {shopAuthendicate?.name}
        </h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {shopAuthendicate?.description}
        </p>
        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{shopAuthendicate?.address}</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#0000000a6]">{shopAuthendicate?.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]"> Total Products</h5>
          <h4 className="text-[#000000a6]">
            {shopProduct && shopProduct?.length}
          </h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]"> Shop Ratings</h5>
          <h4 className="text-[#000000a6]">{averageRating}/5</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000a6]">
            {shopAuthendicate?.createdAt.slice(0, 10)}
          </h4>
        </div>

        {isOwner && (
          <div className="py-3 px-4">
            <Link to="/settings">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>

            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-5px`}
              onClick={logOutHandler}
            >
              <span className="text-white">Log Out</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
