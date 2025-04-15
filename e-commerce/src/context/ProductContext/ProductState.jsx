import { ProductContext } from "./ProductContext";
import { useReducer } from "react";
export const ProductContextProvider = ({ children }) => {
  const initialState = {
    products: [],
    selectedProduct: [],
  };

  function Userreducer(state, action) {
    switch (action.type) {
      case "products":
        return { ...state, products: action.payload };

      case "getproductbyid":
        return {
          ...state,
          selectedProduct: state.products.find(
            (item) => item.id === action.payload
          ),
        };

      case "getproductbycategory":
        return {
          ...state,
          products: state.products.filter(
            (item) => item.category === action.payload
          ),
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(Userreducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
