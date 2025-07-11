import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
const PrivateRoute = () => {
  const { islogged, loading } = useContext(AuthContext);
  useEffect(() => {
    if (!islogged) {
      toast.info("You need to log in to access this page.");
    }
  }, [islogged]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return islogged ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
