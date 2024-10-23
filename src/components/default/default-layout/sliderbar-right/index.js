import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../Context/appContext";
import Message from "../../../message";

export default function SliderRight() {
  const { userData, loading } = useContext(AppContext);
  const [showMessage, setShowMessage] = useState(false);
  const [userMessage, setUserMessage] = useState([]);
  const [count, setCount] = useState(1);
  const [formConversation, setFormConversation] = useState({
    senderId: userData._id,
    receiverId: userMessage._id,
  });
 
  const handleClick = (user) => {
    if (!userMessage.includes(user)) {
      setUserMessage((prevMessages) => [...prevMessages, user]);
    }
    setShowMessage(true);
  };

  const handleCloseMess = (index) => {
    setUserMessage(userMessage.filter((_, i) => i !== index));
  };
  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  } else {
    return (
      <div className="ml-10 bg-white h-[550px] rounded w-[255px] overflow-auto">
        <div className="p-2 text-start">
          <h2>Bạn bè</h2>
        </div>
        <hr />
        {userData.friend && userData.friend.length === 0 && (
          <div className="text-sm m-2 text-start">
            <p>Kết bạn để có thể liên hệ</p>
          </div>
        )}
        {userData &&
          userData.friend &&
          userData.friend.map((item, index) => (
            <>
              <div
                className="flex hover:bg-slate-200 transition cursor-pointer"
                key={index}
                onClick={() => {
                  handleClick(item);
                }}
              >
                <div className="rounded-full w-9 h-9 m-2 ">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-center font-bold text-sm">
                  <p>{item.name}</p>
                </div>
              </div>
            </>
          ))}
        <div className="mt-4">
          {userMessage.map((user, index) => (
            <div
              className="fixed bottom-0 bg-white h-[380px] rounded-md w-[300px] shadow-gray-600 shadow-lg border-2"
              key={index}
              style={{ right: `${index * 320}px` }}
            >
              <Message
                user={user}
                handleCloseMess={handleCloseMess}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  //   }
}
