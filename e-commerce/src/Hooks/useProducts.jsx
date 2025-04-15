import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext/ProductContext";

const useProducts = () => {
  const context = useContext(ProductContext);
  const { dispatch } = context;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5050/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "products", payload: data });
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      setError("An error occurred while fetching the products.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchProducts, loading, error };
};

export default useProducts;
