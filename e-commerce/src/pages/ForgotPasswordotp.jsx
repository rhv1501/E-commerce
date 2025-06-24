import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext/UserContext";
import forgotpasswordotp from "../utils/forgotpasswordotp";
import Verifyforgotpassword from "../utils/verifyforgotpassword";
const ForgotPasswordotpui = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [otpTouched, setOtpTouched] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent at least once
  const [email, setEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpTouched(true);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    setIsInputFilled(otp.every((digit) => digit.length === 1));
  }, [otp]);

  useEffect(() => {
    if (isInputFilled && otpTouched && !verifyLoading) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFilled]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const otpCode = otp.join("");
    setVerifyLoading(true);
    setVerifyStatus("");
    setVerifyMessage("");

    try {
      const { error, success, message } = await Verifyforgotpassword(
        otpCode,
        email
      );
      if (success) {
        setVerifyStatus("success");
        setVerifyMessage(message || "OTP Verified Successfully!");
        dispatch({ type: "ResetPasswordverified" });
        setTimeout(() => navigate("/changepassword"), 1500);
      } else if (error) {
        setVerifyStatus("error");
        setVerifyMessage(message || "Invalid OTP");
        if (error.message === "OTP already verified") {
          dispatch({ type: "ResetPasswordverified" });
          setTimeout(() => navigate("/changepassword"), 1500);
        }
      }
    } catch {
      setVerifyStatus("error");
      setVerifyMessage("Something went wrong. Try again.");
    } finally {
      setVerifyLoading(false);
      setTimeout(() => {
        setVerifyMessage("");
        setVerifyStatus("");
      }, 5000);
    }
  };

  const handleresend = async () => {
    // If OTP sent before, countdown disables button, else allow sending anytime
    if ((countdown > 0 && otpSent) || resendLoading) return;

    setResendLoading(true);
    setResendStatus("");
    setResendMessage("");

    try {
      const { error, success, message } = await forgotpasswordotp(email);
      if (message === "user verified already") {
        console.log("User already verified, redirecting to change password...");
        setVerifyStatus("error");
        setVerifyMessage(
          "User already verified. Redirecting to change password..."
        );
        dispatch({ type: "ResetPasswordverified" });
        setTimeout(() => navigate("/changepassword"), 1500);
        return;
      }
      if (success) {
        setCountdown(60);
        setResendStatus("success");
        setResendMessage(
          message ||
            (otpSent ? "OTP Resent Successfully!" : "OTP Sent Successfully!")
        );
        setOtpTouched(false);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
        setOtpSent(true);
      } else if (error) {
        setResendStatus("error");
        setResendMessage(message || "Failed to send OTP");
      }
    } catch {
      setResendStatus("error");
      setResendMessage("Something went wrong. Try again.");
    } finally {
      setResendLoading(false);
      setTimeout(() => {
        setResendMessage("");
        setResendStatus("");
      }, 5000);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    handleresend();
    setShowOtpScreen(true);
    localStorage.setItem("email", email);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
      }}
      className="flex items-center justify-center px-4 text-white"
    >
      {!showOtpScreen ? (
        <form
          onSubmit={handleEmailSubmit}
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
              <Link to={"/"} className="font-extrabold">
                x
              </Link>
            </span>
          </span>

          <p className="text-sm md:text-base leading-6 text-center">
            Enter your email address to receive a verification code
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
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
              backgroundColor: "#6366f1",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "0.75rem",
              transition: "all 0.3s",
            }}
            className="hover:bg-indigo-600"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
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
          <span className="text-sm font-bold text-gray-300">
            {`${localStorage.getItem("email")},`}{" "}
            <button
              onClick={() => setShowOtpScreen(false)}
              className="text-indigo-400 hover:opacity-80 hover:scale-105 transition-scale  transition-opacity ease-in-out duration-200"
            >
              change email ?
            </button>
          </span>
          <span className="text-2xl md:text-3xl font-bold animate-pulse">
            Enter OTP{" "}
            <span className="text-red-800 absolute right-7 top-3">
              <Link to={"/"} className="font-extrabold">
                x
              </Link>
            </span>
          </span>

          <p className="text-sm md:text-base leading-6 text-center">
            We have sent a verification code to your Email Address
          </p>

          <div className="flex gap-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                required
                maxLength="1"
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "3rem",
                  height: "3rem",
                  textAlign: "center",
                  borderRadius: "0.5rem",
                  outline: "none",
                  fontWeight: "600",
                  color: "#374151",
                  transition: "all 0.3s",
                }}
                className="focus:bg-indigo-100 focus:scale-110"
              />
            ))}
          </div>

          {verifyMessage && (
            <div
              style={{
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor:
                  verifyStatus === "success" ? "#16a34a" : "#dc2626",
                color: "#fff",
                animation: "fade-in 0.5s ease-in-out",
              }}
            >
              {verifyMessage}
            </div>
          )}

          {resendMessage && (
            <div
              style={{
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor:
                  resendStatus === "success" ? "#22c55e" : "#f43f5e",
                color: "#fff",
                animation: "fade-in 0.5s ease-in-out",
              }}
            >
              {resendMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={verifyLoading}
            style={{
              width: "100%",
              height: "3rem",
              backgroundColor: verifyLoading ? "#818cf8" : "#6366f1",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "0.75rem",
              transition: "all 0.3s",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              cursor: verifyLoading ? "not-allowed" : "pointer",
            }}
          >
            {verifyLoading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>

          <button
            type="button"
            onClick={handleresend}
            disabled={(countdown > 0 && otpSent) || resendLoading}
            style={{
              fontSize: "1.125rem",
              fontWeight: "700",
              color:
                (countdown > 0 && otpSent) || resendLoading
                  ? "#9ca3af"
                  : "#818cf8",
              cursor:
                (countdown > 0 && otpSent) || resendLoading
                  ? "not-allowed"
                  : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            {resendLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent" />
                Sending code...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              "Resend Code"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordotpui;
