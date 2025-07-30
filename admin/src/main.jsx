import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import OrderProvider from "./context/order/orderProvider.jsx";
import ProductProvider from "./context/product/produtProvider.jsx";
createRoot(document.getElementById("root")).render(
    <ProductProvider>
      <OrderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OrderProvider>
    </ProductProvider>
);
