import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-indigo-400 rounded-lg shadow-xl flex shadow-[#94bbe9] flex-col items-center justify-center gap-2 text-[#FFFDD0]">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className=" mb-4">
          Please fill in your details to complete the purchase.
        </p>
        <form>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
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
              type="number"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
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
