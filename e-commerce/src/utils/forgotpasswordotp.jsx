const forgotpasswordotp = async (email) => {
  try {
    const res = await fetch("http://localhost:5050/api/auth/forgotpassword", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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
};

export default forgotpasswordotp;
