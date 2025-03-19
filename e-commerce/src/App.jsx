import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useRef } from "react";
import gsap from "gsap";
import Login from "./pages/Login";
function App() {
  const cursorref = useRef(null);
  return (
    <>
      <div
        className="w-50 h-50 rounded-[50%] fixed blur-3xl pointer-events-none bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]"
        ref={cursorref}
      />
      <div
        onMouseMove={(e) => {
          gsap.to(cursorref.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
          });
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
