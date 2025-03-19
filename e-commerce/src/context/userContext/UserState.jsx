import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
export const UserContextProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
