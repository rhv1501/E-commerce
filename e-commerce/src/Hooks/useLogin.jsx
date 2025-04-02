import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return login;
};

export default useLogin;
