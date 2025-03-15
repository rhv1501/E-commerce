import { useState } from "react";

const Navbar = () => {
  const [on, seton] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-50">
        <div className="bg-green-700 w-full h-[6.5vh] flex items-center justify-evenly">
          <div className="flex">
            <h2>Fast Commerce</h2>
          </div>
          <ul className="hidden md:flex gap-4">
            <li>
              <link to="/About">About</link>
            </li>
            <li>Contact </li>
            <li>Products</li>
          </ul>
          <div className="flex gap-4">
            <button className="bg-green-500 px-4 py-1 rounded-lg">Login</button>
            <button className="bg-green-500 px-4 py-1 rounded-lg">
              Sign Up
            </button>
          </div>
          <button
            onClick={() => {
              seton(!on);
            }}
            className="md:hidden"
          >
            {on ? "||" : "☰"}
          </button>
        </div>
        {on && (
          <ul className="absolute w-full flex flex-col gap-4 px-5 py-2 bg-gray-700 text-white md:hidden">
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
