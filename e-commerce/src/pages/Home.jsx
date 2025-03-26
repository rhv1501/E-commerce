import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  const islogged = useAuth();
  useEffect(() => {
    if (!islogged) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (islogged) {
    return (
      <>
        <Navbar />
        <Hero />
      </>
    );
  }
};

export default Home;
