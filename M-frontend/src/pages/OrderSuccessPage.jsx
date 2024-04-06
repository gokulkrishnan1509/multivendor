import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
const OrderSuccessPage = () => {
  return (
    <>
      <div>
        <Header />
        <Success/>
        <Footer />
      </div>
    </>
  );
};

const Success = () => {
  

  return (
    <>
      <div>

        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
          Your order is successful
        </h5>
      </div>
    </>
  );
};
export default OrderSuccessPage;
