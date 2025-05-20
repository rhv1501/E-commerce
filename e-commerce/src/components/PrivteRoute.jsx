// PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const PrivateRoute = () => {
  const { islogged } = useContext(AuthContext);
  return islogged ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
