import React, { useEffect } from "react";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop, productRequest } from "../../../features/products/productService";
const FeaturedProduct = () => {


  const {shopProduct,allProducts}=useSelector((state)=>state.product)
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(getAllProductShop())
  dispatch(productRequest())
},[dispatch])


  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className={`${styles.heading}`}>
          <h1 className="text-[20px]">Featured Products</h1>

          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px]  xl:grid-cols-5 xl:gap-[30px] mb-12  border-0">
            {allProducts &&
              allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
