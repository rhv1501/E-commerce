const useLogin = (props) => {
  const { email, password } = props;
  try {
    fetch("localhost:6000/api/authlogin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (e) {
    console.log(e);
  }
};

export default useLogin;
