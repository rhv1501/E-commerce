const verifyotp = async (otpCode) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          error: false,
          success: true,
          message: result.message || "OTP verified successfully",
        };
      } else {
        return {
          error: true,
          success: false,
          message: result.message || "Invalid OTP",
        };
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      return {
        error: true,
        success: false,
        message: "Server Error",
      };
    }
  } else {
    return {
      error: true,
      success: false,
      message: "Auth not found",
    };
  }
};

export default verifyotp;
