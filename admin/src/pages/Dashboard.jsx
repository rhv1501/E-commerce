import { lazy, useEffect, useMemo } from "react";
import { useOrders } from "../context/order/useOrder";
import { useGetOrders } from "../hooks/useGetorders";
const CountUp = lazy(() => import("react-countup"));
const Dashboard = () => {
  const { getOrders, loading, error } = useGetOrders();
  const { orders } = useOrders();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      getOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardStats = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        ordersShipped: 0,
        ordersPending: 0,
      };
    }

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((total, order) => {
      const price = order.total_price || order.totalPrice || order.total || 0;
      return (
        total + (typeof price === "number" ? price : parseFloat(price) || 0)
      );
    }, 0);

    const uniqueCustomers = new Set();
    orders.forEach((order) => {
      const userId =
        order.user_id?._id || order.user_id || order.userId || order.user;
      if (userId) {
        uniqueCustomers.add(userId.toString());
      }
    });
    const totalCustomers = uniqueCustomers.size;

    const ordersShipped = orders.filter(
      (order) => order.status?.toLowerCase() === "shipped"
    ).length;

    const ordersPending = orders.filter(
      (order) => order.status?.toLowerCase() === "confirmed"
    ).length;
    const ordersDelivered = orders.filter(
      (order) => order.status?.toLowerCase() === "delivered"
    ).length;

    return {
      totalOrders,
      totalRevenue,
      totalCustomers,
      ordersShipped,
      ordersPending,
      ordersDelivered,
    };
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-red-600 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-6 text-sm sm:text-base text-center">
            {error}
          </p>
          <button
            onClick={() => getOrders()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium w-full sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full max-h-screen  bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-4 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md text-center">
            Welcome to the admin dashboard. Here you can manage orders and view
            statistics.
          </p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Orders
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    <CountUp end={dashboardStats.totalOrders} duration={4} />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full ml-4">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Revenue
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                    ₹
                    <CountUp end={dashboardStats.totalRevenue} duration={4} />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full ml-4">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Unique Customers
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    <CountUp end={dashboardStats.totalCustomers} duration={4} />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full ml-4">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Orders Shipped
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400">
                    <CountUp end={dashboardStats.ordersShipped} duration={4} />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full ml-4">
                  <span className="text-2xl">🚚</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Orders Pending
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    <CountUp end={dashboardStats.ordersPending} duration={4} />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full ml-4">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Orders Delivered
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                    <CountUp
                      end={dashboardStats.ordersDelivered}
                      duration={4}
                    />
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full ml-4">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => getOrders()}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Refresh Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
