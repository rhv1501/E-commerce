import { useCallback, useState } from "react";
import { useProduct } from "../context/product/useProduct";
const useProducts = () => {
  const { dispatch } = useProduct();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
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
        dispatch({ type: "GetProducts", payload: data });
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      setError("An error occurred while fetching the products.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { fetchProducts, loading, error };
};

export default useProducts;
