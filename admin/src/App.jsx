import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading.jsx";
import useCheckhealth from "./hooks/useCheckhealth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Auth from "./components/Auth.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Order = lazy(() => import("./pages/Order.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Addproduct = lazy(() => import("./pages/Addproduct.jsx"));
const ServerErrorPage = lazy(() => import("./pages/ServerErrorPage.jsx"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

const App = () => {
  const { healthCheck } = useCheckhealth();
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const health = await healthCheck();
      if (!health) {
        navigate("/serverdown");
        return;
      }
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Suspense fallback={<div>Loading Toasts</div>}>
        <ToastContainer />
      </Suspense>
      <title>Admin Dashboard</title>
      <div className="pt-20">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<PrivateRoute />}>
              <Route path="/serverdown" element={<ServerErrorPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/addproduct" element={<Addproduct />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
