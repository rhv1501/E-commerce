import { useCallback, useState } from "react";
import { useOrders } from "../context/order/useOrder";

export const useGetOrders = () => {
  const { dispatch } = useOrders();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("admin-token"),
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "GetOrders", payload: data.orders });
        return { success: true, data: data.orders };
      } else {
        const errorMessage = data.message || "Failed to fetch orders";
        setError(errorMessage);
        console.error("API Error:", errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      console.error("Fetch Error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    getOrders,
    loading,
    error,
    clearError,
  };
};
