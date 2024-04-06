import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useLocation } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { productRequest } from "../features/products/productService";
function ProductsPage() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch()
 const {shopProduct,allProducts}= useSelector((state)=>state.product)

 useEffect(()=>{

const timeOut = setTimeout(()=>{
  dispatch(productRequest())
},3000)
return()=>{
  clearTimeout(timeOut)
}
 },[allProducts])
  const searchParams = new URLSearchParams(location.search);
  
  const categoryData = searchParams.get("category");
 
  useEffect(() => {
    if (categoryData === null) {
      // const d =
      // allProducts  && allProducts.sort((a, b) => a.total_sell - b.total_sell);
      setData(allProducts);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0)
  }, [categoryData]);
  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>

            {data && data.length === 0 ? <h1 className="text-center w-full pb-[100px] text-[2px]">
              No products Found!
            </h1> : null}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
