import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [islogged, setislogged] = useState(false);
  const [loading, setLoading] = useState(true);

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
