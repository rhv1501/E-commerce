import { toast } from "react-toastify";

export const useAddProducts = () => {
  const submitData = async (formData) => {
    try {
      const res = await fetch("http://localhost:5050/admin/products", {
        method: "POST",
        body: formData,
        headers: {
          // token: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      const json = await res.json();
      toast.success("Product added successfully!");
      console.log(json);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return submitData;
};
