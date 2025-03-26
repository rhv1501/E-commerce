import { useEffect, useRef, useState } from "react";
import useLogin from "../Hooks/useLogin";
import Typed from "typed.js";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const el = useRef(null);
  const pref = useRef(null);
  const log = useLogin();
  const islogged = useAuth();
  const [formval, setFormval] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (islogged) {
      navigate("/");
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showp, setShowp] = useState(false);
  if (!islogged) {
    return (
      <>
        <div className="bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff] w-full h-[100vh] flex items-center justify-center flex-col">
          <p
            ref={el}
            className="text-white font-bold font-serif fixed top-15 text-lg lg:text-3xl"
          />
          <div className="w-[70%] h-[70vh] backdrop-blur-3xl flex items-center justify-center bg-[#00000044] rounded-2xl md:w-[50vh]">
            <div className="flex flex-col items-center gap-4 w-full mx-5 ">
              <input
                type="email"
                className="border-white border-2 rounded-lg text-white p-4 w-full"
                name="email"
                placeholder="Enter Your Email"
                value={formval.email}
                onChange={(e) =>
                  setFormval({ ...formval, [e.target.name]: e.target.value })
                }
              />
              <input
                type="password"
                className="border-white border-2 rounded-lg text-white p-4 w-full"
                name="password"
                placeholder="Enter Your Password"
                ref={pref}
                value={formval.password}
                onChange={(e) =>
                  setFormval({ ...formval, [e.target.name]: e.target.value })
                }
              />
              {!showp ? (
                <button
                  onClick={() => {
                    setShowp(!showp);
                    pref.current.setAttribute("type", "text");
                  }}
                  className="absolute inset-y-0 right-10 flex items-center text-gray-500 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowp(!showp);
                    pref.current.setAttribute("type", "password");
                  }}
                  className="absolute inset-y-0 right-10 flex items-center text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.503-3.19m3.062-3.134A9.957 9.957 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.961 9.961 0 01-3.01 4.524M3 3l18 18"
                    />
                  </svg>
                </button>
              )}
              <button
                className="backdrop-blur-3xl text-white w-auto p-4 rounded-lg font-bold"
                onClick={() => {
                  log(formval.email, formval.password);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Login;
