import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const useLogin = () => {
  const { setislogged } = useContext(AuthContext);
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setislogged(true);
        return { error: false, message: "Login successful" };
      }
      if (response.status === 400) {
        return { error: true, message: data.message };
      }
      if (response.status === 500) {
        alert("Server error");
        return { error: true, message: data.message };
      }
    } catch (e) {
      console.error(e);
      return { error: true, message: "Server error" };
    }
  };

  return login;
};

export default useLogin;
