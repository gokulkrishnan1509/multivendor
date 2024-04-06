import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import CustomInput from "../../utilies/CustomInput";
import Cart from "../cart/Cart";
import WishList from "../wishlist/WishList.jsx";
import { BiMenuAltLeft } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Navbar from "./Navbar";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { isAunthundicatedUser } from "../../features/user/userSlice.jsx";
const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTeam] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const { userAuthorized } = useSelector((state) => state.auth);
  const {shopAuthendicate} = useSelector((state)=>state.shop)

   const dispatch = useDispatch()
  const{cart} = useSelector((state)=>state.cart)
  const {wishlist}=useSelector((state)=>state.wishlist)
  const {allProducts}=useSelector((state)=>state.product)
  useEffect(()=>{
    dispatch(isAunthundicatedUser())
  },[dispatch])

  const [dropdown, setDropDown] = useState(false);
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTeam(term);

    const fileterdProducts =
    allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(fileterdProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`w-11/12 mx-auto`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="	https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="main-image"
              />
            </Link>
          </div>

          <div className="w-[50%] relative">
            <CustomInput
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2  z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            // src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px] "
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
              {isAunthundicatedUser?"Go to Dashboard" :"Become Seller"}<IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`w-11/12 mx-auto relative flex items-center justify-between`}
        >
          <div onClick={() => setDropDown(!dropdown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block ">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropdown)}
              />

              {dropdown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}

          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`flex items-center`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart
                  size={30}
                  color="rgb(255 2555 255 /83%)"
                  onClick={() => setOpenWishList(true)}
                />

                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 2555 255 / 83%)"
                  onClick={() => setOpenCart(true)}
                />

                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0  m-0 text-white font-mono  text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="reltive cursor-pointer mr-[15px]">
                {userAuthorized ? (
                  <Link to="/profile">
                    <img src="" alt="userimage" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 2555 255 /83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {openWishlist ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile header */}

      <div
        className={`w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="	https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=" website logo"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>  

          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />

              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-full top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full  bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>

                <RxCross1
                  className="ml-4 mt-5"
                  size={30}
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px]">
                <input
                  type="search"
                  placeholder="Search Product"
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && searchData.length !== 0 ? (
                  <>
                    {/* <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 "> */}
                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                      {searchData &&
                        searchData.map((i, index) => {
                          const d = i.name;
                          const Product_name = d.replace(/\s+/g, "-");

                          return (
                            <Link to={`/product/${i._id}`} key={index}>
                              <div className="w-full flex items-start py-3">
                                <img
                                  src={i.image_Url[0].url}
                                  alt="product-image"
                                  className="w-[50px]  mr-2"
                                />
                                <h1 className="text-[10px]">{i.name}</h1>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  </>
                ) : null}
              </div>
              <Navbar active={activeHeading} />

              <div className="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center cursor-pointer ml-4 rounded-[4px]">
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                 {
                   userAuthorized ? (<>
                   <div>
                    <Link to="/profile">
                    
                    <img src="" alt="userimage" className="w-[50px] h-[60px] rounded-full border-[3px] border-[#27a292]" />
                    </Link>

                   </div>
                   </>):<>
                   <Link to="/login" className="text-[18px] pr-[5px] text-[#000000b7]">
                     Login  /
                   </Link>  
                   <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up
                   
                   </Link>   
                   </>
                 }

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
