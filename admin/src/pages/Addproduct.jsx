import React, { useState } from "react";

const Addproduct = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <form action="">
        <label
          htmlFor="image"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition gap-2"
        >
          <img
            src={preview || "../assets/upload_area.png"}
            alt="Upload Preview"
            className="w-full max-w-md h-auto object-contain border rounded"
          />

          {preview ? (
            <span className="text-sm text-gray-500">Click to change image</span>
          ) : (
            <span className="text-sm text-gray-500">Click to upload image</span>
          )}
          {preview && (
            <button
              className="mx-5 p-2 rounded-lg"
              onClick={() => setPreview(null)}
            >
              clear
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
      </form>
    </div>
  );
};

export default Addproduct;
