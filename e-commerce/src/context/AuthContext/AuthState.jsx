import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [islogged, setislogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const verifyUser = useCallback(async () => {
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
  }, []);

  // Initial token check (with optional delay for spinner effect)
  useEffect(() => {
    const initauth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await verifyUser();
      }
      setislogged(!!token);
      setLoading(false);
    };
    initauth();
  }, [verifyUser]);

  // Sync across tabs using storage event
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setislogged(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const contextValue = useMemo(
    () => ({
      islogged,
      setislogged,
      loading,
    }),
    [islogged, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
