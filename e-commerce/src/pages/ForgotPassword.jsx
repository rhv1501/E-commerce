import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext/UserContext";

export function ForgotPassword() {
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [pass, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      setError(true);
      setMessage("Verify your OTP first.");
      setTimeout(() => {
        navigate("/forgotpassword");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    setMessage("verifying....");
    if (pass) {
      try {
        const res = await fetch(
          "http://localhost:5050/api/auth/forgotpassword/change",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: pass,
              email: localStorage.getItem("email"),
            }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPassword("");
          localStorage.removeItem("email");
          setMessage(data.message);
          dispatch({ type: "revertResetPasswordverified" });
          setTimeout(() => {
            navigate("/auth");
          }, 2000);
        } else {
          setMessage(data.message);
          if (data.message === "OTP not verified") {
            setError(true);
            setMessage("Please verify your OTP first.");
            setTimeout(() => {
              navigate("/forgotpassword");
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Error changing password:", error);
        setError(true);
        setMessage("An error occurred while changing the password.");
      }
    } else {
      alert("Please enter a new password.");
    }
  };
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
        }}
        className="flex items-center justify-center px-4 text-white"
      >
        <form
          onSubmit={handlesubmit}
          style={{
            width: "100%",
            maxWidth: "24rem",
            padding: "2rem",
            borderRadius: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0 10px 30px rgba(148, 187, 233, 0.3)",
          }}
          className="flex flex-col items-center gap-6 relative"
        >
          <span className="text-2xl md:text-3xl font-bold">
            Forgot Password{" "}
            <span className="text-red-800 absolute right-7 top-3">
              <Link to={"/forgotpassword"} className="font-extrabold">
                x
              </Link>
            </span>
          </span>

          <p className="text-sm md:text-base leading-6 text-center">
            Enter your new Password to continue.
          </p>

          <input
            type="text"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your New Password"
            minLength={8}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#e5e7eb",
              borderRadius: "0.5rem",
              outline: "none",
              color: "#374151",
            }}
            className="focus:bg-indigo-100"
          />

          <button
            type="submit"
            style={{
              width: "100%",
              height: "3rem",
              backgroundColor: `${!error && !message ? "#4f46e5" : "red"}`,
              color: "#fff",
              fontWeight: "600",
              borderRadius: "0.75rem",
              transition: "all 0.3s",
            }}
            className="hover:bg-indigo-600"
          >
            {message ? message : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
}
