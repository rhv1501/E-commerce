import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const navigate = useNavigate();
  const Login = async (email, password) => {
    let toastId;
    try {
      toastId = toast.loading("Logging in...");
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin-token", data.token);
        toast.dismiss(toastId);
        navigate("/admin");
      } else {
        toast.dismiss(toastId);
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };
  return { Login };
};

export default useLogin;
