import { UserContext } from "./UserContext";
import { useReducer } from "react";
export const UserContextProvider = ({ children }) => {
  const initialState = {
    user: undefined,
    login: false,
  };
  function Userreducer(state, action) {
    switch (action.type) {
      case "SetLogin":
        console.log(action.payload);
        return { ...state, login: true };
      case "SetLogout":
        return { ...state, login: false };
      case "GetUser":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(Userreducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
