import { useCallback, useState } from "react";

const useGetorder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getorder = useCallback(async (orderid) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5050/admin/order/${orderid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (res.ok) {
        return { error: false, success: true, data };
      } else {
        const errorMessage = data.message || "Failed to fetch order";
        setError(errorMessage);
        return { error: true, success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      return { error: true, success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { getorder, loading, error, clearError };
};

export default useGetorder;
