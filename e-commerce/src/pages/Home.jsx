import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import useAuth from "../Hooks/useAuth";
import { useContext, useEffect } from "react";
import useGetuser from "../Hooks/useGetuser";
import { UserContext } from "../context/userContext/UserContext";
const Home = () => {
  const navigate = useNavigate();
  const islogged = useAuth();
  const getUser = useGetuser();
  const context = useContext(UserContext);
  const { state } = context;
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
        {state.user.username ? (
          <h2 className="mx-5 fixed top-8 text-[#94bbe9] font-extrabold invisible lg:visible text-xl">{`Hey There, ${state.user.username}`}</h2>
        ) : null}
        <Hero />
      </>
    );
  }
};

export default Home;
