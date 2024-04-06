import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop, productRequest } from "../../../features/products/productService";
const BestDeals = function () {
  const [data, setData] = useState([]);


  const {shopProduct,allProducts}= useSelector((state)=>state.product)
  const dispatch = useDispatch()
  useEffect(()=>{

    dispatch(getAllProductShop())
    dispatch(productRequest())
  },[dispatch])
  useEffect(() => {
    // const d =
    // allProducts && allProducts.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = allProducts.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="text-[27px] text-center md:text-center font-[600] font-Roboto pb-[20px]">
          <h1>Best Deals</h1>
        </div>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data &&
            data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default BestDeals;
