import React from "react";
import styles from "../../../styles/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Hero() {
  return (
    <>
      <div
        className={`relative min-h-[70vh] 800px:min-h[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        <div className=" mx-auto w-[90%] 800px:w-[60%]">
          <h1 className="text-[35px] leading-[1.2] 800:text-[60px] text-[#3d3a3a] font-[600] ">
            Best Collection for <br /> home Decoration
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins]  font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam cum
            hic nesciunt, aspernatur harum ratione aut ipsum illo quisquam
            praesentium fuga dolorum, rerum temporibus provident ullam esse
            quidem nostrum tenetur.
          </p>
          <Link to="/products" className="inline-block">
            <div
              className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer`}
            >
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Hero;
