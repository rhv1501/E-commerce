import { lazy } from "react";
import Navbar from "../components/Navbar/Navbar";
const Checkout = lazy(() => import("../components/checkout/Checkout"));
const Cheackoutpage = () => {
  return (
    <>
      <Navbar />
      <Checkout />
    </>
  );
};

export default Cheackoutpage;
