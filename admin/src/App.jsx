import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading.jsx";
import Order from "./pages/Order.jsx";
import { ToastContainer } from "react-toastify";
import Product from "./pages/Product.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const App = () => {
  return (
    <>
      <ToastContainer />
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
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
