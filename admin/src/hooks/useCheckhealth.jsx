import { toast } from "react-toastify";

const useCheckhealth = () => {
  const healthCheck = async () => {
    try {
      const response = await fetch("/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Server is Down or Unreachable");
        return false;
      }

      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      toast.error("Server is Down or Unreachable");
      return false;
    }
  };
  return { healthCheck };
};

export default useCheckhealth;
