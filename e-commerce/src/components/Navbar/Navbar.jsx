import { useState, useContext } from "react";
import { UIContext } from "../../context/UI Context/UIContext";
import useLogout from "../../Hooks/useLogout";
import { UserContext } from "../../context/userContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { islogged } = useContext(AuthContext);
  const [on, setOn] = useState(false);
  const [usertoggle, setusertoggle] = useState(false);
  const darkmodeContext = useContext(UIContext);
  const { darkMode, setDarkMode } = darkmodeContext;
  const navigate = useNavigate();
  const logout = useLogout();
  const handlelogout = () => {
    logout();
  };
  const handlelogin = () => {
    navigate("/auth");
  };
  const context = useContext(UserContext);
  const { state } = context;
  return (
    <>
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-100 w-[50%] lg:w-auto">
        <div className="bg-transparent w-auto h-auto p-4 flex items-center justify-evenly shadow-2xl shadow-[#94bbe9] rounded-2xl gap-8">
          <div className="flex">
            <h2 className="font-extrabold text-nowrap text-2xl">
              <Link to="/">PKG IT</Link>
            </h2>
          </div>
          <ul className="hidden lg:flex gap-4">
            <li>
              {" "}
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
          <button
            onClick={() => {
              setOn(!on);
            }}
            className="lg:hidden font-bold text-2xl"
          >
            {on ? "✖" : "☰"}
          </button>
        </div>
        {on && (
          <ul className="fixed w-full flex flex-col gap-4 px-5 py-2 bg-[#94bce9d2] rounded-lg shadow-2xl shadow-[#94bbe9] lg:hidden text-white font-extrabold">
            <li>
              <Link to="/about">About </Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        )}
      </nav>
      <div
        className="cursor-pointer fixed right-5 top-5 z-50 p-4 rounded-full bg-gray-200 shadow-2xl shadow-[#94bbe9]"
        onClick={() => setDarkMode(!darkMode)}
      >
        {!darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gray-500"
            fillRule="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M17.293 13.293a8 8 0 0 1-6.586-11.174 8.001 8.001 0 1 0 9.467 9.467 8 8 0 0 1-2.881 1.707z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m7.071-7.071h1M3 12h1m2.93-5.657l.707.707m11.314 11.314l.707.707M16.97 5.657l-.707.707M5.657 16.97l.707.707M12 7a5 5 0 1 0 0 10A5 5 0 1 0 12 7z"
            />
          </svg>
        )}
      </div>
      <div className="cursor-pointer fixed left-5 top-5 z-50 rounded-full bg-gray-200 shadow-2xl shadow-[#94bbe9] border-2 border-[#94bbe9] border-dotted">
        {state.user ? (
          <>
            <img
              src={
                state.user.profilePicture
                  ? state.user.profilePicture
                  : "/assets/defimageuri.png"
              }
              alt="User Profile"
              onClick={() => {
                setusertoggle(!usertoggle);
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/defimageuri.png";
              }}
              loading="lazy"
              className="w-11"
            />
          </>
        ) : (
          "User"
        )}
        {usertoggle && (
          <div className="absolute w-auto h-auto p-4 bg-transparent shadow-2xl shadow-[#94bbe9] rounded-2xl mt-1">
            <ul>
              <li className="hover:text-[#94bbe9]">
                <Link to={"/cart"}>Cart</Link>
              </li>
              {islogged && (
                <>
                  <li>
                    <Link
                      to={"/profile"}
                      className="hover:text-[#94bbe9] cursor-pointer"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="hover:text-[#94bbe9] cursor-pointer"
                      onClick={handlelogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!islogged && (
                <li>
                  <button
                    className="hover:text-[#94bbe9] cursor-pointer"
                    onClick={handlelogin}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
