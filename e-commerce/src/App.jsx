import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useRef, Suspense, lazy } from "react";
import gsap from "gsap";
import useGetuser from "./Hooks/useGetuser";
import checkServerHealth from "./utils/Serverhealth";
import { AuthContext } from "./context/AuthContext/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivteRoute";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const OTPForm = lazy(() => import("./pages/otpForm"));
const Profile = lazy(() => import("./pages/Profile"));
const ForgotPasswordotpui = lazy(() => import("./pages/ForgotPasswordotp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const About = lazy(() => import("./pages/About"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Cheackoutpage = lazy(() => import("./pages/Cheackoutpage"));
const Orders = lazy(() => import("./pages/Orders"));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

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
      <ToastContainer />
      <div
        className="w-50 h-50 rounded-[50%] fixed blur-3xl pointer-events-none bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]"
        ref={cursorref}
      />
      <div
        onMouseMove={(e) => {
          gsap.to(cursorref.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out",
          });
        }}
      >
        <Suspense fallback={<PageLoader />}>
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
              <Route path={"/orders"} element={<Orders />} />
              <Route path={"/Checkout"} element={<Cheackoutpage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/verify" element={<OTPForm />} />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
