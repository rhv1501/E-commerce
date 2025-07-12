import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIContextProvider } from "./context/UI Context/UIState.jsx";
import { UserContextProvider } from "./context/userContext/UserState.jsx";
import { ProductContextProvider } from "./context/ProductContext/ProductState.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthState.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserContextProvider>
        <ProductContextProvider>
          <UIContextProvider>
            <App />
          </UIContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
