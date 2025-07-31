import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("api/order", {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Failed to fetch orders");
        setLoading(false);
        setError("Failed to fetch orders");
        return;
      }

      const data = await response.json();
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800"; // Add null check

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="text-center mb-8 pt-30">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">
          Track your orders and view order history
        </p>
      </div>
      <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl">No orders found</div>
              <p className="text-gray-400 mt-2">
                Start shopping to see your orders here!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-100 px-6 py-4 border-b">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                        {order.receipt && (
                          <p className="text-sm text-gray-600">
                            Receipt: {order.receipt}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{order.total_price.toLocaleString()}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status || "Unknown"}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                              order.payment_status
                            )}`}
                          >
                            {order.payment_status || "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Products Section */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Items Ordered
                        </h4>
                        <div className="space-y-4">
                          {order.products &&
                            order.products.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-4 p-4 border rounded-lg"
                              >
                                <img
                                  src={
                                    item.product_id?.imageuri?.[0] ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={item.product_id?.name || "Product"}
                                  className="w-20 h-20 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.src = "/placeholder-image.jpg";
                                  }}
                                />
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900">
                                    {item.product_id?.name ||
                                      "Product name not available"}
                                  </h5>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.product_id?.description ||
                                      "No description available"}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Category:{" "}
                                    {item.product_id?.category ||
                                      "Uncategorized"}
                                  </p>
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-gray-600">
                                      Quantity: {item.quantity || 0}
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                      ₹{(item.value || 0).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Order Details & Shipping */}
                      <div className="space-y-6">
                        {/* Tracking Information */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Tracking Information
                          </h5>
                          {order.tracking_number ? (
                            <div>
                              <p className="text-sm text-gray-600">
                                Tracking ID:
                              </p>
                              <p className="font-mono text-sm font-semibold text-blue-600">
                                {order.tracking_number}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Tracking ID will be available once the order is
                              shipped
                            </p>
                          )}
                          {order.razorpayid && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">
                                Payment ID:
                              </p>
                              <p className="font-mono text-xs text-gray-500">
                                {order.razorpayid}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Shipping Address
                          </h5>
                          {order.shipping ? (
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="font-medium text-gray-900">
                                {order.shipping.name || "Name not provided"}
                              </p>
                              <p>
                                {order.shipping.address ||
                                  "Address not provided"}
                              </p>
                              <p>
                                {order.shipping.city || "City"},{" "}
                                {order.shipping.state || "State"}
                              </p>
                              <p>
                                {order.shipping.postal_code || "Postal code"}
                              </p>
                              <p>{order.shipping.country || "Country"}</p>
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="font-medium">
                                  Phone:{" "}
                                  {order.shipping.phone || "Phone not provided"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Shipping address not available
                            </p>
                          )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Order Summary
                          </h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Items ({order.products?.length || 0}):
                              </span>
                              <span className="text-gray-900">
                                ₹{(order.total_price || 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
                              <span>Total:</span>
                              <span>
                                ₹{(order.total_price || 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
