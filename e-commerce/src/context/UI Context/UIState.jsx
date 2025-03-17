import { useState, useEffect } from "react";
import { UIContext } from "./UIContext";
export const UIContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "#021526";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "#e5e7eb";
      document.body.style.color = "black";
    }
  }, [darkMode]);
  return (
    <UIContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </UIContext.Provider>
  );
};
