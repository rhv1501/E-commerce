import { useState } from "react";
import { UIContext } from "./UIContext";

export const UIContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const backgroundGradient = darkMode
    ? "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)"
    : "linear-gradient(135deg, #fff0f3 0%, #fff8e7 40%, #dff7f0 75%, #cfe0ff 100%)";
  const textColor = darkMode ? "white" : "black";

  return (
    <UIContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        style={{
          backgroundImage: backgroundGradient,
          color: textColor,
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        {children}
      </div>
    </UIContext.Provider>
  );
};
