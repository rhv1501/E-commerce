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
            cart: action.payload.cart,
            totalPrice: action.payload.totalPrice,
            cartCount: action.payload.cartCount,
          },
        };
      case "RemoveFromCart":
        return {
          ...state,
          user: {
            ...state.user,
            cart: action.payload.cart,
            totalPrice: action.payload.totalPrice,
            cartCount: action.payload.cartCount,
          },
        };
      case "verified":
        return {
          ...state,
          user: {
            ...state.user,
            verified: true,
          },
        };
      case "ResetPasswordverified":
        return {
          ...state,
          user: {
            ...state.user,
            resetverified: true,
          },
        };
      case "revertResetPasswordverified":
        return {
          ...state,
          user: {
            ...state.user,
            resetverified: false,
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
