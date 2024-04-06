import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrderFromServer } from "../../features/order/orderAction";
import styles from "../../styles/styles";

function WithdrawMoney() {
  const { orderShop } = useSelector((state) => state.order);
  const [deliveredOrder, setDeliverOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrderFromServer());
    const orderData =
      orderShop && orderShop.filter((item) => item.status === "Delivered");
    setDeliverOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax =
  deliveredOrder &&
  deliveredOrder?.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax  *0.1

  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2)
//   button:"w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer",

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center  justify-center flex-col">
        <h5 className="text-[20px] pb-4">Available Balance: ${availableBalance}</h5>
        <div className="w-[150px] bg-black h-[42px] my-3 flex items-center justify-center rounded cursor-pointer text-white">
            Withdraw
        </div>
      </div>
    </div>
  );
}

export default WithdrawMoney;
