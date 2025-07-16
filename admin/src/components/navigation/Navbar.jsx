import { useEffect, useState } from "react";
import { FaGripLines } from "react-icons/fa";
import Sidebar from "./Sidebar";
const Navbar = () => {
  const [on, setOn] = useState(false);
  const [ani, setAni] = useState(false);
  useEffect(() => {
    const int = setInterval(() => {
      setAni(true);
      setTimeout(() => {
        setAni(false);
      }, 2000);
    }, 20000);
    return () => {
      clearInterval(int);
    };
  }, []);
  return (
    <>
      <nav className="z-100 h-auto p-5 fixed top-0 left-0 bg-gradient-to-tr from-purple-800 via-indigo-600 to-blue-400 w-full flex items-center font-bold overflow-x-hidden text-white">
        <div onClick={() => setOn(!on)} className="cursor-pointer">
          <FaGripLines
            className={`text-xl ${
              ani ? "animate-bounce" : null
            } transform text-bold ${
              on ? "-rotate-90" : " rotate-360"
            } transition-all duration-500`}
          />
        </div>
        <h2 className="mx-auto text-2xl font-bolder">PKG IT</h2>
      </nav>
      <Sidebar on={on} />
    </>
  );
};

export default Navbar;
