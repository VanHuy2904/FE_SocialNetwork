import React, { useState } from "react";

export default function EditUser({ name, handleClose }) {
  const [errors, setErrors] = useState({});
  const [nameUser, setNameUser] = useState(name);
  const [formData, setFormData] = useState({
    name: nameUser,
    live: "",
    from: "",
    image: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setNameUser(e.target.value.name);
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
  const handleChangeImg = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const imgLinks = await covertBase64(file);

    setFormData({
      ...formData,
      image: imgLinks,
    });
    //   setShowImgFile((prevShowImg) => [...prevShowImg, ...imgLinks]);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationError = {};
      if (!formData.name.trim()) {
        validationError.name = "Vui lòng nhập tên";
      }

      setErrors(validationError);
      if (Object.keys(validationError).length === 0) {
        const response = await fetch("http://localhost:3000/auth/update-info", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.status === 200) {
          handleClose(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <div className="fixed -translate-y-2/4 top-1/2 left-1/2 bg-white -translate-x-2/4 h-[500px] w-1/2 z-50 p-4 rounded-lg">
      <div className="flex justify-between items-center text-[28px] font-bold">
        <p className="">Chỉnh sửa chi tiết</p>
        <button
          className=""
          onClick={() => {
            handleClose(false);
          }}
        >
          X
        </button>
      </div>
      <form method="POST" onSubmit={handelSubmit}>
        <div>
          <p className="text-lg">Họ tên: </p>
          <input
            name="name"
            value={nameUser}
            onChange={handleChangeValue}
            placeholder="Nhập họ tên"
            className="border outline-0 w-full mt-2 p-2"
          />
          <p className="text-lg">Nơi ở: </p>
          <input
            name="live"
            onChange={handleChangeValue}
            placeholder="Nhập nơi ở"
            className="border outline-0 w-full mt-2 p-2"
          />
          <p className="text-lg">Đến: </p>
          <input
            name="from"
            onChange={handleChangeValue}
            placeholder="Nhập nơi đến"
            className="border outline-0 w-full mt-2 p-2"
          />
          <p className="text-lg">Hình ảnh: </p>
          <input
            multiple
            type="file"
            name="image"
            className="border outline-0 w-full mt-2 p-2"
            onChange={handleChangeImg}
          />
        </div>
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="bg-sky-600 p-2 rounded-lg text-white"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
