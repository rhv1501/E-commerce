import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [islogged, setislogged] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/auth/verifyuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          if (data.error === "No token found") {
            toast.error("Please login to continue");
            setislogged(false);
            return;
          }
          if (data.error === "Token is blacklisted") {
            toast.error("Session expired, please login again");
            localStorage.removeItem("token");
            setislogged(false);
            return;
          } else {
            const data = await response.json();
            console.log(data.message);
          }
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };
    if (islogged) verifyUser();
  }, [islogged]);

  // Initial token check (with optional delay for spinner effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setislogged(!!token);
      setLoading(false);
    }, 2000); // Optional: Remove delay in production
    return () => clearTimeout(timer);
  }, []);

  // Sync across tabs using storage event
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setislogged(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ islogged, setislogged, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
