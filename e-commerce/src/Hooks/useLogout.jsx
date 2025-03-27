import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch("http://localhost:5050/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include"
    });
    if (response.ok) {
      dispatch({ type: "SetLogout" });
      navigate("/login");
    }
  };
  return logout;
};
export default useLogout;
