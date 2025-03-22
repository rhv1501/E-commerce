import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { UserContext } from "../context/userContext/UserContext";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkCookieExists = (cookieName) => {
      return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith(`${cookieName}=`));
    };
    if (!checkCookieExists("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};
export default Home;
