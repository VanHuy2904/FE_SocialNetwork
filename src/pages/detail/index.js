import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/post";
import PostUser from "../../components/post-user";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/appContext";
import EditUser from "../../components/modal-edit";

export default function Detail() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  console.log(id);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUserDetail = async () => {
      await fetch(`http://localhost:3000/auth/user-info/${id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUserData(res);
        });
    };
    getUserDetail();
  }, [id]);
  const handleModal = (boolean) => {
    setModal(boolean);
  };
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);
  console.log(userData.live === undefined);
  return (
    <div className="h-full w-full m-auto">
      <div className={`flex-col ${modal && "opacity-25"} `}>
        <div className="w-full h-full bg-white h-[500px]">
          <div className="h-[430px] w-full relative">
            <img
              className="h-full w-full"
              src="https://wpkixx.com/html/pitnik/images/resources/profile-image.jpg"
              alt=""
            />
            <div className="w-[130px] h-[130px] rounded-full absolute bottom-6 left-6 border-4 border-white flex-col">
              <img
                className="w-full h-full rounded-full border-2 border-black"
                src={userData.image}
                alt=""
              />
              <div className="text-start text-black text-xl font-bold flex justify-center mt-10">
                <h1>{userData.name}</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center h-[70px] mr-20 gap-10 text-xl">
            <div className="flex gap-2 relative">
              <h2>Friend</h2>{" "}
              <p className="text-rose-700 absolute -top-2 -right-4 text-sm">
                {!userData.friend ? "0" : userData.friend.length}
              </p>
            </div>{" "}
            <div>
              <h2>Posts</h2>
            </div>
          </div>
        </div>
        <div className="flex  w-full ">
          <div className="w-2/5">
            <div className="mt-10 bg-white  h-max w-full p-4 rounded">
              <div>
                <h1 className="text-start text-xl font-bold">Giới Thiệu</h1>
              </div>
              <div className="flex mt-3 gap-4 items-center text-lg">
                <div className="w-[20px]">
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <p>
                  {userData.live !== ""
                    ? `Sống tại ${userData.live}`
                    : "Chưa cập nhật"}
                </p>
              </div>
              <div className="flex mt-3 gap-4 items-center text-lg">
                <div className="w-[20px]">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <p className="">
                  {" "}
                  {userData.from !== ""
                    ? `Đến từ ${userData.from}`
                    : "Chưa cập nhật"}
                </p>
              </div>
              <button
                className="w-full bg-slate-200 p-2 mt-3 rounded-lg font-bold"
                onClick={() => {
                  handleModal(true);
                }}
              >
                Chỉnh sửa chi tiết
              </button>
            </div>
            <div className="mt-10 bg-white  h-max  w-full p-4 rounded">
              <div className="">
                <p className="text-xl font-bold">Bạn bè</p>
              </div>

              <div className="flex flex-wrap">
                {userData.friend &&
                  userData.friend.map((item, index) => (
                    <div className="w-[120px] h-[140px] p-2 rounded-lg">
                      <img
                        className="w-[120px] h-[104px] rounded-lg"
                        src="data:image/jpeg;base64,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"
                        alt=""
                      />
                      <p className="text-sm font-bold mt-1">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-10 ml-10 w-3/5">
            <PostUser />
          </div>
        </div>
      </div>
      {modal && (
        <EditUser handleClose={handleModal} name={userData.name}></EditUser>
      )}
    </div>
  );
}
