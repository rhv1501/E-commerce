const useUpdatestatus = () => {
  const updatestatus = async (id, tracking_number, status) => {
    try {
      const res = await fetch(
        `http://localhost:5050/admin/order/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ status, tracking_number }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("Order status updated successfully:", data);
      } else {
        console.error("Failed to update order status:", data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return { updatestatus };
};

export default useUpdatestatus;
