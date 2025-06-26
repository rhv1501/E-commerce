import { useContext } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { UIContext } from "../../context/UI Context/UIContext";
const Hero = () => {
  const { darkMode } = useContext(UIContext);
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col gap-10">
        <video
          src="/assets/hero.mp4"
          autoPlay
          muted
          loop
          className="w-[90%] object-cover rounded-3xl z-10 shadow-2xl shadow-[#94bbe9] md:w-[50%] mt-30"
        />
        <h2
          className={`text-transparent font-extrabold bg-clip-text bg-gradient-to-r ${
            darkMode
              ? "from-gray-100 via-blue-50 to-purple-100"
              : "from-purple-950 via-blue-800 to-purple-500"
          } text-center text-4xl animate-pulse text-wrap`}
        >
          Delivering Sustainable packaging at your doorstep
        </h2>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl flex flex-col justify-center items-center gap-2">
          <span className="shadow-2xl shadow-[#94bbe9] animate-bounce">
            Scroll
          </span>
          <span>
            <FaArrowAltCircleDown className="text-[#94bbe9] animate-pulse" />
          </span>
        </p>
      </div>
    </>
  );
};
export default Hero;
