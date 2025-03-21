import { UserContext } from "./UserContext";
import { useReducer } from "react";
import useLogin from "../../Hooks/useLogin";
export const UserContextProvider = ({ children }) => {
  const initialState = {
    user: undefined,
    login: false,
  };
  const login = useLogin();

  const handleLogin = (email, password) => {
    login(email, password);
  };
  function Userreducer(state, action) {
    switch (action.type) {
      case "Login":
        handleLogin(action.payload.email, action.payload.password);
        return { ...state, login: true };
    }
  }

  const [state, dispatch] = useReducer(Userreducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
