import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useLogout = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const logout = () => {
    dispatch({ type: "SetLogout", payload: { login: false } });
  };
  return logout;
};
export default useLogout;
