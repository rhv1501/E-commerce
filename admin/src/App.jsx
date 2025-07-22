import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Order = lazy(() => import("./pages/Order.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Addproduct = lazy(() => import("./pages/Addproduct.jsx"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

const App = () => {
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/addproduct" element={<Addproduct />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
