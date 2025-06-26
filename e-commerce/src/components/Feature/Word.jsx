import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useContext } from "react";
import { UIContext } from "../../context/UI Context/UIContext";
const Word = () => {
  const { darkMode } = useContext(UIContext);
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  useGSAP(() => {
    gsap.to("#word", {
      x: "-100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#page",
        start: "top 0%",
        end: "+=2000",
        scrub: 1.1,
        pin: true,
      },
    });
  });
  return (
    <>
      <div
        id="page"
        className="h-[80vh] w-full p-5 overflow-hidden flex items-center md:h-screen -mt-30"
      >
        <h1
          id="word"
          className={`flex items-center text-[60vw] md:text-[40vw] whitespace-nowrap font-extrabold tracking-tighter leading-none text-transparent bg-clip-text ${
            darkMode
              ? "bg-gradient-to-br from-[#fff0f3] via-[#dff7f0] to-[#cfe0ff]"
              : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
          }`}
        >
          Step into the World of Sustainable packaging
          <img
            src="/assets/word.gif"
            alt="Sustainable packaging"
            className="h-[50vw] object-contain ml-8 w-[50vw] md:h-[30vw] md:w-[30vw]"
          />
        </h1>
      </div>
    </>
  );
};

export default Word;
