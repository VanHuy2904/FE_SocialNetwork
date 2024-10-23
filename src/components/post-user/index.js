import {
  faComment,
  faGlobe,
  faHeart,
  faImage,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { AppContext } from "../../Context/appContext";
import { useParams } from "react-router-dom";
const socket = io("http://localhost:3000");
const PostUser = ({ posts }) => {
  const fileInput = useRef(null);
  const inputComment = useRef(null);
  const [option, showOption] = useState({});
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [userLike, setUserLike] = useState([]);
  const urlVideo = "http://localhost:3000/post/video/";
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
  });
  const { userData, setNotification } = useContext(AppContext);

  const handleShowOption = (commentId) => {
    showOption({
      [commentId]: true,
    });
  };
  useEffect(() => {
    socket.on("new-like", (like) => {
      setUserLike((prevLike) => ({
        ...prevLike,
        [like.postId]: like.data,
      }));
    });
    socket.on("new-comment", (comment) => {
      if (comment.data.length === undefined) {
        setComments((prevComments) => ({
          ...prevComments,
          [comment.postId]: [
            ...(prevComments[comment.postId] || []),
            comment.data,
          ],
        }));
      } else {
        if (comment.data.length > 0) {
          setComments((prevComment) => ({
            ...prevComment,
            [comment.postId]: comment.data,
          }));
        } else {
          setComments((prevComment) => ({
            ...prevComment,
            [comment.postId]: [],
          }));
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const postComment = async (id, postUser) => {
    handleSendNotification(2, id, postUser);
    try {
      if (comment.trim()) {
        // socket.emit("comment", { data: comment });
        await fetch(`http://localhost:3000/comment/create-comment/${id}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((res) => {
            socket.emit("comment", {
              data: res.comment[res.comment.length - 1],
              postId: id,
            });
            setCommentInput("");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (idComment, idPost) => {
    try {
      fetch(
        `http://localhost:3000/comment/delete-comment/${idComment}/${idPost}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          socket.emit("comment", {
            data: res.comment,
            postId: idPost,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const createLike = (idPost) => {
    try {
      fetch(`http://localhost:3000/like/post/${idPost}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          socket.emit("like", {
            data: res.data.like,
            postId: idPost,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      await fetch("http://localhost:3000/post/get-post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const commentUi = {};
          const likeUi = {};

          res.forEach((post) => {
            commentUi[post._id] = post.comment;
            likeUi[post._id] = post.like;
          });
          setUserLike(likeUi);
          setComments(commentUi);
          setPost(res);
        });
    };
    getPost();
  }, [posts]);

  const handleCommentInput = (id, value) => {
    setCommentInput((preInput) => ({
      [id]: value,
    }));
    setFormData({
      ...formData,
      title: value,
    });
  };

  const handleOpenFile = () => {
    fileInput.current.click();
  };

  const handleSendNotification = (type, postId, postUser) => {
    console.log(postId);
    socket.emit("sendNotification", {
      postId: postId,
      postUser: postUser._id,
      user: userData,
      type: type,
      createAt: Date.now(),
    });
    createNotification(postId, postUser, type);
  };

  const createNotification = async (postId, postUser, type) => {
    try {
      const formData = {
        postId: postId,
        postUser: postUser,
        type: type,
      };
      await fetch("http://localhost:3000/notification/create-notification", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {});
    } catch (error) {}
  };
  return (
    <div className="w-full">
      {post.map(
        (item, index) =>
          item.user._id === id && (
            <div className="bg-white w-full p-3 mb-5 mb-4" key={index}>
              <div className="flex">
                <div className="rounded-full w-[40px] h-[40px] mr-2 ml-1">
                  <img
                    className="rounded-full w-full h-full mr-2 ml-1"
                    src={item.user.image}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start">
                  <p>{item.user.name}</p>
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      className="text-xs mr-2 text-slate-600"
                      icon={faGlobe}
                    />
                    <p className="text-xs text-slate-600">
                      Published: {""}
                      {formatDistanceToNow(item.createAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-3 mb-3">
                  {item.title !== "null" && (
                    <p className="text-start text-sm text-slate-700">
                      {item.title}
                    </p>
                  )}
                </div>
                {item.video && (
                  <div className="h-1/2">
                    <iframe
                      className="w-full h-80"
                      src={urlVideo + item.video}
                      title="YouTube video"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {/* <div className="flex gap-px h-503"> */}
                {item.image && item.image.length > 0 && (
                  <div className="flex gap-px h-503">
                    {item.image &&
                      item.image.length === 1 &&
                      item.image.map((image, index) => (
                        <div className="w-full gap-px h-full" key={index}>
                          <img
                            className="h-full object-cover w-full"
                            src={image}
                            alt=""
                          />
                        </div>
                      ))}

                    {item.image.length === 2 && (
                      <div className="flex flex-col w-full">
                        {item.image.map((items, index) => (
                          <div className="h-1/2 mb-0.5 w-full" key={index}>
                            <img
                              className="object-cover h-full w-full"
                              src={items}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {item.image.length === 3 && (
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full h-1/2 gap-px">
                          {item.image.slice(0, 2).map((image, index) => (
                            <div className="w-1/2 h-full" key={index}>
                              <img
                                className="object-cover h-full w-full"
                                src={image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                        <div className="w-full h-1/2 mt-px">
                          <img
                            className="object-cover h-full w-full"
                            src={item.image[2]}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                    {item.image.length > 3 && item.image.length <= 4 && (
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full h-1/2 gap-px">
                          {item.image.slice(0, 2).map((image, index) => (
                            <div className="w-1/2 h-full" key={index}>
                              <img
                                className="object-cover h-full w-full"
                                src={image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-row w-full h-1/2 gap-px mt-px">
                          {item.image.slice(2, 4).map((image, index) => (
                            <div className="w-1/2 h-full" key={index}>
                              <img
                                className="object-cover h-full w-full"
                                src={image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.image.length > 4 && (
                      <div className="w-full h-full flex gap-px">
                        <div className="flex flex-col w-1/2 h-full gap-px">
                          {item.image.slice(0, 2).map((image, index) => (
                            <div className="h-1/2" key={index}>
                              <img
                                className="h-full w-full object-cover"
                                src={image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col w-1/2 h-1/3 gap-px">
                          {item.image.slice(2, 5).map((image, index) => (
                            <div className=" flex flex-col h-full" key={index}>
                              <img
                                className="h-full w-full object-cover"
                                src={image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr className="h-0.5 w-full mt-2 bg-slate-300" />
              <div className="flex gap-6 mt-4">
                <div className="relative">
                  <button
                    onClick={() => {
                      createLike(item._id);
                    }}
                  >
                    {userLike[item._id].some(
                      (item) => item._id === userData._id
                    ) ? (
                      <FontAwesomeIcon
                        className="text-cyan-500 text-rose-700 "
                        icon={faHeart}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() =>
                          handleSendNotification(1, item._id, item.user)
                        }
                        className="text-cyan-500 hover:text-rose-700 "
                        icon={faHeart}
                      />
                    )}
                  </button>
                  {userLike[item._id] && userLike[item._id].length > 0 && (
                    <span className="absolute -top-3 left-2 text-xs">
                      {userLike[item._id].length}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <button>
                    <FontAwesomeIcon
                      className="text-cyan-500"
                      icon={faComment}
                    />
                  </button>
                  {comments[item._id] && comments[item._id].length > 0 && (
                    <span className="absolute -top-3 left-2 text-xs">
                      {comments[item._id].length}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <button>
                    <FontAwesomeIcon className="text-cyan-500" icon={faShare} />
                  </button>
                  <span className="absolute -top-3 left-2 text-xs">2</span>
                </div>
              </div>
              <div className="mt-3 flex">
                <ul className="w-full">
                  {/* {comments.map((item, index) => ( */}
                  {comments[item._id] && comments[item._id].length > 0 && (
                    <div>
                      {comments[item._id].map((itemComment, index) => (
                        <li className="flex mb-3" key={index}>
                          <img
                            className="rounded-full w-10 h-10 mr-2 ml-1 object-cover"
                            src={itemComment.user.image}
                            alt=""
                          />

                          <div className="flex gap-1 flex-col items-start inline-block w-full">
                            <div className="flex justify-between w-full">
                              {itemComment.user && (
                                <p className="text-sm font-medium">
                                  {itemComment.user.name}
                                </p>
                              )}
                              {itemComment.user._id === userData._id && (
                                <div className="relative">
                                  <button
                                    onClick={() => {
                                      handleShowOption(itemComment._id);
                                    }}
                                  >
                                    ...
                                  </button>
                                  {option[itemComment._id] && (
                                    <button
                                      className="absolute right-0 top-4"
                                      onClick={() => {
                                        deleteComment(
                                          itemComment._id,
                                          item._id
                                        );
                                      }}
                                    >
                                      Xóa
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-start break-all ">
                              {itemComment.title}
                            </p>
                            {itemComment.createAt && (
                              <p className="text-xs text-start text-slate-400	 break-all ">
                                {formatDistanceToNow(itemComment.createAt, {
                                  addSuffix: true,
                                })}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </div>
                  )}
                  {/* ))} */}
                </ul>
              </div>
              <div>
                <div className="flex gap-2 mt-4">
                  <div className="rounded-full w-9 h-9 mr-2 ml-1">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      alt=""
                    />
                  </div>
                  <textarea
                    ref={inputComment}
                    value={commentInput[item._id] || ""}
                    name="comment"
                    onChange={(e) => {
                      handleCommentInput(item._id, e.target.value);
                      setComment(e.target.value);
                    }}
                    className="bg-slate-200 w-full resize-none outline-0 p-2 text-sm rounded-lg"
                    placeholder="Post your comment"
                  />
                  <input ref={fileInput} type="file" className="hidden" />
                  <button>
                    <FontAwesomeIcon onClick={handleOpenFile} icon={faImage} />
                    <FontAwesomeIcon
                      onClick={() => {
                        postComment(item._id, item.user);
                      }}
                      className="text-sky-700"
                      icon={faPaperPlane}
                    />
                  </button>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default memo(PostUser);
