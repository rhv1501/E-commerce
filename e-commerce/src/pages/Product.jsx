import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSingleProduct from "../Hooks/useSingleProduct";
import Navbar from "../components/Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error, fetchSingleProduct } = useSingleProduct();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchSingleProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (product?.imageuri?.length > 0) {
      setSelectedImage(product.imageuri[0]);
    }
  }, [product]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-20 lg:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-[450px] overflow-hidden rounded-2xl shadow-lg mb-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-contain"
              />
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={3}
              className="w-full"
            >
              {product.imageuri.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    loading="lazy"
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`w-24 h-24 object-cover rounded-xl cursor-pointer ${
                      selectedImage === img
                        ? "ring-4 ring-blue-400"
                        : "hover:ring-2 hover:ring-gray-400"
                    }`}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              {product.name}
            </h1>
            <p className="text-2xl text-center text-gray-700 font-semibold">
              ₹{product.price}
            </p>
            <p className="text-gray-600 text-center">{product.description}</p>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Availability:
                </span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600 ml-2">In Stock</span>
                ) : (
                  <span className="text-red-600 ml-2">Out of Stock</span>
                )}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Stock Left:</span>{" "}
                {product.stock}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4 justify-center">
              <span className="text-gray-700 font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="bg-gray-800 text-white px-3 py-1 hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-5 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-800 text-white px-3 py-1 hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 text-lg mx-auto block">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
