import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import useProducts from "../Hooks/useProducts";
import { ProductContext } from "../context/ProductContext/ProductContext";
import useAddTocart from "../Hooks/useAddTocart";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Products = () => {
  const { islogged } = useContext(AuthContext);
  const { fetchProducts, loading, error } = useProducts();
  const context = useContext(ProductContext);
  const { state } = context;
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const addtocart = useAddTocart();
  const [cartLoading, setCartLoading] = useState({});
  const [carterror, SetCarterror] = useState({});
  const [cartmessage, Setcartmessage] = useState({});
  const [cartsuccess, setCartsuccess] = useState({});

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <h1 className="bg-gradient-to-r from-pink-500 via-blue-400 to-purple-400 text-transparent bg-clip-text font-bold font-serif absolute top-30 text-2xl lg:text-4xl">
          Products
        </h1>
      </div>
      <div className="flex justify-center items-center flex-wrap my-40">
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {state.products && state.products.length > 0
          ? state.products.map((product) => (
              <div
                className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                key={product._id}
              >
                <Link
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  to={`/product/${product._id}`}
                >
                  <img
                    className="object-cover"
                    src={product.imageuri[0]}
                    alt="product image"
                    loading="lazy"
                  />
                </Link>
                <div className="mt-4 px-5 pb-5">
                  <Link to={`/product/${product._id}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.name}
                    </h5>
                  </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        ₹{product.price}
                      </span>
                    </p>
                    <div className="flex items-center justify-center gap-2 font-bold text-slate-900 mr-1 text-lg">
                      <span>
                        <button
                          onClick={() => {
                            setQuantities((prev) => ({
                              ...prev,
                              [product._id]: Math.max(
                                (prev[product._id] || 1) - 1,
                                1
                              ),
                            }));
                          }}
                          className="bg-slate-900 text-white rounded-full px-2 py-1 cursor-pointer"
                        >
                          -
                        </button>
                      </span>
                      <span>{quantities[product._id] || 1}</span>
                      <span>
                        <button
                          onClick={() => {
                            setQuantities((prev) => ({
                              ...prev,
                              [product._id]: (prev[product._id] || 1) + 1,
                            }));
                          }}
                          className="bg-slate-900 text-white rounded-full px-2 py-1 cursor-pointer"
                        >
                          +
                        </button>
                      </span>
                    </div>
                  </div>

                  <button
                    className={`flex items-center justify-center rounded-md transition-colors duration-300 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4
                      ${
                        cartsuccess[product._id]
                          ? "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                          : carterror[product._id]
                          ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
                          : "bg-slate-900 hover:bg-gray-700 focus:ring-blue-300"
                      }`}
                    onClick={async () => {
                      if (islogged) {
                        setCartLoading((prev) => ({
                          ...prev,
                          [product._id]: true,
                        }));

                        const res = await addtocart(
                          product._id,
                          quantities[product._id] || 1
                        );

                        setCartLoading((prev) => ({
                          ...prev,
                          [product._id]: false,
                        }));

                        SetCarterror((prev) => ({
                          ...prev,
                          [product._id]: res.error,
                        }));

                        Setcartmessage((prev) => ({
                          ...prev,
                          [product._id]: res.message,
                        }));

                        if (!res.error) {
                          setCartsuccess((prev) => ({
                            ...prev,
                            [product._id]: true,
                          }));

                          setTimeout(() => {
                            setCartsuccess((prev) => ({
                              ...prev,
                              [product._id]: false,
                            }));
                            Setcartmessage((prev) => ({
                              ...prev,
                              [product._id]: "",
                            }));
                          }, 3000);
                        } else {
                          setTimeout(() => {
                            SetCarterror((prev) => ({
                              ...prev,
                              [product._id]: false,
                            }));
                            Setcartmessage((prev) => ({
                              ...prev,
                              [product._id]: "",
                            }));
                          }, 5000);
                        }
                      } else {
                        SetCarterror((prev) => ({
                          ...prev,
                          [product._id]: true,
                        }));
                        Setcartmessage((prev) => ({
                          ...prev,
                          [product._id]: "Login required",
                        }));
                        setTimeout(() => {
                          SetCarterror((prev) => ({
                            ...prev,
                            [product._id]: false,
                          }));
                          Setcartmessage((prev) => ({
                            ...prev,
                            [product._id]: "",
                          }));
                          navigate("/auth");
                        }, 5000);
                      }
                    }}
                  >
                    {!cartsuccess[product._id] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )}
                    {cartLoading[product._id] ? (
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src="/assets/loginloading.png"
                          className="w-7 animate-spin"
                        />
                        Loading...
                      </div>
                    ) : carterror[product._id] ? (
                      cartmessage[product._id]
                    ) : cartsuccess[product._id] ? (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-white animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Added to Cart!
                      </div>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            ))
          : !loading && <p>No products available</p>}
      </div>
    </>
  );
};

export default Products;
