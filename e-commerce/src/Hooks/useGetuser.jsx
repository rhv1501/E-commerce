import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useGetuser = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const user = async () => {
    const response = await fetch("http:localhost/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      credentials: "include",
    });
    if (response.ok) {
      dispatch({ type: "GetUser", payload: response.user });
      const data = await response.json();
      return data;
    }
  };
  return user;
};
export default useGetuser;
