import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch("http://localhost:5050/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      credentials: "include",
    });
    if (response.ok) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return logout;
};
export default useLogout;
