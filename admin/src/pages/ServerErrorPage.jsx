import React, { useEffect, useState } from "react";

const ServerErrorPage = () => {
  const [dots, setDots] = useState("");

  // Animated dots for loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 dark:bg-amber-900 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full animate-bounce opacity-20"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Animated server icon */}
          <div className="mb-8 flex justify-center">
            <div className="transform animate-pulse transition-all duration-500">
              <svg
                className="w-24 h-24 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          {/* Error title with gradient */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse">
              Server Unreachable
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              Connection Lost{dots}
            </span>
          </h2>

          {/* Error message */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We're unable to connect to the server. This could be due to:
            </p>
            <ul className="text-left mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></span>
                Server maintenance or downtime
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></span>
                Network connectivity issues
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></span>
                Firewall or security restrictions
              </li>
            </ul>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <button
              onClick={() => window.location.replace("/admin")}
              className="
                w-full sm:w-auto px-8 py-3 rounded-lg font-semibold
                bg-gradient-to-r from-indigo-500 to-purple-600 
                hover:from-indigo-600 hover:to-purple-700
                text-white
                transform transition-all duration-300
                hover:scale-105 hover:shadow-lg
              "
            >
              Refresh Page
            </button>
          </div>

          {/* Status indicator */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Server Status: Offline
            </span>
          </div>

          {/* Help text */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>If the problem persists, please contact the administrator</p>
            <p className="mt-1">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                Error Code: CONNECTION_FAILED
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
