import { useState } from "react";

const useSingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSingleProduct = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, fetchSingleProduct };
};

export default useSingleProduct;
