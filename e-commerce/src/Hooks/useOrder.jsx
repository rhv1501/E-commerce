import { useState } from "react";

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createorder = async (formval) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            address: formval.address,
            city: formval.city,
            postal_code: formval.postal_code,
            country: formval.country,
            phone: formval.phone,
            name: formval.name,
            state: formval.state,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      // Check for HTTP error status (like 400) OR specific error messages
      if (
        !response.ok ||
        response.status === 400 ||
        data.message === "Cart is empty"
      ) {
        return {
          error: true,
          data: data.message || `HTTP Error: ${response.status}`,
        };
      }

      return {
        error: false,
        data: data,
        message: "Order created successfully",
      };
    } catch (error) {
      console.error("Error creating order:", error);
      setLoading(false);
      return {
        error: true,
        data: error.message || "Network error occurred",
      };
    }
  };

  return {
    createorder,
    loading,
    error,
  };
}
