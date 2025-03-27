import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
const useAuth = () => {
  const context = useContext(UserContext);
  const { state } = context || {};
  if (!state?.login) {
    return false;
  }
  return true;
};
export default useAuth;
