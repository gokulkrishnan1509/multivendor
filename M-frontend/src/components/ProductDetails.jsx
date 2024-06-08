import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishlist,
} from "../features/wishlist/wishlistService";
import { toast } from "react-toastify";
import { addToCart } from "../features/cart/cartService";
import Ratings from "./Products/Ratings";
import { SellerProductRequest } from "../features/products/productService";
import { GetLoginUser, isAunthundicatedUser } from "../features/user/userSlice";
import axios from "axios";
import { base_url } from "../utilies/base_url";

const ProductDetails = function ({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { shopProductLength } = useSelector((state) => state.product);
  const { user ,userAuthorized} = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // const timeOut = setTimeout(() => {
      dispatch(SellerProductRequest(data && data?.shopId));
      dispatch(GetLoginUser());
      dispatch(isAunthundicatedUser())
    // }, 3000);

    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [data, wishlist]);

  const removeFromWishListHandler = (id) => {
    setClick(!click);
    dispatch(removeFromWishlist(id));
  };

  const addToWishListHandler = function (id) {
    setClick(!click);
    dispatch(addToWishList(id));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i?._id == id?._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };

  const navigate = useNavigate();
  const increamentCount = function () {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalReviewsLength =
    shopProductLength &&
    shopProductLength?.reduce(
      (acc, product) => acc + product.reviews.length,
      0
    );

  const totalRatings =
    shopProductLength &&
    shopProductLength?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  // const totalReviewsLength =
  //   shopProduct &&
  //   shopProduct.reduce((acc, product) => acc + product.reviews.length, 0);

  // const totalRatings =
  //   shopProduct &&
  //   shopProduct.reduce(
  //     (acc, product) =>
  //       acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
  //     0
  //   );

  const averageRating = totalRatings / totalReviewsLength || 0;
  async function handleMessageSubmit() {
    if(userAuthorized){
      const groupTitle = data._id + user._id;
      const userId = user?._id;
      const sellerId = data?.shopId;

  
      await axios.post(`${base_url}conversation/create-conversation`, {
        groupTitle,
        userId,
        sellerId,
      }).then((res)=>{
        navigate(`/conversation/${res?.data?.conversation?._id}`)
      }).catch((error)=>{
        toast.error(error?.response?.data?.message)
      })
    }
    

  }

  return (
    <>
      <div className="bg-white">
        {data ? (
          <div className="w-11/12 mx-auto 800px:w-[80%] ">
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img
                    // src={data?.image_Url[select].url}
                    alt=""
                    className="w-[80%]"
                  />

                  <div className="w-full flex">
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer `}
                    >
                      <img
                        // src={data?.image_Url[0].url}
                        alt=""
                        className="h-[200px]"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer `}
                    >
                      <img
                        // src={data?.image_Url[1].url}
                        alt=""
                        className="h-[200px]"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full 800:w-[50%] pt-5">
                  <h1 className="text-[25px] font-[600] font-Robot text-[#333]">
                    {data.name}
                  </h1>
                  <p>{data?.description}</p>
                  <div className="flex pt-3">
                    <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                      {data?.discount_price} $
                    </h4>

                    <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3  mt-[-4px] line-through">
                      {data?.price ? data?.price + "$" : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={increamentCount}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      {click ? (
                        <AiFillHeart
                          className="cursor-pointer"
                          color={click ? "red" : "#333"}
                          onClick={() => addToWishListHandler(data)}
                          title="Remove from wishlist"
                          size={30}
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          color={click ? "red" : "#333"}
                          onClick={() => removeFromWishListHandler(data)}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="w-[150px] bg-black h-[50px] my-3 rounded flex items-center justify-center  cursor-pointer mt-6"
                    onClick={() => addToCartHandler(data)}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>

                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data?.shopId}`}>
                      <img
                        // src={data?.shop?.shop_avatar.url}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shopId}`}>
                        <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                          {data?.shop?.name}
                        </h3>
                      </Link>

                      <h5 className="pb-3 text-[15px]">
                        {/* ({averageRating}/5) Ratings */}
                      </h5>
                    </div>

                    <div
                      className="w-[150px] h-11 my-3 flex items-center justify-center  cursor-pointer bg-[#6443d1] !rounded   "
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductDetailsInfo
              data={data}
              totalReviewsLength={totalReviewsLength}
              averageRating={averageRating}
              shopProductLength={shopProductLength}
            />

            <br />
            <br />
          </div>
        ) : null}
      </div>
    </>
  );
};

function ProductDetailsInfo({
  data,
  totalReviewsLength,
  averageRating,
  shopProductLength,
}) {
  const [active, setActive] = useState(1);
  // console.log(data);
  return (
    <>
      <div className="bg-[#f5f6fb] px-3 800px:px-10 rounded py-2 ">
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>

            {active === 1 ? (
              <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
            ) : null}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>

            {active === 2 ? (
              <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
            ) : null}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>

            {active === 3 ? (
              <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
            ) : null}
          </div>
        </div>

        {active === 1 ? (
          <div>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, accusamus. Repellendus ex ab corrupti, ipsam ad
              quaerat ea, dolores dolor, nam ducimus ullam harum porro
              assumenda! Fuga inventore laboriosam laudantium, suscipit facilis
              molestias similique soluta dolor sed ea, magni quis excepturi
              nulla provident natus deserunt nobis aliquam deleniti tenetur
              dolorum! Numquam dolorem, enim alias nesciunt quia esse quae
              exercitationem dicta fuga doloribus eligendi soluta omnis corrupti
              distinctio sit! Quidem in vero earum natus cupiditate ipsum
              numquam aliquid odit quos. Placeat commodi earum harum fugiat!
              Velit eius, quasi iure voluptates recusandae exercitationem eaque?
              Temporibus aut aliquid harum excepturi quidem laudantium
              cupiditate.
            </p>

            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              consequuntur expedita suscipit blanditiis repellat ex aliquid
              fugit eligendi voluptatum culpa neque atque corporis laudantium et
              enim, deserunt rem quae assumenda repellendus. Voluptatem delectus
              error asperiores. Laborum in temporibus expedita saepe, deleniti
              perferendis harum repellendus tenetur, obcaecati eos reprehenderit
              unde at!
            </p>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              repudiandae sed in et accusamus labore voluptas dicta error, sit
              odit!
            </p>
          </div>
        ) : null}

        {active === 2 ? (
          <div className="w-full  min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            {data &&
              data.reviews.map((item, index) => (
                <div className="w-full flex my-2">
                  <img src="" alt={item?.user?.name} />
                  <div className="pl-2">
                    <div className="w-full flex items-center">
                      <h1 className="pl-3 font-[500] mr-2">
                        {item?.user?.name}
                      </h1>
                      <Ratings rating={item?.rating} />
                    </div>

                    <p>{item?.comment}</p>
                  </div>
                </div>
              ))}

            <div className="w-full flex justify-center">
              {data && data.reviews?.length === 0 && (
                <h5>No Reviews have for this product!</h5>
              )}
            </div>
          </div>
        ) : null}

        {active === 3 ? (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <div className="flex items-center">
                <img
                  // src={data?.shop?.shop_avatar?.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />

                <div className="pl-3">
                  <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                    {data?.shop?.name}
                  </h3>

                  <h5 className="pb-3 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
              <p className="pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                nostrum fuga corporis quas repudiandae magnam in maxime esse eos
                fugiat distinctio iure minima, repellendus eaque reprehenderit
                vero veritatis. Voluptates pariatur unde suscipit sapiente ea
                dolorem, reiciendis eius cum. Quos ipsum omnis veniam totam vero
                illo aut cupiditate error minus quo. Quo nisi impedit amet
                porro. Alias reiciendis sed dicta, voluptatum error, quasi
                dolorem nostrum amet facere expedita doloribus fugiat!
                Necessitatibus tempore vero quo et molestias excepturi delectus
                accusantium sapiente veritatis, aspernatur cum, ipsam libero.
                Laudantium earum nostrum harum, sint ex quam laboriosam
                aspernatur molestiae, quia suscipit iusto itaque voluptatem
                pariatur?
              </p>
            </div>

            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end ">
              <div className="text-left">
                <h5 className="font-[600]">
                  joined on:
                  <span className="font-[500]">
                    {/* {new Date().toLocaleDateString()} */}
                    {data?.shop?.createdAt.slice(0, 10)}
                  </span>
                </h5>

                <h5 className="font-[600] pt-3">
                  Total Products:{" "}
                  <span className="font-[500]">
                    {shopProductLength?.length}
                  </span>
                </h5>

                <h5 className="font-[600] pt-3">
                  Total Reviews:
                  <span className="font-[500]">{totalReviewsLength}</span>
                </h5>

                <Link>
                  <div className="w-[150px] bg-black h-[39.5px] my-3 flex items-center justify-center rounded-[4px] mt-3 cursor-pointer ">
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ProductDetails;
