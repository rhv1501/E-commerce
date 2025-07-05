import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "../../Hooks/useOrder";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext/UserContext";

const Checkout = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [formval, setFormval] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    state: "",
    country: "",
  });
  const { createorder } = useOrder();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormval((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createorder(formval);

      if (data.error) {
        toast.error(data.data);
        if (data.data === "Cart is empty") {
          setTimeout(() => {
            navigate("/cart");
          }, 1000);
        }
        return;
      }

      toast.success("Order created successfully! You can proceed to payment");
      const orderData = data.data;
      var options = {
        key: "rzp_test_pqvqzG4cIXkFFQ",
        amount: orderData.razorpay.amount,
        currency: "INR",
        name: "PKG IT",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderData.razorpay.id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: state.user.username,
          email: state.user.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      // eslint-disable-next-line no-undef
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Checkout error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen pt-30 px-5">
      <div className="max-w-4xl p-6 bg-indigo-400 rounded-lg shadow-xl flex shadow-[#94bbe9] flex-col items-center justify-center gap-2 text-[#FFFDD0]">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className=" mb-4 font-bold">
          Please fill in your details to complete the purchase.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleChange}
              value={formval.name}
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              value={formval.phone}
              type="number"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Full-Address
            </label>
            <textarea
              value={formval.address}
              onChange={handleChange}
              id="address"
              name="address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="city">
              City
            </label>
            <input
              value={formval.city}
              onChange={handleChange}
              type="text"
              id="city"
              name="city"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="postal_code">
              Pincode
            </label>
            <input
              value={formval.postal_code}
              onChange={handleChange}
              type="number"
              id="postal_code"
              name="postal_code"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="state">
              state
            </label>
            <input
              value={formval.state}
              onChange={handleChange}
              type="text"
              id="state"
              name="state"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="country">
              Country
            </label>
            <input
              value={formval.country}
              onChange={handleChange}
              type="text"
              id="country"
              name="country"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex gap-2">
            <Link
              to={"/cart"}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0f172b] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
