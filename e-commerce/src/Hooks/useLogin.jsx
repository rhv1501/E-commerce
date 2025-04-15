import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
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
      return { error: true, message: "An error occurred" };
    }
  };

  return login;
};

export default useLogin;
