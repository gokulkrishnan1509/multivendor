import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop, productRequest } from "../../features/products/productService";

const SuggestedProducts = function ({ data }) {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch()

  const { shopProduct, allProducts } = useSelector((state) => state?.product);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllProductShop());
      dispatch(productRequest())
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

  useEffect(() => {
    const realatedProduts =
    allProducts && allProducts.filter((i) => i.category === data.category);

    setProducts(realatedProduts);
  }, [data.category]);
  return (
    <>
      <div>
       

        {data ? (
          <div className="p-4 w-11/12 mx-auto">
            <h2 className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
              Related Product
            </h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg-gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 ">
                {
                    allProducts && allProducts.map((i,index)=>(
                        <ProductCard data={i} key={index}/>
                    ))
                }
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SuggestedProducts;
