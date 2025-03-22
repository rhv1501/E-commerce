import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIContextProvider } from "./context/UI Context/UIState.jsx";
import { UserContextProvider } from "./context/userContext/UserState.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <UIContextProvider>
          <App />
        </UIContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
