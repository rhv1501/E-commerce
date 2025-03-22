import { UserContext } from "./UserContext";
import { useReducer } from "react";
import useLogin from "../../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
export const UserContextProvider = ({ children }) => {
  const initialState = {
    user: undefined,
    login: false,
  };
  const navigate = useNavigate();
  const login = useLogin();
  const handleLogin = async (email, password) => {
    const isLoggedIn = await login(email, password);
    console.log(isLoggedIn);
    if (isLoggedIn.ok == true) {
      dispatch({ type: "SetLogin", payload: true });
    }
  };

  function Userreducer(state, action) {
    switch (action.type) {
      case "Login":
        handleLogin(action.payload.email, action.payload.password);
        return state;
      case "SetLogin":
        navigate("/");
        return { ...state, login: action.payload };
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
