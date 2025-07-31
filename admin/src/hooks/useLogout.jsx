const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("admin-token");
    window.location.href = "/admin/auth";
  };
  return { logout };
};

export default useLogout;
