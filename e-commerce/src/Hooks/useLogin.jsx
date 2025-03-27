import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { dispatch } = context;
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        dispatch({ type: "SetLogin" });
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return login;
};

export default useLogin;
