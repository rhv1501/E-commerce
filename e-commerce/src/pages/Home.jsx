import { lazy } from "react";
import Navbar from "../components/Navbar/Navbar";
const Hero = lazy(() => import("../components/Hero/Hero"));
const Word = lazy(() => import("../components/Feature/Word"));
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Word />
    </>
  );
};

export default Home;
