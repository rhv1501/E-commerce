import { useState, useContext } from "react";
import { UIContext } from "../../context/UI Context/UIContext";
import useLogout from "../../Hooks/useLogout";
import { UserContext } from "../../context/userContext/UserContext";
const Navbar = () => {
  const [on, setOn] = useState(false);
  const darkmodeContext = useContext(UIContext);
  const { darkMode, setDarkMode } = darkmodeContext;
  const logout = useLogout();
  const handlelogout = () => {
    logout();
  };
  const context = useContext(UserContext);
  const { state } = context;
  return (
    <>
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[50%] lg:w-auto">
        <div className="bg-transparent w-auto h-auto p-4 flex items-center justify-evenly shadow-2xl shadow-[#94bbe9] rounded-2xl gap-8">
          <div className="flex">
            <h2 className="font-extrabold text-nowrap text-2xl">PKG IT</h2>
          </div>
          <ul className="hidden lg:flex gap-4">
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
          </ul>
          <div className="hidden lg:flex gap-4">
            <button
              className="bg-[#94bbe9] px-4 py-1 rounded-lg"
              onClick={handlelogout}
            >
              Logout
            </button>
          </div>
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
          <ul className="fixed w-full flex flex-col gap-4 px-5 py-2 bg-tranparent rounded-lg shadow-2xl shadow-[#94bbe9] lg:hidden">
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
            <li>
              <button
                className="bg-[#94bbe9] px-4 py-1 rounded-lg"
                onClick={handlelogout}
              >
                Logout
              </button>
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
          <img
            src={state.user.profilePicture}
            alt="User Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/path/to/fallback-image.jpg";
            }}
            loading="lazy"
            className="w-11"
          />
        ) : (
          "User"
        )}
      </div>
    </>
  );
};

export default Navbar;
