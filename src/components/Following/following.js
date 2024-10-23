import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AppContext } from "../../Context/appContext";
const socket = io("http://localhost:3000");

export default function Following() {
  const { userData, loading } = useContext(AppContext);

  const [userFriend, setUserFriend] = useState([]);
  const handleSendRequest = (user, userRequest) => {
    // console.log(postId);
    socket.emit("request", {
      user: user,
      userRequest: userRequest,
      createAt: Date.now(),
    });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const getUser = async () => {
        await fetch("http://localhost:3000/auth/allUser", {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setUserFriend(res);
          });
      };
      getUser();
    }
  }, []);

  const request_friend = async (user) => {
    handleSendRequest(user, userData);
    const formData = {
      user: user._id,
    };
    await fetch("http://localhost:3000/request-friend/create-request", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {});
  };
  return (
    <div className="mt-2 bg-white h-full mr-10 rounded">
      <div className="p-2">
        <div className="text-start">
          <h2>Kết Bạn </h2>
        </div>
      </div>
      <hr />
      {!loading &&
        userFriend &&
        userFriend.length &&
        userFriend.map(
          (item, index) =>
            !userData.friend.some((items) => items._id === item._id) && (
              <div key={index}>
                <div className="h-max p-2 flex ">
                  <div className="w-10 h-10">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      alt=""
                    />
                  </div>
                  <p className="flex items-center ml-2 text-sm font-medium flex-1 text-start">
                    {item.name}
                  </p>
                  <button
                    onClick={() => request_friend(item)}
                    className="flex-1 text-sm text-orange-500"
                  >
                    Kết bạn
                  </button>
                </div>
              </div>
            )
        )}
    </div>
  );
}
