import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const AppContext = createContext({});
const socket = io("http://localhost:3000");

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect();
    };
  });

  useEffect(() => {
    const userData = async () => {
      try {
        if (token) {
          await fetch("http://localhost:3000/auth/user-info", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              setUserData(res);
              setLoading(false);
            });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    userData();
  }, [token]);
  console.log(notification, "no");
  return (
    <AppContext.Provider
      value={{ userData, notification, setNotification, loading }}
    >
      {children}
    </AppContext.Provider>
  );
};
