const Verifyforgotpassword = async (otpCode, email) => {
  if (otpCode || email) {
    console.log(email, otpCode);
    try {
      const response = await fetch(
        "/api/auth/forgotpasssword/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpCode, email }),
        }
      );

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

export default Verifyforgotpassword;
