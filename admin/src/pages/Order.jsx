import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetorder from "../hooks/useGetorder";
import { useOrders } from "../context/order/useOrder";
import Loading from "../components/Loading";
import useUpdatestatus from "../hooks/useUpdatestatus";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getorder, loading, error } = useGetorder();
  const { orders } = useOrders();
  const [orderData, setOrderData] = useState(null);
  const [status, setStatus] = useState(orderData?.status || "Confirmed");
  useEffect(() => {
    const fetchOrder = async () => {
      if (orders && orders.length > 0) {
        const order = orders.find((order) => order._id === id);
        if (order) {
          setOrderData(order);
          return;
        }
      }

      const response = await getorder(id);
      if (response.success) {
        setOrderData(response.data.order || response.data);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [getorder, id, orders]);
  const { updatestatus } = useUpdatestatus();
  const handlestatus = async (e, orderId) => {
    e.preventDefault();
    updatestatus(orderId, status);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to load order
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/orders")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-4 rounded-lg transition-colors"
            >
              Back to Orders
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="text-gray-400 text-4xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Order not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The order with ID "{id}" could not be found.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4 p-2 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Back to Orders</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Details
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Order #{orderData._id?.slice(-8) || "N/A"}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      orderData.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : orderData.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : orderData.status === "confirmed"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {orderData.status || "Unknown"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{(orderData.total_price || 0).toLocaleString("en-IN")}
                </p>
                {orderData.createdAt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(orderData.createdAt).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Name:</span>{" "}
                    {orderData.shipping.name || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Phone:</span>{" "}
                    {orderData.shipping.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Delivery Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Address:</span>{" "}
                    {orderData.shipping.address || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {"Razorpay"}
                  </p>
                </div>
              </div>
            </div>

            {orderData.products && orderData.products.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {orderData.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex-wrap"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.product_id?.name || item.name || "Product"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ₹{(item.product_id?.price || 0).toLocaleString("en-IN")}{" "}
                        X {item.quantity} = {item?.value}
                      </p>

                      <p className="font-medium text-gray-900 dark:text-white">
                        available stock - {item.product_id.stock || "No stock"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <div className="p-6 flex justify-between items-center">
            <h2>Update Order Status</h2>
            <form onSubmit={(e) => handlestatus(e, orderData._id)}>
              <select
                name="status"
                id="status"
                className="p-2 m-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
