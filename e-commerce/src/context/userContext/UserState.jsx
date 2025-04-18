import { UserContext } from "./UserContext";
import { useReducer } from "react";
export const UserContextProvider = ({ children }) => {
  const initialState = {
    user: " ",
  };
  function Userreducer(state, action) {
    switch (action.type) {
      case "GetUser":
        return { ...state, user: action.payload };
      case "AddToCart":
        return {
          ...state,
          user: {
            ...state.user,
            cart: [...state.user.cart, action.payload],
          },
        };
      case "RemoveFromCart":
        return {
          ...state,
          user: {
            ...state.user,
            cart: state.user.cart.filter((item) => item._id !== action.payload),
          },
        };

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
