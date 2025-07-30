import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const [isLogged, setIsLogged] = useState(null);
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
      if (!hasShownToast) {
        toast.success("Welcome back!");
        setHasShownToast(true);
      }
    } else {
      setIsLogged(false);
      if (!hasShownToast) {
        toast.error("Please log in to continue");
        setHasShownToast(true);
      }
    }
  }, [hasShownToast]);

  if (isLogged === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isLogged ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
