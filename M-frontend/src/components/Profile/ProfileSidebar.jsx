import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { LogoutUser } from "../../features/user/userSlice";

const ProfileSideBar = function ({ active, setActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = function () {
    dispatch(LogoutUser());
    window.location.reload();
    navigate("/login");
  };
  return (
    <>
      <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
        <div
          className="flex items-center  w-full mb-8 cursor-pointer"
          onClick={() => setActive(1)}
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />

          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(3)}
        >
          <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />

          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Refunds
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(4) || navigate("/inbox")}
        >
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(5)}
        >
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(6)}
        >
          <RiLockPasswordFill size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(7)}
        >
          <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        <div
          className="flex items-center w-full mb-8 cursor-pointer"
          onClick={() => setActive(8) || logOutHandler()}
        >
          <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
