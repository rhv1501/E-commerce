export const usePayment = () => {
  const verifyPayment = async (
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5050/api/payments/verifypayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          }),
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: true,
          message: "Failed to verify payment",
        };
      }

      const data = await response.json();
      if (data.error) {
        return {
          success: false,
          error: true,
          message: data.message || "Payment verification failed",
        };
      }
      return {
        success: true,
        error: false,
        message: data.message || "Payment verified successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: true,
        message:
          error.message || "An error occurred during payment verification",
      };
    }
  };
  return { verifyPayment };
};
