// Example of how your changepass function should handle errors:
const changepass = async (oldPassword, newPassword) => {
  try {
    const response = await fetch(
      "http://localhost:5050/api/auth/resetpassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    const data = await response.json();

    // Check if HTTP status indicates success
    if (response.ok) {
      return { success: true, message: data.message, error: false };
    } else {
      return { success: false, message: data.message, error: true };
    }
  } catch (error) {
    return { success: false, message: error.message, error: true };
  }
};
export default changepass;
