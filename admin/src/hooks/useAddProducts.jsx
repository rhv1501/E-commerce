import { toast } from "react-toastify";

export const useAddProducts = () => {
  let toastId;
  const submitData = async (formData) => {
    try {
      toastId = toast.loading("Adding product...");
      const res = await fetch("http://localhost:5050/admin/products", {
        method: "POST",
        body: formData,
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      toast.success("Product added successfully!");
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return submitData;
};
