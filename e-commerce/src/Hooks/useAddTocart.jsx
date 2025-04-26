import { useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useAddTocart = () => {
  const context = useContext(UserContext);
  const { dispatch } = context;
  const addtocart = async (product_id, quantity) => {
    const res = await fetch(
      `http://localhost:5050/api/products/addToCart/${product_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: "AddToCart", payload: product_id });
      return { error: false, message: data.message };
    }
    if (res.status === 401) {
      return { error: true, message: data.message };
    }
    if (res.status === 500) {
      return { error: true, message: data.message };
    }
  };
  return addtocart;
};
export default useAddTocart;
