import { toast } from "react-toastify";
import { useProduct } from "../context/product/useProduct";
export const useAddProducts = () => {
  const { dispatch } = useProduct();
  let toastId;
  const submitData = async (formData) => {
    try {
      toastId = toast.loading("Adding product...");
      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
        headers: {
          token: localStorage.getItem("admin-token"),
        },
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }
      dispatch({ type: "ADD_PRODUCT", payload: data.product });
      toast.success("Product added successfully!");
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return submitData;
};
