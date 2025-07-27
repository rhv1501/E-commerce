import { toast } from "react-toastify";
import ProductContext from "../context/product/productContext";
import { useContext } from "react";

export const useDeleteProduct = () => {
  const { dispatch } = useContext(ProductContext);
  const deleteProduct = async (productId) => {
    let toastId;
    try {
      toastId = toast.loading("Deleting product...");
      const response = await fetch(
        `http://localhost:5050/admin/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      toast.dismiss(toastId);
      if (!response.ok) {
        toast.error(data.message || "Failed to delete product");
        return;
      }
      toast.success("Product deleted successfully!");
      dispatch({ type: "deleteProduct", payload: productId });
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.dismiss(toastId);
      toast.error(
        error.message || "An error occurred while deleting the product"
      );
    }
  };

  return { deleteProduct };
};