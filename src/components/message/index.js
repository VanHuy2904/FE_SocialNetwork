import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/appContext";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
export default function Message({ user, handleCloseMess, index }) {
  const { userData } = useContext(AppContext);
  const [message, setMessage] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [conversation, setConversation] = useState({});
  const [formConversation, setFormConversation] = useState({
    senderId: userData._id,
    receiverId: user._id,
  });
  useEffect(() => {
    socket.on("new-message", (message) => {
      console.log(message);
      setMessage((prevData) => [...prevData, message]);
    });
  }, []);
  // console.log(formConversation);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (messageContent !== "") {
      const formMessage = {
        text: messageContent,
        conversationId: conversation._id,
      };
      await fetch("http://localhost:3000/message/api/create-message", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formMessage),
      })
        .then((res) => res.json())
        .then((res) => {
          socket.emit("message", {
            conversationId: conversation._id,
            text: messageContent,
            senderId: userData,
          });
          setMessageContent("");
        });
    }
  };
  useEffect(() => {
    const getConversation = async () => {
      console.log(formConversation);
      await fetch(
        "http://localhost:3000/conversation/api/create-conversation",
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formConversation),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setConversation(res);
        });
    };
    getConversation();
  }, []);

  const handleChange = (e) => {
    console.log(user.name, e.target.value);
    setMessageContent(e.target.value);
  };
  useEffect(() => {
    // getConversation();
    console.log(conversation);
    const getMessage = async () => {
      await fetch(
        `http://localhost:3000/message/api/get-message/${conversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessage(res);
        });
    };
    getMessage();
  }, [conversation]);
  return (
    <>
      {/* {user &&
        user.map((item, index) => ( */}
      <div
        className={`bg-white h-[380px] rounded-md w-full shadow-gray-600 shadow-lg border-2 flex-col`}
      >
        <div className="flex border-b-[2px] shadow-gray-200 shadow-md justify-between">
          <div className="flex">
            <div className="rounded-full w-9 h-9 m-2  ">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                alt=""
              />
            </div>
            <div className="flex items-center text-sm w-[100px] font-medium">
              <p className="w-full">{user.name}</p>
            </div>
          </div>
          <button
            className="flex items-center mr-2 text-xl"
            onClick={() => handleCloseMess(index)}
          >
            x
          </button>
        </div>
        {console.log(message)}
        <div className="overflow-auto mb-2 h-[270px]">
          {message.map((item, index) => (
            <div>
              {item.conversationId === conversation._id && (
                <div className="flex items-center ">
                  {item.senderId._id !== userData._id && (
                    <>
                      <div className="rounded-full w-8 h-8 m-2 ">
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                          alt=""
                        />
                      </div>
                      <div className="max-w-[150px] bg-sky-600 p-2 rounded-lg break-words mt-2">
                        <p className="text-sm text-white ">{item.text}</p>
                      </div>
                    </>
                  )}
                  {item.senderId._id === userData._id && (
                    <>
                      <div className="flex items-center justify-end w-full mt-2 text-wrap">
                        <div className="max-w-[150px] bg-sky-600 p-2 rounded-lg break-words mr-2">
                          <p className="text-sm text-white ">{item.text}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="w-full flex">
              <input
                value={messageContent}
                onChange={handleChange}
                placeholder="Aa"
                className="bg-slate-200 border-0 outline-0 text-[13px] p-2 rounded-xl left-2 grow"
              />
              <div className="ml-2 mr-2 flex items-center justify-center">
                <button type="submit">
                  <FontAwesomeIcon
                    className="text-sky-700 flex "
                    icon={faPaperPlane}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ))} */}
    </>
  );
}
