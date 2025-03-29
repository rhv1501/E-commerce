const useAuth = () => {
  if (!localStorage.getItem("token")) {
    return false;
  }
  return true;
};
export default useAuth;
