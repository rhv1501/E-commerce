import { toast } from "react-toastify";
import { useOrders } from "../context/order/useOrder";

const useUpdatestatus = () => {
  const { dispatch } = useOrders();
  const updatestatus = async (id, tracking_number, status) => {
    try {
      const res = await fetch(`http://localhost:5050/admin/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ status, tracking_number }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: "UpdateOrderStatus",
          payload: { _id: id, status, tracking_number },
        });
        toast.success("Order status updated successfully!");
      } else {
        toast.error(data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };
  return { updatestatus };
};

export default useUpdatestatus;
