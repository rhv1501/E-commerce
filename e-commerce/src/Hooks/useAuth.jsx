import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [navigate]);

  return isLogged;
};

export default useAuth;
