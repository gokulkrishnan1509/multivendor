import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrderFromServer } from "../../features/order/orderAction";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { loadSellerOnServer } from "../../features/seller/sellerSlice";
import axios from "axios";
import { base_url } from "../../utilies/base_url";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

function WithdrawMoney() {
  const { orderShop } = useSelector((state) => state.order);
  const { shopAuthendicate } = useSelector((state) => state.shop);
  const [deliveredOrder, setDeliverOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const dispatch = useDispatch();

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  const deleteHandler = async () => {
    await axios.patch(`${base_url}shop/delete-withdraw-method`, "", {
      withCredentials: true,
    });
  };

  const createwithDraw = async () => {
    if (withdrawAmount < 50 || withdrawAmount >shopAuthendicate?.availableBalance ) {
      toast.error("you can't withdraw this amount!");
    } else {
      await axios
        .post(
          `${base_url}withdraw/create-withdraw`,
          { amount: withdrawAmount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw money request is successful!");
        });
    }
  };

  useEffect(() => {
    dispatch(loadSellerOnServer());
    dispatch(getAllShopOrderFromServer());
    // const orderData =
    //   orderShop && orderShop.filter((item) => item.status === "Delivered");
    // setDeliverOrder(orderData);
  }, [dispatch]);

  // const totalEarningWithoutTax =
  //   deliveredOrder &&
  //   deliveredOrder?.reduce((acc, item) => acc + item.totalPrice, 0);

  // const serviceCharge = totalEarningWithoutTax * 0.1;

  // const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    await axios
      .put(
        `${base_url}shop/update-payment-methods`,
        { withdrawMethod },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully");

        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: "",
          bankAccountNumber: "",
          bankHolderName: "",
          bankAddress: "",
        });
        setPaymentMethod(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const availableBalance = shopAuthendicate?.availableBalance?.toFixed(2)

  const error = () => {
    toast.error("you not have enough balance to withdraw!");
  };
  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center  justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className="w-[150px] bg-black h-[42px] my-3 flex items-center justify-center rounded cursor-pointer text-white"
          onClick={() => (availableBalance ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>

      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded min-h-[40vh] p-3 ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            }`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>

            {paymentMethod ? (
              <>
                <div>
                  <h3 className="text-[22px] font-Poppins text-center font-[700]">
                    Add new withdraw Method:
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankName}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, bankName: e.target.value })
                        }
                        placeholder="Enter your bank account name!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankCountry}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankCountry: e.target.value,
                          })
                        }
                        placeholder="Enter your bank Country"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Swift Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankSwiftCode}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankSwiftCode: e.target.value,
                          })
                        }
                        placeholder="Enter your Bank Swift Code!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Account Number
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankAccountNumber}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankAccountNumber: e.target.value,
                          })
                        }
                        placeholder="Enter your bank account number!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankHolderName}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankHolderName: e.target.value,
                          })
                        }
                        placeholder="Enter your bank Holder name!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankAddress}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankAddress: e.target.value,
                          })
                        }
                        placeholder="Enter your bank address!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`${styles.button} mb-3 text-white`}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-[20px] font-Poppins">
                  Available Payment Methods:
                </h3>
                {shopAuthendicate && shopAuthendicate?.withdrawMethod ? (
                  <>
                    <div>
                      <div className="800px:flex justify-between w-full items-center">
                        <div className="800px:w-[50%]">
                          <h5>
                            Account Number: $
                            {"*".repeat(
                              shopAuthendicate?.withdrawMethod
                                ?.bankAccountNumber.length - 4
                            ) +
                              shopAuthendicate?.withdrawMethod?.bankAccountNumber.slice(
                                -4
                              )}
                          </h5>
                          <h5>
                            Bank Name:{" "}
                            {shopAuthendicate?.withdrawMethod?.bankName}
                          </h5>
                        </div>

                        <div className="800px:w-[50%] flex justify-start">
                          <AiOutlineDelete
                            size={25}
                            className="cursor-pointer"
                            onClick={() => deleteHandler() || setOpen(false)}
                          />
                        </div>
                      </div>

                      <br />
                      <h4>Available Balance: {availableBalance}$</h4>
                      <br />

                      <div className="800px:flex w-full items-center">
                        <input
                          type="number"
                          placeholder="Amount..."
                          className="800px:w-[100px] w-full border 800px:mr-3 rounded"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <div
                          className={`${styles.button} !h-[40px] text-white`}
                          onClick={createwithDraw}
                        >
                          withdraw
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[18px] pt-2">
                      No withdraw Methods available
                    </p>

                    <div className="w-full flex items-center ">
                      <div
                        className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WithdrawMoney;
