import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../Context/appContext";
import { formatDistanceToNow } from "date-fns";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
function Notification() {
  const [notificationData, setNotificationData] = useState([]);
  const { userData } = useContext(AppContext);
  useEffect(() => {
    socket.on("new-notification", (data) => {
      setNotificationData((prevData) => {
        const exists = prevData.some(
          (notification) =>
            notification.postUser === data.postUser &&
            notification.type === 1 &&
            data.type === 1 &&
            notification.postId === data.postID
        );
        if (!exists && data.postUser !== data.user._id) {
          return [data, ...prevData];
        } else {
          return [...prevData];
        }
      });
    });
  }, []);
  useEffect(() => {
    const getNotification = async () => {
      try {
        await fetch("http://localhost:3000/notification", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setNotificationData(res);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getNotification();
  }, []);

  return (
    <>
      <div className="bg-white w-340 h-350 absolute top-13 max-h-350 overflow-auto rounded shadow-lg shadow-indigo-500/40">
        {notificationData.map((item, index) => (
          <div className=" flex-col" key={index}>
            {item.postUser === userData._id && (
              <>
                <div className="flex" key={index}>
                  <div className="rounded-full w-9 h-9 mr-1 ml-1 mt-2.5">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      alt=""
                    />
                  </div>
                  {item.type === 1 && (
                    <div className="flex-col">
                      <div className="w-2/4 mt-2.5 w-full">
                        <p className="text-xs text-start truncate">
                          {item.user.name} đã like bài viết của bạn
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 pr-2">
                        <div className="">
                          <p className="text-xs text-slate-400 text-start">
                            {" "}
                            {formatDistanceToNow(item.createAt, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.type === 2 && (
                    <div className="flex-col">
                      <div className="w-2/4 mt-2.5 w-full">
                        <p className="text-xs text-start truncate">
                          {item.user.name} đã bình luận bài viết của bạn
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 pr-2">
                        <div className="">
                          <p className="text-xs text-slate-400 text-start">
                            {" "}
                            {formatDistanceToNow(item.createAt, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* {item.user.length > 1 && (
                  <div className="flex">
                    <div className="rounded-full w-9 h-9 mr-1 ml-1 mt-2.5">
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        alt=""
                      />
                    </div>
                    {item.type === 1 && (
                      <div className="w-2/4 mt-2.5 w-full" key={index}>
                        <p className="text-xs text-start truncate">
                          {item.user[item.user.length - 1].user.name} và
                          {item.user.length - 1} người khác đã like bài viết của
                          bạn
                        </p>
                      </div>
                    )}
                    {item.type === 2 && (
                      <div className="w-2/4 mt-2.5 w-full" key={index}>
                        <p className="text-xs text-start truncate">
                          {item.user[item.user.length - 1].user.name} và
                          {item.user.length - 1} người khác đã bình luận bài
                          viết của bạn
                        </p>
                      </div>
                    )}
                  </div>
                )} */}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Notification;
