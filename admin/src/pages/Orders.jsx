import { useEffect, useState, useMemo } from "react";
import { useOrders } from "../context/order/useOrder";
import { useGetOrders } from "../hooks/useGetorders";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const { orders } = useOrders();
  const { getOrders, loading, error } = useGetOrders();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    if (!filter) return orders;
    return orders.filter(
      (order) => order.status?.toLowerCase() === filter.toLowerCase()
    );
  }, [orders, filter]);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      getOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && (!orders || orders.length === 0)) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to load orders
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => getOrders()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filterOptions = ["", "Pending", "Confirmed", "Shipped", "Delivered"];

  return (
    <>
      <div className="flex items-center justify-center flex-wrap p-4">
        {filterOptions.map((option) => (
          <button
            key={option || "all"}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-lg mr-2 mb-2 transition-colors ${
              filter === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } cursor-pointer`}
          >
            {option || "All"}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders {filter && `- ${filter}`}
          </h1>
          <button
            onClick={() => getOrders()}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>

        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                onClick={() => navigate(`/admin/order/${order._id}`)}
                className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Order #{order._id?.slice(-8) || "N/A"}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "confirmed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status || "Unknown"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-600 dark:text-gray-400">
                        Customer:{" "}
                        {order.user_id?.name || order.user_id?.email || "N/A"}
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Total: ₹
                        {(
                          order.total_price ||
                          order.totalPrice ||
                          order.total ||
                          0
                        ).toLocaleString("en-IN")}
                      </p>
                      {order.createdAt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ordered on:{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      )}
                      {order.products && order.products.length > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Items: {order.products.length}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {filter
                ? `No ${filter.toLowerCase()} orders found`
                : "No orders found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {filter
                ? `There are no orders with status "${filter}" at the moment.`
                : "There are no orders to display at the moment."}
            </p>
            {filter ? (
              <button
                onClick={() => setFilter("")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mr-2"
              >
                Clear Filter
              </button>
            ) : null}
            <button
              onClick={() => getOrders()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Check for Orders
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
