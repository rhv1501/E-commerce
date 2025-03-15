import { useState } from "react";

const Navbar = () => {
  const [on, setOn] = useState(false);
  return (
    <>
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[50%] lg:w-auto">
        <div className="bg-transparent w-auto h-auto p-4 flex items-center justify-evenly shadow-2xl shadow-[#94bbe9] text-black rounded-2xl gap-8">
          <div className="flex">
            <h2 className="font-extrabold">PKG IT</h2>
          </div>
          <ul className="hidden lg:flex gap-4">
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
          </ul>
          <div className="hidden lg:flex gap-4">
            <button className="bg-green-500 px-4 py-1 rounded-lg">Login</button>
            <button className="bg-green-500 px-4 py-1 rounded-lg">
              Sign Up
            </button>
          </div>
          <button
            onClick={() => {
              setOn(!on);
            }}
            className="lg:hidden"
          >
            {on ? "✖" : "☰"}
          </button>
        </div>
        {on && (
          <ul className="fixed w-full flex flex-col gap-4 px-5 py-2 bg-gray-700 text-white md:hidden">
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
