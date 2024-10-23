import {
  faBell,
  faCamera,
  faHeart,
  faMessage,
  faPencil,
  faUser,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useContext } from "react";
import { AppContext } from "../../../../Context/appContext";
import Following from "../../../Following/following.js";
import { Link } from "react-router-dom";

function Slider() {
  const { userData } = useContext(AppContext);
  console.log(userData);
  return (
    <div className="flex-col h-full">
      <div className="bg-white w-64  text-start mr-10 rounded p-1.5">
        <div className="m-2">
          <p className="text-sm">Profile</p>
        </div>

        <hr />
        <div className="m-3 flex items-center">
          <div className="rounded-full w-12 h-12 mr-2 ml-1">
            <img className="w-full h-full rounded-full" src={userData.image} alt="" />
          </div>
          <div className="ml-2">
            <div className="">
              <p className="text-sm font-semibold">{userData.name}</p>
              <p className="text-xs">
                <FontAwesomeIcon className="mr-2" icon={faMessage} />
                Message
              </p>
              <p className="text-xs">
                <FontAwesomeIcon className="mr-2" icon={faBell} />
                Notification
              </p>
            </div>
          </div>
        </div>
        <hr className="m-4" />
        <div className="m-4 flex justify-center items-start">
          <span className="flex flex-col mr-4">
            <Link to={`/detail/${userData._id}`}>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-xs text-slate-600"
                  icon={faPencil}
                />
              </div>
              <p className="text-xs text-slate-600 flex items-center">Edit</p>
            </Link>
          </span>
          <span className="flex flex-col mr-4">
            <FontAwesomeIcon
              className=" text-xs text-slate-600"
              icon={faCamera}
            />
            <p className="text-xs text-slate-600">Photo</p>
          </span>
          <span className="flex flex-col mr-4 ">
            <FontAwesomeIcon
              className="text-xs text-slate-600"
              icon={faVideoCamera}
            />
            <p className="text-xs text-slate-600">Live</p>
          </span>
          <span className="flex flex-col">
            <FontAwesomeIcon className="text-xs text-slate-600" icon={faUser} />
            <p className="text-xs text-slate-600">Invite</p>
          </span>
        </div>
        <div className="m-4 flex">
          <button className="w-1/2 bg-rose-600 text-xs p-2 rounded-xl text-white">
            Followers
          </button>
          <button className="w-1/2 bg-sky-600 text-xs p-2 rounded-xl border-0 text-white">
            Following
          </button>
        </div>

        <div className="mb-4">
          <span className="flex justify-center items-center">
            <FontAwesomeIcon className="text-lg" icon={faHeart} />
            <p className="text-lg text-slate-600 ml-1">120K</p>
          </span>
        </div>
      </div>
      <Following />
    </div>
  );
}

export default memo(Slider);
