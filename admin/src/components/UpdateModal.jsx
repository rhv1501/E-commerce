import { useState } from "react";
import useUpdateProduct from "../hooks/useUpdateProduct";

const UpdateModal = ({
  closeModal,
  name,
  description,
  price,
  category,
  stock,
  id,
}) => {
  const { updateProduct } = useUpdateProduct();
  const [update, setUpdate] = useState({
    name,
    price,
    description,
    category,
    stock,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = async () => {
    const { success } = await updateProduct(
      update.name,
      update.description,
      update.price,
      update.category,
      update.stock,
      id
    );
    if (success) {
      closeModal();
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg bg-opacity-50 z-50">
        <div className="bg-amber-100 dark:bg-[#111827] h-[70%] w-[80%] sm:w-[50%] sm:h-[50%] rounded-lg shadow-lg relative flex flex-col">
          <button
            onClick={closeModal}
            className="cursor-pointer absolute right-0 p-2 font-extrabold text-red-700 text-2xl animate-pulse hover:animate-none z-60"
          >
            X
          </button>
          <div className="text-2xl font-bold text-center rounded-t-lg py-4">
            <h2 className="bg-clip-text  bg-gradient-to-r from-indigo-500 to-purple-600  text-transparent animate-pulse">
              Update Product
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <div className="w-full flex gap-2 items-center justify-between">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={update.name}
                onChange={handleChange}
                placeholder="Enter the Product Name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-between">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={update.price}
                onChange={handleChange}
                placeholder="Enter the Product Price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-between">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={update.description}
                onChange={handleChange}
                placeholder="Enter the Product Description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-between">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                value={update.category}
                onChange={handleChange}
                placeholder="Enter the Product Category"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full flex gap-2 items-center justify-between">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                value={update.stock}
                onChange={handleChange}
                placeholder="Enter the Product Stock"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
