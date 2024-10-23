import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import { useContext, useEffect, useState } from "react";

import io from "socket.io-client";
import { AppContext } from "../../../../Context/appContext";
const socket = io("http://localhost:3000");
function FriendRequest() {
  const { userData } = useContext(AppContext);
  const [request, setRequest] = useState([]);
  useEffect(() => {
    const getRequest = async () => {
      await fetch("http://localhost:3000/request-friend", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setRequest(res);
        });
    };
    getRequest();
  }, []);

  const agreeRequest = async (userId) => {
    await fetch(
      `http://localhost:3000/request-friend/agree-request/${userId}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {});
  };
  useEffect(() => {
    socket.on("new-request", (data) => {
      setRequest((prevData) => {
        if (
          prevData.some(
            (item) =>
              item.user._id === data.user._id &&
              item.userRequest._id === data.userRequest._id
          )
        ) {
          return prevData;
        }
        return [data, ...prevData];
      });
    });
  }, []);

  const deleteRequest = async (userId) => {
    await fetch(`http://localhost:3000/request-friend/delete/${userId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {});
  };

  return (
    <>
      <div className="bg-white w-340 h-350 absolute top-13 max-h-350 overflow-auto">
        {request.map(
          (item, index) =>
            item.user._id === userData._id && (
              <div className=" flex border-t border-black mb-2.5" key={index}>
                <div className="rounded-full w-9 h-9 mr-1 ml-1 mt-2.5">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                    alt=""
                  />
                </div>
                <div className="w-2/4 mt-2.5">
                  <p className="text-xs flex justify-start font-medium">
                    {item.userRequest.name}
                  </p>
                  <p className="text-xs flex justify-start">
                    Gửi lời mời kết bạn
                  </p>
                </div>
                <div className="flex flex-col flex-1 mt-2.5 pr-2">
                  <div className="flex justify-end ">
                    <button
                      onClick={() => {
                        agreeRequest(item.userRequest._id);
                      }}
                    >
                      <FontAwesomeIcon className="mr-5" icon={faHeart} />
                    </button>
                    <button
                      onClick={() => {
                        deleteRequest(item.userRequest._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div className="flex justify-end ">
                    <p className="text-xs text-slate-400">
                      {formatDistanceToNow(item.createAt, {
                        addSuffix: true,
                      }) === "less than a minute ago"
                        ? "now"
                        : formatDistanceToNow(item.createAt, {
                            addSuffix: true,
                          })}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default FriendRequest;
