import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import useGetuser from "./Hooks/useGetuser";
import useAuth from "./Hooks/useAuth";
import Product from "./pages/Product";
import Cart from "./pages/Cart"
function App() {
  const cursorref = useRef(null);
  const getUser = useGetuser();
  const islogged = useAuth();
  useEffect(() => {
    if (islogged) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islogged]);
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
