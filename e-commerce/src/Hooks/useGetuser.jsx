import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useGetuser = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const user = async () => {
    const response = await fetch("http:localhost/api/auth/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      dispatch({ type: "GetUser", payload: response.user });
    }
  };
  return user;
};
export default useGetuser;
