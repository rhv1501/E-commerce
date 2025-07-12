import { lazy, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
const Checkout = lazy(() => import("../components/checkout/Checkout"));
const Cheackoutpage = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRazorpay = () => {
      // Check if already loaded
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        setLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        setRazorpayLoaded(true);
        setLoading(false);
        console.log("✅ Razorpay loaded successfully");
      };

      script.onerror = () => {
        setLoading(false);
        console.error("❌ Failed to load Razorpay");
      };

      document.head.appendChild(script);
    };

    loadRazorpay();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment system...</p>
        </div>
      </div>
    );
  }

  if (!razorpayLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load payment system</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Checkout />
    </>
  );
};

export default Cheackoutpage;
