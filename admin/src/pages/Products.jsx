import { useEffect } from "react";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useProduct } from "../context/product/useProduct";

const Products = () => {
  const { fetchProducts, loading, error } = useProducts();
  const { products } = useProduct();
  useEffect(() => {
    if (products === null || products.length === 0) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-center items-center raltive">
        <h1 className="bg-gradient-to-r from-pink-500 via-blue-400 to-purple-400 text-transparent bg-clip-text font-bold font-serif relative top-0 text-2xl lg:text-4xl">
          Products
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={"/addproduct"}
          className="p-4 bg-indigo-700 dark:bg-indigo-600 rounded-lg mt-4 hover:bg-indigo-950 text-white font-semibold transition-colors duration-300"
        >
          Add Product
        </Link>
      </div>
      <div className="flex justify-center items-center flex-wrap my-40">
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {products && products.length > 0
          ? products.map((product) => (
              <div
                className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 dark:bg-gray-400 bg-blue-900 shadow-md text-white"
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
                    <h5 className="text-xl tracking-tight">{product.name}</h5>
                  </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold">
                        ₹{product.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          : !loading && <p>No products available</p>}
      </div>
    </>
  );
};

export default Products;
