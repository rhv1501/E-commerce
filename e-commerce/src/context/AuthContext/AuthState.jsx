import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [islogged, setislogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setislogged(true);
    } else {
      setislogged(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ islogged, setislogged }}>
      {children}
    </AuthContext.Provider>
  );
};
