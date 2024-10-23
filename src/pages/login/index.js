import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelChangeValue = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationError = {};
      if (!form.email.trim()) {
        validationError.email = "Vui lòng nhập email";
      }
      if (!form.password.trim()) {
        validationError.password = "Vui lòng nhập password";
      }
      setErrors(validationError);
      if (Object.keys(validationError).length === 0) {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.status === 200) {
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("expiresIn", data.data.expiresIn);

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" h-screen flex h-full justify-center pt-10">
        <div className="bg-white p-2 w-1/2 text-start h-max">
          <div className="text-lg p-2">Login</div>
          <hr />
          <form method="POST" onSubmit={handelSubmit}>
            <div className="m-2 p-2 items-center w-full">
              <label className="text-sm">Email</label>
              <div className=" w-full">
                <input
                  onChange={handelChangeValue}
                  id="email"
                  name="email"
                  className="outline-0 w-full text-sm p-2"
                  placeholder="Enter Email"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-600">{errors.email}</span>
              )}
            </div>
            <div className="m-2 p-2 items-center">
              <label className="text-sm">Password</label>
              <div className=" w-full">
                <input
                  onChange={handelChangeValue}
                  type="password"
                  id="password"
                  name="password"
                  className="outline-0 w-full p-1 text-sm p-2"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <span className="text-xs text-rose-600">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="bg-sky-200 w-full p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
