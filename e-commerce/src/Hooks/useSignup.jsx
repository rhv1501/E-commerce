const useSignup = () => {
  const signup = async (email, password, username, ugender) => {
    try {
      const gender = ugender.toLowerCase();
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, gender }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        return {
          error: false,
          message:
            "Signup successful and otp disptached succesfully for verification",
        };
      }
      if (response.status === 400) {
        return { error: true, message: data.message };
      }
      if (response.status === 500) {
        alert("Server error");
        return { error: true, message: data.message };
      }
    } catch (e) {
      console.error(e);
      return { error: true, message: "Server error" };
    }
  };
  return signup;
};
export default useSignup;
