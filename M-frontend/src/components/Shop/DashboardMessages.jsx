import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../utilies/base_url";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { loadSellerOnServer } from "../../features/seller/sellerSlice";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const { shopAuthendicate } = useSelector((state) => state?.shop);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const MessageList = await axios
        .get(`${base_url}conversation/get-shop-conversation`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data)
          setConversations(res.data.conversations);
        })
        .catch((res) => {});
    })();
  }, []);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    dispatch(loadSellerOnServer());
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: shopAuthendicate?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => {
      return member !== shopAuthendicate?._id;
    });
    socketId.emit("sendMessage", {
      senderId: shopAuthendicate._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${base_url}message/create-message`, message)
          .then((res) => {
            updateLastMessage();

            setMessages([...messages, res?.data?.message]);
          })
          .catch((error) => {});
      }
    } catch (error) {}
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: shopAuthendicate?._id,
    });

    await axios
      .patch(
        `${base_url}conversation/update-last-message/${currentChat?._id}`,
        { lastMessage: newMessage, lastMessageId: shopAuthendicate?._id }
      )
      .then((res) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${base_url}message/getAllMessage/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {}
    })();
  }, [currentChat]);

  useEffect(() => {
    if (shopAuthendicate) {
      const userId = shopAuthendicate?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUser", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [shopAuthendicate]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== shopAuthendicate?._id
    );

    const online = onlineUser.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  return (
    <>
      <div className="w-[90%] bg-white m-5 h-[85vh]  overflow-y-scroll   rounded">
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
                  setCurrentChat={setCurrentChat}
                  me={shopAuthendicate?._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                />
              ))}
          </>
        )}

        {open && (
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={shopAuthendicate?._id}
            userData={userData}
            activeStatus={activeStatus}
            // online={onlineUser}
          />
        )}
      </div>
    </>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members?.find((user) => user !== me);

    const getUser = async () => {
      try {
        const response = await axios.get(
          `${base_url}conversation/user-info/${userId}`
        );
        setUserData(response.data.user);
      } catch (error) {}
    };

    getUser();
  }, [me, data]);
  return (
    <>
      <div
        className={`w-full flex p-3 px-3 my-3 ${
          active === index ? "bg-[#00000010]" : "bg-transparent"
        } cursor-pointer`}
        onClick={(e) =>
          setActive(index) || handleClick(data?._id) || setCurrentChat(data)
        }
      >
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
            alt="data"
            className="w-[50px] h-[50px] rounded-full"
          />
          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
          ) : (
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]"></div>
          )}
        </div>

        <div className="pl-3">
          <h1 className="text-[18px]">{userData?.name}</h1>
          <p className="text-[16px] text-[#000c]">
            {data.lastMessageId !== userData?._id
              ? "you: "
              : userData?.name?.split(" ")[0] + ":"}
            {data?.lastMessage}
          </p>
        </div>
      </div>
    </>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  data,
  userData,
  activeStatus,
}) => {
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
              <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
              <h1>{activeStatus ? "Active Now" : ""}</h1>
            </div>
          </div>

          <AiOutlineArrowRight
            size={20}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
          {messages &&
            messages?.map((item, index) => (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender !== sellerId && (
                  <img
                    src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt="data"
                  />
                )}
                <div>
                  <div className={`w-max p-2 rounded ${item.sender !==sellerId ? "bg-[#b6b3ae]":"bg-[#38c776]"} text-[#fff]`}>
                    <p>{item?.text}</p>
                  </div>

                  <p className="text-[12px] text-[#000000d3] pt-1">
                    {format(item?.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
