import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useGetuser = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const user = async () => {
    const response = await fetch("http://localhost:5050/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "GetUser", payload: data.user });
      return data.user;
    }
  };
  return user;
};
export default useGetuser;
