import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
import useGetuser from "../Hooks/useGetuser";
const Home = () => {
  const navigate = useNavigate();
  const islogged = useAuth();
  const getUser = useGetuser();
  useEffect(() => {
    const fetchuser = async () => {
      await getUser();
    };
    if (!islogged) {
      navigate("/login");
    } else {
      fetchuser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islogged]);

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
