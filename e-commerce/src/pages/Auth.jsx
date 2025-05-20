import { useEffect, useRef, useState } from "react";
import useLogin from "../Hooks/useLogin";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import useSignup from "../Hooks/useSignup";

const Auth = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const el = useRef(null);
  const log = useLogin();
  const signup = useSignup();

  const [formval, setFormval] = useState({ email: "", password: "" });
  const [signupVal, setSignupVal] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Prefer not to say",
  });

  const [showSignup, setShowSignup] = useState(false);

  // Login states
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  // Signup states
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  // Typed animation on header
  useEffect(() => {
    if (el.current) {
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
      });
      return () => typed.destroy();
    }
  }, []);

  // Handle window resize for mobile check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear login messages/errors after 5 seconds
  useEffect(() => {
    if (loginError || loginMsg) {
      const timer = setTimeout(() => {
        setLoginError("");
        setLoginMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginError, loginMsg]);

  // Clear signup messages/errors after 5 seconds
  useEffect(() => {
    if (signupError || signupMsg) {
      const timer = setTimeout(() => {
        setSignupError("");
        setSignupMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupError, signupMsg]);

  // Login validation
  const validateLogin = () => {
    if (!formval.email || !formval.password) {
      setLoginError("Please fill all fields");
      return false;
    }
    return true;
  };

  // Handle Login button click
  const handleLogin = async () => {
    if (!validateLogin()) return;

    setLoginLoading(true);
    setLoginError("");
    setLoginMsg("");

    const res = await log(formval.email, formval.password);

    if (res.error) {
      setLoginError(res.message);
      setLoginLoading(false);
    } else {
      setLoginMsg(res.message);
      setLoginLoading(false);
      // Navigate to home after 2 seconds so user can see success message
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  // Signup validation
  const validateSignup = () => {
    if (
      !signupVal.username ||
      !signupVal.email ||
      !signupVal.password ||
      !signupVal.confirmPassword
    ) {
      setSignupError("Please fill all fields");
      return false;
    }
    if (signupVal.password !== signupVal.confirmPassword) {
      setSignupError("Passwords do not match");
      return false;
    }
    return true;
  };

  // Handle Signup button click
  const handleSignup = async () => {
    if (!validateSignup()) return;

    setSignupLoading(true);
    setSignupError("");
    setSignupMsg("");

    const res = await signup(
      signupVal.email,
      signupVal.password,
      signupVal.username,
      signupVal.gender
    );
    if (res.error) {
      setSignupError(res.message);
      setSignupLoading(false);
      return;
    } else {
      setSignupLoading(false);
      setSignupMsg(res.message);
      setShowSignup(false);
      // Optionally reset signup form here
      setSignupVal({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "Prefer not to say",
      });
      setTimeout(() => {
        navigate("/verify");
      }, 5000);
    }
  };

  // Button color classes based on state
  const getButtonClass = (loading, error, msg) => {
    if (loading) return "bg-yellow-500";
    if (error) return "bg-red-500";
    if (msg) return "bg-green-600";
    return "bg-gradient-to-r from-pink-500 to-purple-600";
  };

  return (
    <>
      <div className="flex items-center justify-center z-50">
        <p
          ref={el}
          className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 inline-block text-transparent bg-clip-text font-bold font-serif fixed top-10 text-lg lg:text-3xl text-center z-50"
        />
      </div>

      <div className="relative w-full h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center overflow-hidden">
        <div className="relative w-[90%] max-w-5xl h-[80vh] flex flex-col md:flex-row items-center justify-center rounded-3xl overflow-hidden shadow-2xl">
          {/* Login Section */}
          <div
            className={`transition-all duration-700 ease-in-out w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-10 bg-[#00000080] backdrop-blur-xl ${
              showSignup && !isMobile ? "blur-sm opacity-40" : "opacity-100"
            }`}
          >
            <div className="flex flex-col gap-5 w-full max-w-md text-white">
              <input
                type="email"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="email"
                placeholder="Enter Your Email"
                value={formval.email}
                onChange={(e) =>
                  setFormval({ ...formval, [e.target.name]: e.target.value })
                }
              />
              <input
                type="password"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="password"
                placeholder="Enter Your Password"
                value={formval.password}
                onChange={(e) =>
                  setFormval({ ...formval, [e.target.name]: e.target.value })
                }
              />
              <button
                onClick={handleLogin}
                className={`text-white p-3 rounded-lg font-bold transition-all ${getButtonClass(
                  loginLoading,
                  loginError,
                  loginMsg
                )}`}
              >
                {loginLoading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <img src="/assets/loginloading.png" className="w-6" />
                    Logging in...
                  </div>
                ) : loginError ? (
                  loginError
                ) : loginMsg ? (
                  loginMsg
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center">
                Don't have an account?{" "}
                <button
                  className="underline font-semibold"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Signup Section */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-700 z-30 ${
              isMobile
                ? showSignup
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
                : showSignup
                ? "translate-x-0"
                : "translate-x-full pointer-events-none"
            } ${isMobile ? "transition-opacity" : "transition-transform"}`}
          >
            <div className="w-[90%] max-w-md bg-[#000000bb] backdrop-blur-xl p-8 rounded-2xl shadow-lg text-white flex flex-col gap-4">
              <input
                type="text"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="username"
                placeholder="Enter Your Username"
                value={signupVal.username}
                onChange={(e) =>
                  setSignupVal({
                    ...signupVal,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="email"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="email"
                placeholder="Enter Your Email"
                value={signupVal.email}
                onChange={(e) =>
                  setSignupVal({
                    ...signupVal,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="password"
                placeholder="Enter Password"
                value={signupVal.password}
                onChange={(e) =>
                  setSignupVal({
                    ...signupVal,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none placeholder-white"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupVal.confirmPassword}
                onChange={(e) =>
                  setSignupVal({
                    ...signupVal,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <select
                name="gender"
                value={signupVal.gender}
                onChange={(e) =>
                  setSignupVal({
                    ...signupVal,
                    gender: e.target.value,
                  })
                }
                className="bg-transparent border-2 border-white rounded-lg p-4 outline-none text-white"
              >
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <button
                onClick={handleSignup}
                className={`text-white p-3 rounded-lg font-bold transition-all ${getButtonClass(
                  signupLoading,
                  signupError,
                  signupMsg
                )}`}
              >
                {signupLoading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <img src="/assets/loginloading.png" className="w-6" />
                    Signing up...
                  </div>
                ) : signupError ? (
                  signupError
                ) : signupMsg ? (
                  signupMsg
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="text-center">
                Already have an account?{" "}
                <button
                  className="underline font-semibold"
                  onClick={() => setShowSignup(false)}
                >
                  Log In
                </button>
              </p>
            </div>
          </div>

          {/* Overlay when signup visible on desktop */}
          {!isMobile && showSignup && (
            <div
              onClick={() => setShowSignup(false)}
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20 cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
