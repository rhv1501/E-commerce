import { useCallback, useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { toast } from "react-toastify";
const useGetuser = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const user = useCallback(async () => {
    const response = await fetch("/api/auth/user", {
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
    if (response.status === 401) {
      const data = await response.json();
      if (data.error === "Token is blacklisted") {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        return null;
      }
    }
  }, [dispatch]);
  return user;
};
export default useGetuser;
