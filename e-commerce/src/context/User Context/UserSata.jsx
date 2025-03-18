import { UserContext } from "./UserContext";
import { useGetUser } from "../../Hooks/useGetUser";
import { useReducer } from "react";

export const UserState = ({ children }) => {
  const { data, isLoading, isError, error } = useGetUser();
  if (!isLoading) {
    const initalstate = {
      user: data,
    };
  }
  return (
    <UserContext.Provider value={{ data, isLoading, isError, error }}>
      {children}
    </UserContext.Provider>
  );
};
