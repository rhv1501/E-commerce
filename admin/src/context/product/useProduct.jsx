import { useContext } from "react";
import ProductContext from "./productContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within an OrderProvider");
  }
  return context;
};
