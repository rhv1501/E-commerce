import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIContextProvider } from "./context/UI Context/UIState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </StrictMode>
);
