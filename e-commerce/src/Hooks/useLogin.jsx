const useLogin = () => {
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  return login;
};

export default useLogin;
