import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import useGetuser from "./Hooks/useGetuser";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import checkServerHealth from "./utils/Serverhealth";
import { AuthContext } from "./context/AuthContext/AuthContext";
import OTPForm from "./pages/otpForm";
import PrivateRoute from "./components/PrivteRoute";
import Profile from "./pages/Profile";
import ForgotPasswordotpui from "./pages/ForgotPasswordotp";
import { ForgotPassword } from "./pages/ForgotPassword";
import About from "./pages/About";
import Footer from "./components/footer/Footer";
function App() {
  const cursorref = useRef(null);
  const getUser = useGetuser();
  const authcontext = useContext(AuthContext);
  const { islogged } = authcontext;
  useEffect(() => {
    checkServerHealth();
  }, []);
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
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="forgotpassword" element={<ForgotPasswordotpui />} />
          <Route path="/changepassword" element={<ForgotPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verify" element={<OTPForm />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
