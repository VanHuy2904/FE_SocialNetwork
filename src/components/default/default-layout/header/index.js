import {
  faBell,
  faHouse,
  faMagnifyingGlass,
  faMessage,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useContext, useState } from "react";
import { AppContext } from "../../../../Context/appContext";
import Search from "../../../search";
import FriendRequest from "../friend-request";
import Notification from "../notification";
import { Link } from "react-router-dom";

function Header() {
  const [userSearch, setUserSearch] = useState([]);
  const { userData } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [showButton, setShowButton] = useState(false);
  const [showFriendReq, setShowFriendReq] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const handelShowNotification = () => {
    setShowNotification(!showNotification);
    setShowFriendReq(false);
  };
  const handelFriend = () => {
    setShowFriendReq(!showFriendReq);
    setShowNotification(false);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleButton = () => {
    setShowButton(true);
  };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    if (searchValue !== "") {
      try {
        await fetch(`http://localhost:3000/auth/search/${searchValue}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setUserSearch(res);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setUserSearch([]);
    }
  };
  return (
    <>
      <div className="bg-sky-900 h-50x shadow-md flex items-center fixed top-0 right-0 left-0 z-10">
        <div className="w-12p ml-15x">
          <img
            className="w-24"
            src="https://wpkixx.com/html/pitnik/images/logo2.png"
            alt=""
          />
        </div>
        <div className="w-1/3 relative h-full p-2">
          <input
            className="bg-slate-500 h-full border-0 rounded-xl w-full outline-0 p-pd-text text-xs pr-search-right text-white"
            onChange={handleSearch}
          />
          <FontAwesomeIcon
            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 right-2 text-xs"
            icon={faMagnifyingGlass}
          />
          <Search userSearch={userSearch} />
        </div>
        <div className="text-xs mx-15x text-white font-semibold">TIMELINE</div>
        <div className="w-px bg-black h-50x mr-15x"></div>
        <div className="flex w-12p">
          <ul className="w-full flex justify-between">
            <li>
              <Link to="/">
                <button className="rounded-full w-10 h-10 transition ease-out hover:bg-slate-100 rounded-full">
                  <FontAwesomeIcon
                    className="p-2 text-sm text-white  hover:text-black"
                    icon={faHouse}
                  />
                </button>
              </Link>
            </li>
            <li>
              <button
                className={` rounded-full w-10 h-10 transition ease-out hover:bg-slate-100 relative`}
                onClick={handelFriend}
              >
                <FontAwesomeIcon
                  className={`${
                    showFriendReq ? "text-black" : "text-white"
                  }  hover:text-black p-2 text-sm `}
                  icon={faUserGroup}
                />
                {showFriendReq && <FriendRequest />}
              </button>
            </li>
            <li>
              <button
                className={` rounded-full w-10 h-10 transition ease-out hover:bg-slate-100 relative`}
                onClick={handelShowNotification}
              >
                <FontAwesomeIcon
                  className={`${
                    showNotification ? "text-black" : "text-white"
                  }  hover:text-black p-2 text-sm `}
                  icon={faBell}
                />
                {showNotification && <Notification />}
              </button>
            </li>
            <li>
              <button className="rounded-full w-10 h-10 transition ease-out hover:bg-slate-100 ">
                <FontAwesomeIcon
                  className="p-2 text-sm text-white hover:text-black"
                  icon={faMessage}
                />
              </button>
            </li>
          </ul>
        </div>
        {token && (
          <div className="flex flex-1 justify-end h-full items-center">
            <p className="text-13x mr-3 leading-50x text-white">
              {userData.name}
            </p>
            <div
              className="rounded-full w-30 h-30 relative"
              onClick={handleButton}
            >
              <img
                className="w-full h-full rounded-full"
                src={userData.image}
                alt=""
              />
              {showButton && (
                <button
                  className="w-20 absolute right-1 top-9 bg-white rounded text-sm p-2"
                  onClick={logOut}
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        )}
        {!token && (
          <div className="flex flex-1 justify-end h-full items-center">
            <a href="/login">
              <button className="text-white m-2">Login</button>
            </a>
            <a href="/register">
              <button className="text-white bg-rose-700 p-2 rounded-xl">
                Register
              </button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Header);
