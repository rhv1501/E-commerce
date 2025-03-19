import { useEffect, useRef } from "react";
import Typed from "typed.js";
const Login = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Hey There,",
        "Ready To Improve Your Packaging Game ?",
        "Welcome To Pkg IT",
        "Login/Signup To Get Started",
      ],
      typeSpeed: 100,
      backSpeed: 30,
      showCursor: false,
      onComplete: () => {},
      onStringTyped: () => {},
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div className="bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff] w-full h-[100vh] flex items-center justify-center flex-col">
        <p
          ref={el}
          className="text-white font-bold font-serif fixed top-15 text-lg lg:text-3xl"
        />
        <div className="w-[50vh] h-[70vh] backdrop-blur-3xl flex items-center justify-center bg-[#00000044] rounded-2xl">
          <div className="flex flex-col items-center gap-4 w-full mx-5">
            <input
              type="email"
              className="border-white border-2 rounded-lg text-white p-4 w-full"
              name="email"
              id="email "
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              className="border-white border-2 rounded-lg text-white p-4 w-full"
              name="password"
              id="email "
              placeholder="Enter Your Password"
            />
            <button className="backdrop-blur-3xl text-white w-auto p-4 rounded-lg font-bold">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
