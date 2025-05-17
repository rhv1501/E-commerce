import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import useRemovefromCart from "../Hooks/useRemovefromCart";

const Cart = () => {
  const { state } = useContext(UserContext);
  const cartItems = state?.user?.cart || [];
  const { remove, loading, error, result } = useRemovefromCart();

  const [removingId, setRemovingId] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // When error changes, show error message and hide after 5s
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // When result changes, show result message and hide after 5s
  useEffect(() => {
    if (result) {
      setShowResult(true);
      const timer = setTimeout(() => setShowResult(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleDelete = async (productId) => {
    setRemovingId(productId);
    await remove(productId);
    setRemovingId(null);
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 pb-10 px-6 min-h-screen">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 via-blue-400 to-purple-400 text-transparent bg-clip-text font-serif w-fit mx-auto">
          Your Cart
        </h1>

        {/* Loading message */}
        {loading && removingId && (
          <div className="text-center mb-6 text-blue-600 font-semibold animate-pulse">
            Removing item...
          </div>
        )}

        {/* Error message with bounce animation and fade */}
        {error && showError && (
          <div
            className="mx-auto max-w-md mb-6 px-6 py-4 bg-red-100 border border-red-400 text-red-700 rounded-lg font-semibold animate-bounce shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Success message with bounce animation and fade */}
        {result && showResult && (
          <div
            className="mx-auto max-w-md mb-6 px-6 py-4 bg-green-100 border border-green-400 text-green-700 rounded-lg font-semibold animate-bounce shadow-lg"
            role="alert"
          >
            {result}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center mt-24">
            <p className="text-2xl mb-6 font-medium text-gray-700">
              Your cart is empty 😔
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-[#94bbe9] text-white font-semibold rounded-full shadow-md hover:bg-blue-500 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-transparent rounded-2xl shadow-lg shadow-[#94bbe9] p-6 gap-6 transition-transform duration-300 hover:scale-[1.02]"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.productId.imageuri?.[0] || "/fallback.jpg"}
                    alt={item.productId.name}
                    className="w-28 h-28 object-cover rounded-xl border border-[#94bbe9] flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.jpg";
                    }}
                  />
                </Link>

                <div className="flex flex-col flex-grow min-w-0">
                  <h2 className="text-xl font-semibold truncate">
                    {item.productId.name}
                  </h2>
                  <p className="mt-1 line-clamp-2">
                    {item.productId.description}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#94bbe9]">
                    ₹{item.productId.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 flex-shrink-0 w-32">
                  <div className="text-xl font-bold text-[#94bbe9]">
                    ₹{item.value}
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={loading && removingId === item._id}
                    title="Remove item"
                    className={`w-full px-4 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 transition
                      ${
                        loading && removingId === item._id
                          ? "bg-gray-400 cursor-not-allowed text-gray-700"
                          : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400"
                      }
                    `}
                  >
                    {loading && removingId === item._id
                      ? "Removing..."
                      : "Remove"}
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center text-gray-900 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold">Total</h2>
              <p className="text-3xl font-extrabold text-[#94bbe9]">
                ₹{state.user.totalPrice}
              </p>
            </div>

            <div className="flex justify-end max-w-4xl mx-auto">
              <button
                className="mt-4 px-8 py-3 bg-[#94bbe9] hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
