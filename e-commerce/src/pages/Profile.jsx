import { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../context/UI Context/UIContext";
import changepass from "../utils/changepass";

const Profile = () => {
  const { darkMode } = useContext(UIContext);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setoldpassword] = useState("");
  const [newPassword, setnewdpassword] = useState("");
  const [showold, setshowold] = useState(false);
  const [shownew, setshownew] = useState(false);
  const [modalmessage, setshowmodalmessage] = useState(undefined);
  const [modalsucess, setmodalsucess] = useState(undefined);
  const [modalerror, setmodalerror] = useState(undefined);
  const [modalload, setmodalload] = useState(undefined);

  const handlepasswordchange = async (e) => {
    e.preventDefault();

    // Reset all states
    setmodalload(true);
    setmodalsucess(false);
    setmodalerror(false);
    setshowmodalmessage("");
    try {
      const result = await changepass(oldPassword, newPassword);

      // Handle the case where result might be null/undefined
      if (!result) {
        setmodalload(false);
        setmodalerror(true);
        setmodalsucess(false);
        setshowmodalmessage("Network error occurred");
        return;
      }

      const { error, message, success } = result;
      if (message == "User not verified") {
        setTimeout(() => {
          navigate("/verify");
        }, 5000);
      }

      setshowmodalmessage(message || "");

      // Check for explicit success and no error
      if (success === true && !error) {
        setmodalload(false);
        setmodalsucess(true);
        setmodalerror(false);
        setoldpassword("");
        setnewdpassword("");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        // Any other case is treated as error
        setmodalload(false);
        setmodalerror(true);
        setmodalsucess(false);
      }
    } catch (err) {
      console.error("Password change error:", err);
      setmodalload(false);
      setmodalerror(true);
      setmodalsucess(false);
      setshowmodalmessage(err.message || "An unexpected error occurred");
    } finally {
      setTimeout(() => {
        setmodalerror(false);
        setmodalsucess(false);
        setshowmodalmessage(undefined);
      }, 5000);
    }
  };

  return (
    <>
      <Navbar />

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent backdrop-blur-md z-10" />
          <div className="relative z-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-10 rounded-xl text-white w-1/2 min-w-xs">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <form
              method="post"
              className=" flex flex-col gap-2 relative"
              onSubmit={handlepasswordchange}
            >
              <input
                placeholder="Enter your old Password"
                type={`${showold ? "text" : "password"}`}
                name="oldPassword"
                id="oldPassword"
                className="border-white border-2 rounded-lg p-2 outline-none"
                value={oldPassword}
                onChange={(e) => {
                  setoldpassword(e.target.value);
                }}
              />
              <input
                placeholder="Enter your new password"
                type={`${shownew ? "text" : "password"}`}
                name="newPassword"
                id="newPassword"
                className="border-white border-2 rounded-lg p-2 outline-none"
                value={newPassword}
                onChange={(e) => {
                  setnewdpassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute top-2.5 right-1.5 cursor-pointer"
                onClick={() => {
                  setshowold(!showold);
                }}
              >
                {showold ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.746M6.423 6.423A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.036M6.423 6.423L3 3m0 0l18 18m-18-18l4.243 4.243M21 21l-3.243-3.243"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="absolute top-15.5 right-1.5"
                onClick={() => {
                  setshownew(!shownew);
                }}
              >
                {shownew ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.746M6.423 6.423A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.036M6.423 6.423L3 3m0 0l18 18m-18-18l4.243 4.243M21 21l-3.243-3.243"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              <div className="flex items-center justify-center pt-1">
                <button type="submit" className="p-2 bg-red-600 rounded-lg">
                  Change
                </button>
              </div>
            </form>
            <button
              className="absolute top-0 right-3 text-2xl font-extrabold text-red-400 animate-pulse cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            >
              x
            </button>
            {modalload ||
              (modalmessage && (
                <div
                  className={`absolute ${modalsucess ? "bg-green-600" : null} ${
                    modalerror ? "bg-red-700" : null
                  } ${
                    modalload ? "bg-yellow-400" : null
                  } bottom-0 left-0 w-full rounded-lg p-1`}
                >
                  {modalmessage}
                  {modalload ? "loading...." : null}
                </div>
              ))}
          </div>
        </div>
      )}

      <div
        className={`${
          showModal ? "filter blur-sm pointer-events-none" : "h-screen"
        } transition duration-300`}
      >
        <div className="flex items-center justify-center pt-28">
          <img
            src={
              state.user.profilePicture
                ? state.user.profilePicture
                : "/assets/defimageuri.png"
            }
            alt="Profile"
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
        <div className="flex items-start justify-center pt-10 pl-5 flex-col gap-2">
          <div className="flex">
            <h1
              className={`text-md md:text-2xl font-bold ${
                darkMode ? "text-[#94bbe9]" : "text-[#1f4e78]"
              }`}
            >
              Email: {state.user.email}
            </h1>
            <button
              className={`ml-4 ${
                state.user.verified ? "bg-green-500" : "bg-indigo-500"
              } p-1 rounded-lg text-white text-xs md:text-lg`}
              onClick={() => {
                if (!state.user.verified) navigate("/verify");
              }}
            >
              {state.user.verified ? "Verified" : "Verify"}
            </button>
          </div>
          <div className="flex gap-0.5">
            {" "}
            <h1
              className={`text-md md:text-2xl font-bold ${
                darkMode ? "text-[#94bbe9]" : "text-[#1f4e78]"
              }`}
            >
              Password:
            </h1>
            <button
              className="p-1 bg-indigo-500 rounded-lg text-white cursor-pointer text-xs md:text-md"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
