import Header from "../components/Layout/Header";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { base_url } from "../utilies/base_url";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { GetLoginUser } from "../features/user/userSlice";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const UserInbox = () => {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUser, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${base_url}conversation/get-user-conversation`, {
          withCredentials: true,
        })
        .then((res) => {
          setConversations(res.data.conversation);
        })
        .catch((res) => {});
    })();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUser.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${base_url}message/getAllMessage/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {}
    };

    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    console.log(newMessage)

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${base_url}message/create-message`, message)
          .then((res) => {
            console.log(res)
            updateLastMessage();
            setMessages([...messages, res.data.message]);
          })
          .catch((error) => {});
      }
    } catch (error) {}
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });

    await axios
      .patch(`${base_url}conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user?._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="w-full">
        {!open && (
          <>
            <Header />
            <h1 className="text-center text-[30px] py-3 font-Poppins">
              All Messages
            </h1>

            {conversations &&
              conversations?.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={user?._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                  // loading={loading}
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
            sellerId={user?._id}
            userData={userData}
            activeStatus={activeStatus}
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
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${base_url}conversation/shop-info/${userId}`
        );
        setUser(response.data.user);
      } catch (error) {}
    };

    getUser();
  }, [me, data]);

  return (
    <>
      <div
        className={`w-full flex p-3 px-3 ${
          active === index ? "bg-[#00000010]" : "bg-transparent"
        } cursor-pointer`}
        onClick={(e) =>
          setActive(index) ||
          handleClick(data._id) ||
          setCurrentChat(data) ||
          setUserData(user) ||
          setActiveStatus(online)
        }
      >
        <div className="relative">
          <img src="" alt="" className="w-[50px] h-[50px] rounded-full" />

          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
          ) : (
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]"></div>
          )}
        </div>

        <div className="pl-3">
          <h1 className="text-[18px]">{user?.name}</h1>

          <p className="text-[16px] text-[#000c]">
            {data?.lastMessageId !== userData?._id
              ? "you:"
              : userData?.name.splite(" ")[0] + ":"}
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
              <h1>{activeStatus ? "Active" : ""}</h1>
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
                  item?.sender === sellerId ? "justify-end" : "justify-start"
                } `}
              >
                {item.sender !== sellerId && (
                  <img
                    src="https://th.bing.com/th/id/OIP.MCmM1b-hj0SntnEkvZNAnwAAAA?rs=1&pid=ImgDetMain"
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt="data"
                  />
                )}

                <div>
                  <div className={`w-max p-2 rounded  text-[#fff] ${item.sender !==sellerId ? "bg-[#b6b3ae]":"bg-[#38c776]"}`}>
                    <p>{item?.text}</p>
                  </div>

                  <p className="text-[12px] text-[#000000d3] p-1">
                    {format(item?.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <form
          aria-required={true}
          className="p-3 relative w-full flex justtify-between items-center"
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
              <AiOutlineSend size={20} className="absolute rught-4 top-5"/>
            </label>
          </div>

        </form>
      </div>
    </>
  );
};
export default UserInbox;
