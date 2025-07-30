import { lazy, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSingleProduct from "../hooks/useSingleProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { toast } from "react-toastify";
const UpdateModal = lazy(() => import("../components/UpdateModal"));

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, fetchSingleProduct } = useSingleProduct();
  const [selectedImage, setSelectedImage] = useState(null);
  const { deleteProduct } = useDeleteProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchSingleProduct(id);
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product?.imageuri?.length > 0 && product.imageuri[0]) {
      setSelectedImage(product.imageuri[0]);
    }
  }, [product]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        navigate("/products");
      } catch (error) {
        toast.error(error.message || "Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Failed to load product
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => navigate("/products")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Products
            </button>
            <button
              onClick={() => fetchSingleProduct(id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-gray-400 text-4xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isModalOpen && (
        <UpdateModal
          closeModal={closeModal}
          name={product.name}
          description={product.description}
          price={product.price}
          category={product.category}
          stock={product.stock}
          id={product._id}
        />
      )}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <span>←</span>
              <span>Back to Products</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name || "Product"}
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="flex flex-col items-center justify-center text-gray-400"
                    style={{ display: selectedImage ? "none" : "flex" }}
                  >
                    <span className="text-4xl mb-2">📷</span>
                    <span>No image available</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              {product.imageuri && product.imageuri.length > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Product Images ({product.imageuri.length})
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {product.imageuri.map((img, idx) =>
                      img ? (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            selectedImage === img
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.parentElement.style.display = "none";
                            }}
                          />
                        </button>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name || "Unnamed Product"}
                </h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Price
                    </span>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{product.price?.toLocaleString("en-IN") || "0"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Stock
                    </span>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.stock || 0} units
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Category:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {product.category || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {product.stock > 0 ? "✓ In Stock" : "✗ Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Admin Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Admin Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    Edit Product Details
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    Delete Product
                  </button>
                </div>
              </div>

              {/* Product Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Product Statistics
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Product ID:
                    </span>
                    <span className="text-gray-900 dark:text-white font-mono">
                      {product._id?.slice(-8) || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Created:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString(
                            "en-IN"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
