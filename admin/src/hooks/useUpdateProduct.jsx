import { toast } from "react-toastify";
import ProductContext from "../context/product/productContext";
import { useContext } from "react";

const useUpdateProduct = () => {
  let Toastid;
  const { dispatch } = useContext(ProductContext);
  const updateProduct = async (
    name,
    description,
    price,
    category,
    stock,
    id
  ) => {
    Toastid = toast.loading("Updating Product...");
    try {
      const res = await fetch(`http://localhost:5050/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          stock,
        }),
      });
      const data = await res.json();
      toast.dismiss(Toastid);
      if (!res.ok) {
        toast.error(data.message || "Failed to update product");
        return { success: false, data };
      }
      dispatch({
        type: "updateProduct",
        payload: data,
      });
      toast.success("Product updated successfully");
      return { success: true, data };
    } catch (error) {
      toast.dismiss(Toastid);
      toast.error("An error occurred while updating the product");
      console.error("Update Product Error:", error);
      return { success: false, error: error.message || "Network error" };
    }
  };
  return { updateProduct };
};

export default useUpdateProduct;
