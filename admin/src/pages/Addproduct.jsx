import React, { useState } from "react";
import { useAddProducts } from "../hooks/useAddProducts";
import { toast } from "react-toastify";

const Addproduct = () => {
  const [preview, setPreview] = useState(null);
  const submitData = useAddProducts();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const form = e.target;
    const images = form.images.files;

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("category", form.category.value);
    formData.append("stock", form.stock.value);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    submitData(formData);
    e.target.reset();
    setPreview(null);
  };

  return (
    <>
      <style>{`
        input, textarea {
          padding: 1rem;
          border: 1px dashed #ccc;
          border-width:2px;
          border-radius: 0.25rem;
          width: 100%;
          box-sizing: border-box;
          outline-style:none;
          transition: all 1s ease-in-out;
          font-weight: 500;
        }
        input:focus, textarea:focus {
          border: 1px solid #ccc;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }
      `}</style>

      <div className="flex flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-lg p-2"
        >
          <label
            htmlFor="images"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition gap-2"
          >
            <img
              src={preview || "../assets/upload_area.png"}
              alt="Upload Preview"
              className="w-full max-w-md h-auto object-contain border rounded"
            />
            <span className="text-sm text-gray-500">
              {preview ? "Click to change image" : "Click to upload image"}
            </span>
            {preview && (
              <button
                type="button"
                className="mx-5 p-2 rounded-lg"
                onClick={() => setPreview(null)}
              >
                Clear
              </button>
            )}
          </label>

          <input
            type="file"
            multiple
            name="images"
            id="images"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="flex flex-col gap-2 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              required
            ></textarea>
            <input type="number" name="price" placeholder="Price" required />
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Add Product
          </button>
          <button
            type="reset"
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default Addproduct;
