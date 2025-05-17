import { useContext, useState } from "react";
import { UserContext } from "../context/userContext/UserContext";

const useRemovefromCart = () => {
  const { state, dispatch } = useContext(UserContext);
  const cartItems = state?.user?.cart || [];
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const remove = async (cartItemId) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `http://localhost:5050/api/products/removeFromCart/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log("Response data:", data);

      if (!response.ok) {
        const errorMsg =
          data.message ||
          data.error ||
          JSON.stringify(data) ||
          "Failed to remove item from cart";
        throw new Error(errorMsg);
      }

      const updatedCart = cartItems.filter((item) => item._id !== cartItemId);
      const updatedTotalPrice = updatedCart.reduce(
        (total, item) => total + item.value,
        0
      );

      dispatch({
        type: "RemoveFromCart",
        payload: {
          cart: updatedCart,
          totalPrice: updatedTotalPrice,
          cartCount: updatedCart.length,
        },
      });

      setResult(data.message || "Item removed successfully");
    } catch (err) {
      console.error("Error caught:", err);
      setError(err.message || JSON.stringify(err) || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error, result };
};

export default useRemovefromCart;
