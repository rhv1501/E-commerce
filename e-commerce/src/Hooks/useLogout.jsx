import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const useLogout = () => {
  const { setislogged } = useContext(AuthContext);
  const logout = async () => {
    const response = await fetch("http://localhost:5050/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      localStorage.removeItem("token");
      setislogged(false);
      return { error: false, message: "Logout successful" };
    }
  };
  return logout;
};
export default useLogout;
