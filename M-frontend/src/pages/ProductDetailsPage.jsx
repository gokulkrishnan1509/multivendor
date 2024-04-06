import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop, productRequest } from "../features/products/productService";

function ProductDetailsPage() {
  const { name } = useParams();

  const [searchParams] =useSearchParams()
  let eventData = searchParams.get("isEvent")
  
  // const {shopProduct}= useSelector((state)=>state.product)
  const { shopProduct ,allProducts} = useSelector((state) => state.product);
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  const dispatch = useDispatch();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getAllProductShop());
      dispatch(productRequest())
    }, 50);

    const data = allProducts.find((i) => i?._id === name);
    

    setData(data);
    return () => {
      clearTimeout(timeOut);
    };

 
  }, [dispatch]);


  return (
    <>
      <div>
        <Header />

        <ProductDetails data={data} />
        {data && <SuggestedProducts data={data} />}
        <Footer />
      </div>
    </>
  );
}

export default ProductDetailsPage;
