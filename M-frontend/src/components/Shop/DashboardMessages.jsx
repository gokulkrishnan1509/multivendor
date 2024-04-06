import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../utilies/base_url";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";

const DashboardMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const MessageList = await axios
        .get(`${base_url}conversation/get-shop-conversation`, {
          withCredentials: true,
        })
        .then((res) => {
          setConversations(res.data.conversations);
        })
        .catch((res) => {});
    })();
  }, []);

  return (
    <>
      <div className="w-[90%] bg-white m-5 h-[85vh]    rounded">
        <h1 className="text-center text-[30px] py-3 font-Poppins ">
          All Messages
        </h1>

        {!open && (
          <>
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                />
              ))}
          </>
        )}

        {open && <SellerInbox setOpen={setOpen} />}
      </div>
    </>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);
  return (
    <>
      <div
        className={`w-full flex p-3 px-3 my-3 ${
          active === index ? "bg-[#00000010]" : "bg-transparent"
        } cursor-pointer`}
        onClick={(e) => setActive(index) || handleClick(data?._id)}
      >
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
            alt="data"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        </div>

        <div className="pl-3">
          <h1 className="text-[18px]">Gokula krishnan</h1>
          <p className="text-[16px] text-[#000c]">iam good</p>
        </div>
      </div>
    </>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <>
      <div className="w-full min-h-full flex flex-col justify-between">
        <div className="w-full flex p-3 items-center justify-between bg-slate-200">
          <div className="flex">
            <img
              src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
              alt="food"
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">Gokul</h1>
              <h1>Active now</h1>
            </div>
          </div>

          <AiOutlineArrowRight
            size={20}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="px-3 h-[65vh] py-3 overflow-y-scroll  ">
          <div className="flex w-full  my-2">
            <img
              src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
              className="w-[40px] h-[40px] rounded-full mr-3 "
              alt="data"
            />
            <div className="w-max p-2 rounded bg-[#38c776]  text-[#fff]  h-min">
              <p>Hello there</p>
            </div>
          </div>

          <div className="flex w-full justify-end my-2">
            <div className="w-max p-2 rounded bg-[#38c776] text-">
              <p>hi</p>
            </div>
          </div>
        </div>

        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
        >
          <div className="w-[3%]">
            <TfiGallery className="cursor-pointer" />
          </div>

          <div className="w-[97%]">
            <input
              type="text"
              required
              placeholder="Enter your message..."
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend size={20} className="absolute right-4 top-5" />
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default DashboardMessages;
