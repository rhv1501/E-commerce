import { Link } from "react-router-dom";
const Sidebar = ({ on }) => {
  return (
    <div
      className={`h-full md:w-[20%] w-[50%] bg-gradient-to-tr from-purple-800 via-indigo-600 to-blue-400 fixed ${
        !on ? "-left-100" : "left-0"
      } bottom-0 z-99 backdrop-blur-2xl transition-all duration-500 ease-in-out`}
    >
      <div className="flex flex-col text-md text-wrap relative top-20">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white">Admin</h2>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          <li
            className={`text-white hover:bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 p-2 rounded relative ${
              on ? "left-0" : "left-[-100%]"
            } transition-all duration-1000 ease-in-out`}
          >
            <Link to="/">Dashboard</Link>
          </li>
          <li
            className={`text-white hover:bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 p-2 rounded relative ${
              on ? "left-0" : "left-[-100%]"
            } transition-all duration-2000 ease-in-out`}
          >
            <Link to={"/Orders"}>Orders</Link>
          </li>
          <li
            className={`text-white hover:bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 p-2 rounded relative ${
              on ? "left-0" : "left-[-100%]"
            } transition-all duration-3000 ease-in-out`}
          >
            Products
          </li>
          <li
            className={`text-white hover:bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 p-2 rounded relative ${
              on ? "left-0" : "left-[-100%]"
            } transition-all duration-4000 ease-in-out`}
          >
            Customers
          </li>
          <li
            className={`text-white hover:bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 p-2 rounded relative ${
              on ? "left-0" : "left-[-100%]"
            } transition-all duration-5000`}
          >
            Reports
          </li>
        </ul>
        <div className="flex-grow"></div>
        <div className="p-4">
          <button className="w-full p-2 rounded hover:bg-red-700 bg-gray-700">
            Logout
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 text-white p-2 text-center">
        &copy; {new Date(Date.now()).getFullYear()} PKG IT Admin
      </div>
    </div>
  );
};

export default Sidebar;
