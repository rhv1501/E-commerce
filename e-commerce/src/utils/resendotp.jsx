const resendotp = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await fetch("http://localhost:5050/api/auth/sendotp", {
        method: "post",
        headers: {
          token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        return { error: false, success: true, message: data.message };
      } else {
        return { error: true, success: false, message: data.message };
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return { error: true, success: false, message: "server error" };
    }
  } else {
    return { error: true, success: false, message: "Auth not Found" };
  }
};

export default resendotp;
