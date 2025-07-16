import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading.jsx";
import Order from "./pages/Order.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const App = () => {
  return (
    <>
      <div className="pt-20">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
