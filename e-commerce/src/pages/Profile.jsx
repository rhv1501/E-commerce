import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../context/UI Context/UIContext";

const Profile = () => {
  const { darkMode } = useContext(UIContext);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center pt-28">
        <img
          src={
            state.user.profilePicture
              ? state.user.profilePicture
              : "/assets/defimageuri.png"
          }
          alt="image not found"
          width={"20%"}
        />
      </div>
      <div className="flex items-center justify-center pt-10">
        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-[#94bbe9]" : "text-[#1f4e78]"
          }`}
        >
          {state.user.username}
        </h1>
      </div>
      <div className="flex items-center justify-start pt-10 pl-5">
        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-[#94bbe9]" : "text-[#1f4e78]"
          }`}
        >
          Email: {state.user.email}
        </h1>
        <button
          className={`ml-4 ${
            state.user.verified ? "bg-green-500" : "bg-indigo-500"
          } p-1 rounded-lg text-white`}
          onClick={() => {
            if (!state.user.verified) navigate("/verify");
          }}
        >
          {state.user.verified ? "Verified" : "Verify"}
        </button>
      </div>
    </>
  );
};

export default Profile;
