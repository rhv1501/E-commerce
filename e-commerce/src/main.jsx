import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIContextProvider } from "./context/UI Context/UIState.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIContextProvider>
        <App />
      </UIContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
