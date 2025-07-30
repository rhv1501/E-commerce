const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };
  return { logout };
};

export default useLogout;
