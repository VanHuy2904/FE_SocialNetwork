import {
  faImage,
  faLocationDot,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import Post from "../../components/post";
import Reels from "../../components/reels";
import { AppContext } from "../../Context/appContext";

function Home() {
  const inputImg = useRef(null);
  const inputVideo = useRef(null);
  const { userData } = useContext(AppContext);
  const [videoURL, setVideoURL] = useState("");
  const [title, setTitle] = useState("");
  const [showImgFile, setShowImgFile] = useState([]);
  const [post, setPost] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: [],
    video: "",
  });
  const handlePostData = (e) => {
    setTitle(e.target.value);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const covertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("video", formData.video);
      if (formData.image.length > 0) {
        formData.image.forEach((item, index) => {
          formData1.append(`image[]`, item);
        });
      }
      formData1.append("title", formData.title);

      await fetch("http://localhost:3000/post/create-post", {
        method: "POST",
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData1,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setTitle("");
            setShowImgFile([]);
            setPost([...post, res.data]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickImg = (e) => {
    inputImg.current.click();
  };

  const handleClickVideo = (e) => {
    inputVideo.current.click();
  };

  const handleCloseImg = (index) => {
    setShowImgFile((prevShowImg) => prevShowImg.filter((_, i) => i !== index));
  };
  const handleChangeImg = async (e) => {
    if (e.target.files[0].type === "video/mp4") {
      const fileVideo = e.target.files[0];
      setFormData({
        ...formData,
        video: fileVideo,
      });
      setVideoURL(URL.createObjectURL(e.target.files[0]));
    } else {
      const file = Array.from(e.target.files);
      const imgLinks = await Promise.all(
        file.map((files) => covertBase64(files))
      );
      setFormData({
        ...formData,
        image: imgLinks,
      });
      setShowImgFile((prevShowImg) => [...prevShowImg, ...imgLinks]);
    }
  };

  return (
    <>
      <div className="flex flex-col w-1/2 h-full">
        <form onSubmit={handleSubmitPost} method="POST">
          <div className="bg-white w-full h-full text-start rounded ">
            <div className="pt-4 pr-4 pl-4">
              <div className="pb-4">Create Post</div>
              <hr />
              <div className="mt-4 flex items-center">
                <div className="rounded-full w-9 h-9 mr-2 ml-1">
                  <img className="w-full h-full rounded-full" src={userData.image} alt="" />
                </div>
                <div className="w-full h-12">
                  <textarea
                    onChange={handlePostData}
                    value={title}
                    id="title"
                    name="title"
                    className="text-sm w-full border-0 outline-none resize-none h-10 p-2 placeholder:text-slate-400"
                    placeholder="Share some what you are thinking"
                  />
                </div>
              </div>
              <div className=" flex gap-px">
                {videoURL && (
                  <div className="w-full">
                    <iframe
                      className="w-full "
                      src={videoURL}
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </div>
                )}
                {showImgFile.map((item, index) => (
                  <div className="relative" key={index}>
                    <img src={item} alt="" className="" />
                    <button
                      type="button"
                      className="absolute top-0 right-2 text-white"
                      onClick={() => {
                        handleCloseImg(index);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="my-2">
                <FontAwesomeIcon
                  className="mr-4 text-xs"
                  icon={faLocationDot}
                />
                <FontAwesomeIcon
                  className="mr-4 text-xs"
                  icon={faMusic}
                  onClick={handleClickVideo}
                />
                <FontAwesomeIcon
                  onClick={handleClickImg}
                  className="mr-4 text-xs"
                  icon={faImage}
                />
                <input
                  ref={inputImg}
                  type="file"
                  className="hidden"
                  name="image"
                  id="image"
                  onChange={handleChangeImg}
                  multiple
                />

                <input
                  ref={inputVideo}
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  className="hidden"
                  name="video"
                  id="video"
                  onChange={handleChangeImg}
                  multiple
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-400 h-full my-5 p-1 rounded-md hover:bg-rose-600 text-white"
              >
                Post
              </button>
            </div>
          </div>
        </form>

        <Reels></Reels>
        <Post posts={post}></Post>
      </div>
    </>
  );
}

export default Home;
