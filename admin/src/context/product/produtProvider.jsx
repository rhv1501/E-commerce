import { useReducer } from "react";
import ProductContext from "./productContext";
const ProductProvider = ({ children }) => {
  const productState = {
    products: [],
    loading: false,
    error: null,
  };
  const productReducer = (state, action) => {
    switch (action.type) {
      case "GetProducts":
        return { ...state, products: action.payload, loading: false };
      case "deleteProduct":
        return {
          ...state,
          products: state.products.filter(
            (product) => product._id !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(productReducer, productState);

  return (
    <ProductContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
