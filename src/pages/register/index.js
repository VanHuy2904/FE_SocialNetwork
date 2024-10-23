import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassWord: "",
  });
  const [errors, setErrors] = useState({});
  const [severError, setSeverError] = useState({});

  const handleChangeData = (e) => {
    if (e.target.name === "confirm-password") console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validationError = {};
      if (!formData.email.trim()) {
        validationError.email = "Vui lòng nhập email";
      }
      if (!formData.name.trim()) {
        validationError.name = "Vui lòng nhập tên của bạn";
      }
      if (!formData.password.trim()) {
        validationError.password = "Vui lòng nhập mật khẩu";
      }
      if (formData.confirmPassWord.trim() !== formData.password.trim()) {
        validationError.confirmPassWord = "Mật khẩu không trùng khớp";
      }
      setErrors(validationError);
      if (Object.keys(validationError).length === 0) {
        fetch("http://localhost:3000/auth/signup", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 200) {
              navigate("/");
            } else {
              validationError.email = res.message;
              setSeverError(validationError);
            }
          });
      }
    } catch (error) {}
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">
                  Your name
                </label>
                <input
                  onChange={handleChangeData}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required=""
                />
                {errors.name && (
                  <span className="text-xs text-rose-600 flex items-start mt-2">
                    {errors.name}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">
                  Your email
                </label>
                <input
                  onChange={handleChangeData}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />

                {(errors.email || severError.email) && (
                  <span className="text-xs text-rose-600 flex items-start mt-2">
                    {errors.email || severError.email}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">
                  Password
                </label>
                <input
                  onChange={handleChangeData}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errors.password && (
                  <span className="text-xs text-rose-600 flex items-start mt-2">
                    {errors.password}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">
                  Confirm password
                </label>
                <input
                  onChange={handleChangeData}
                  type="password"
                  name="confirmPassWord"
                  id="confirmPassWord"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errors.confirmPassWord && (
                  <span className="text-xs text-rose-600 flex items-start mt-2">
                    {errors.confirmPassWord}
                  </span>
                )}
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
